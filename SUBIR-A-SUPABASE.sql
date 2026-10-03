-- =========================================================
-- LEGAL TIC WEB APP V6.4 - SUPABASE REAL
-- Ejecutar en Supabase SQL Editor.
-- Crea servicios, subservicios, solicitudes, documentos, agenda real, Gobierno Digital Bolivia, configuración y gestión de usuarios.
-- =========================================================

create extension if not exists pgcrypto;

-- -----------------------------
-- PERFILES Y ROLES
-- -----------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'client' check (role in ('admin','lawyer','client')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists avatar_url text;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, email, full_name, phone, avatar_url, role, active)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    'client',
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_user_profile();

create or replace function public.is_internal_user()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin','lawyer') and p.active = true
  );
$$;

create or replace function public.is_admin_user()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.active = true
  );
$$;

-- -----------------------------
-- CATÁLOGO DE SERVICIOS
-- -----------------------------
create table if not exists public.service_catalog (
  id text primary key,
  name text not null,
  group_key text not null default 'personas' check (group_key in ('personas','empresas','firdi')),
  price_reference text,
  image_url text,
  detail text,
  active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_subservices (
  id uuid primary key default gen_random_uuid(),
  service_id text not null references public.service_catalog(id) on delete cascade,
  name text not null,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

-- -----------------------------
-- GOBIERNO DIGITAL BOLIVIA
-- -----------------------------
create table if not exists public.digital_portals (
  id text primary key,
  title text not null,
  image_url text,
  url text,
  active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------
-- CONFIGURACIÓN GLOBAL DE LA WEB APP
-- -----------------------------
create table if not exists public.app_settings (
  key text primary key,
  value text,
  description text,
  updated_at timestamptz not null default now()
);

-- -----------------------------
-- SOLICITUDES DE SERVICIOS
-- -----------------------------
create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  public_code text unique default ('LT-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))),
  client_id uuid references auth.users(id) on delete set null,
  client_email text,
  client_name text,
  client_phone text,
  service_id text references public.service_catalog(id) on delete set null,
  service_name text not null,
  requested_subservices text[] not null default '{}',
  required_uploads text[] not null default array['Carnet de identidad','Comprobante de pago','Documentos específicos del servicio'],
  client_note text,
  state text not null default 'Solicitud' check (state in ('Solicitud','En desarrollo','Concluido','Cancelado')),
  payment_status text not null default 'Pendiente de comprobación' check (payment_status in ('Pendiente de comprobación','Pago aprobado','Pago rechazado')),
  payment_receipt_label text,
  final_document_label text,
  assigned_to uuid references auth.users(id) on delete set null,
  assigned_to_name text,
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.request_documents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  uploaded_by uuid references auth.users(id) on delete set null,
  document_type text not null default 'other' check (document_type in ('client','payment','final','other')),
  label text,
  file_path text not null,
  file_name text,
  mime_type text,
  size_bytes bigint default 0,
  created_at timestamptz not null default now()
);

-- -----------------------------
-- AGENDA REAL DE VIDEOCONFERENCIA
-- -----------------------------
create table if not exists public.appointment_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  slot_date date not null,
  slot_time time not null,
  full_name text not null,
  email text,
  phone text,
  note text,
  status text not null default 'reserved' check (status in ('reserved','confirmed','cancelled','attended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint appointment_unique_active unique (slot_date, slot_time, status)
);

-- Evita doble reserva para el mismo día/hora activa.
create unique index if not exists appointment_one_active_slot
on public.appointment_bookings(slot_date, slot_time)
where status <> 'cancelled';

create or replace function public.book_appointment(
  p_slot_date date,
  p_slot_time time,
  p_full_name text,
  p_email text,
  p_phone text,
  p_note text default ''
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if exists (
    select 1 from public.appointment_bookings
    where slot_date = p_slot_date and slot_time = p_slot_time and status <> 'cancelled'
  ) then
    raise exception 'Horario ocupado. Elige otro horario disponible.' using errcode = '23505';
  end if;

  insert into public.appointment_bookings(user_id, slot_date, slot_time, full_name, email, phone, note)
  values (auth.uid(), p_slot_date, p_slot_time, coalesce(nullif(p_full_name,''),'Cliente Legal TIC'), p_email, p_phone, p_note)
  returning id into v_id;

  return v_id;
end;
$$;

-- -----------------------------
-- STORAGE
-- -----------------------------
insert into storage.buckets (id, name, public)
values ('service-request-documents', 'service-request-documents', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('service-images', 'service-images', true)
on conflict (id) do nothing;

-- -----------------------------
-- RLS
-- -----------------------------
alter table public.profiles enable row level security;
alter table public.service_catalog enable row level security;
alter table public.service_subservices enable row level security;
alter table public.digital_portals enable row level security;
alter table public.app_settings enable row level security;
alter table public.service_requests enable row level security;
alter table public.request_documents enable row level security;
alter table public.appointment_bookings enable row level security;

drop policy if exists profiles_select_own_or_internal on public.profiles;
create policy profiles_select_own_or_internal on public.profiles for select
using (id = auth.uid() or public.is_internal_user());


drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert
with check (id = auth.uid());

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update
using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists profiles_admin_manage on public.profiles;
create policy profiles_admin_manage on public.profiles for all
using (public.is_admin_user()) with check (public.is_admin_user());

drop policy if exists service_catalog_public_select on public.service_catalog;
create policy service_catalog_public_select on public.service_catalog for select
using (active = true or public.is_internal_user());

drop policy if exists service_catalog_admin_write on public.service_catalog;
create policy service_catalog_admin_write on public.service_catalog for all
using (public.is_admin_user()) with check (public.is_admin_user());

drop policy if exists service_subservices_public_select on public.service_subservices;
create policy service_subservices_public_select on public.service_subservices for select
using (true);

drop policy if exists service_subservices_admin_write on public.service_subservices;
create policy service_subservices_admin_write on public.service_subservices for all
using (public.is_admin_user()) with check (public.is_admin_user());

drop policy if exists digital_portals_public_select on public.digital_portals;
create policy digital_portals_public_select on public.digital_portals for select
using (active = true or public.is_internal_user());

drop policy if exists digital_portals_admin_write on public.digital_portals;
create policy digital_portals_admin_write on public.digital_portals for all
using (public.is_admin_user()) with check (public.is_admin_user());

drop policy if exists app_settings_public_select on public.app_settings;
create policy app_settings_public_select on public.app_settings for select
using (true);

drop policy if exists app_settings_admin_write on public.app_settings;
create policy app_settings_admin_write on public.app_settings for all
using (public.is_admin_user()) with check (public.is_admin_user());

drop policy if exists service_requests_insert_public on public.service_requests;
create policy service_requests_insert_public on public.service_requests for insert
with check (auth.uid() is not null);

drop policy if exists service_requests_select_own_or_internal on public.service_requests;
create policy service_requests_select_own_or_internal on public.service_requests for select
using (public.is_internal_user() or client_id = auth.uid());

drop policy if exists service_requests_client_update_subservices on public.service_requests;
create policy service_requests_client_update_subservices on public.service_requests for update
using (client_id = auth.uid() or public.is_internal_user())
with check (client_id = auth.uid() or public.is_internal_user());

drop policy if exists service_requests_client_delete on public.service_requests;
create policy service_requests_client_delete on public.service_requests for delete
using ((client_id = auth.uid()) and state = 'Solicitud' or public.is_admin_user());

drop policy if exists documents_select_own_or_internal on public.request_documents;
create policy documents_select_own_or_internal on public.request_documents for select
using (
  public.is_internal_user()
  or exists (select 1 from public.service_requests sr where sr.id = request_id and (sr.client_id = auth.uid()))
);

drop policy if exists documents_insert_own_or_internal on public.request_documents;
create policy documents_insert_own_or_internal on public.request_documents for insert
with check (
  public.is_internal_user()
  or exists (select 1 from public.service_requests sr where sr.id = request_id and (sr.client_id = auth.uid()))
);

drop policy if exists appointments_select_public_day on public.appointment_bookings;
create policy appointments_select_public_day on public.appointment_bookings for select
using (true);

drop policy if exists appointments_insert_public on public.appointment_bookings;
create policy appointments_insert_public on public.appointment_bookings for insert
with check (true);

drop policy if exists appointments_internal_update on public.appointment_bookings;
create policy appointments_internal_update on public.appointment_bookings for update
using (public.is_internal_user()) with check (public.is_internal_user());

-- Storage policies
drop policy if exists service_images_public_read on storage.objects;
create policy service_images_public_read on storage.objects for select
using (bucket_id = 'service-images');

drop policy if exists service_images_admin_write on storage.objects;
create policy service_images_admin_write on storage.objects for insert
with check (bucket_id = 'service-images' and public.is_admin_user());

drop policy if exists request_docs_read_controlled on storage.objects;
create policy request_docs_read_controlled on storage.objects for select
using (bucket_id = 'service-request-documents' and (auth.role() = 'authenticated' or public.is_internal_user()));

drop policy if exists request_docs_upload_controlled on storage.objects;
create policy request_docs_upload_controlled on storage.objects for insert
with check (bucket_id = 'service-request-documents');

-- -----------------------------
-- DATOS INICIALES DEL CATÁLOGO
-- -----------------------------
insert into public.service_catalog(id, name, group_key, price_reference, image_url, detail, sort_order)
values
('cursos','CURSOS LEGAL TIC','firdi','Cotización según curso','/assets/services/cursos.jpg','Capacitaciones jurídicas y tecnológicas orientadas al uso práctico de herramientas digitales.',1),
('herencia','HERENCIA Y TESTAMENTOS','personas','Desde Bs. 250','/assets/services/herencia.jpg','Asesoramiento y asistencia para procedimientos sucesorios, administrativos o judiciales.',2),
('impuestos','DECLARACIÓN DE IMPUESTOS','personas','Según revisión','/assets/services/impuestos.jpeg','Realización y revisión de declaraciones con enfoque profesional.',3),
('familia','TRÁMITES DE REGISTRO CIVIL, CARÁCTER FAMILIAR Y PROCESOS JUDICIALES','personas','Según trámite','/assets/services/familia.jpg','Procesos y procedimientos para cambio o modificación de estado civil y trámites familiares o judiciales.',4),
('inmobiliarios','TRÁMITES INMOBILIARIOS – VIVIENDA','personas','Según inmueble','/assets/services/inmobiliarios.jpg','Compra venta, hipoteca, contratos, transferencias, sucesiones, donaciones, escrituras e impuestos.',5),
('firma','FIRMA DIGITAL','empresas','Según entidad','/assets/services/firma.jpg','Gestión y orientación para solicitud, habilitación y uso de firma digital.',6),
('startup','SERVICIOS STARTUP','empresas','Paquete inicial','/assets/services/startup.jpg','Constitución, contratos, estructura documental y prevención de riesgos para nuevas empresas.',7),
('gestoria','GESTORÍA ADMINISTRATIVA, LABORAL Y OTROS SERVICIOS','firdi','Según trámite','/assets/services/gestoria.jpg','Gestoría administrativa y trámites online mediante plataformas virtuales.',8)
on conflict (id) do update set
  name = excluded.name,
  group_key = excluded.group_key,
  price_reference = excluded.price_reference,
  image_url = excluded.image_url,
  detail = excluded.detail,
  sort_order = excluded.sort_order,
  active = true;

-- Reinserta subservicios base sin duplicar.
delete from public.service_subservices where service_id in ('cursos','herencia','impuestos','familia','inmobiliarios','firma','startup','gestoria');
insert into public.service_subservices(service_id, name, sort_order) values
('cursos','Curso de uso de plataforma',1),('cursos','Webinar jurídico',2),('cursos','Actualización profesional',3),('cursos','Asesoría de herramientas digitales',4),
('herencia','Aceptación de herencia',1),('herencia','Certificado de defunción',2),('herencia','Impuesto de sucesiones',3),('herencia','Impuesto municipal de transferencia de terrenos',4),('herencia','Otras certificaciones e inscripciones',5),
('impuestos','Declaración tributaria',1),('impuestos','Revisión de formularios',2),('impuestos','Orientación sobre obligaciones fiscales',3),
('familia','Cambio de estado civil',1),('familia','Liquidación de bienes gananciales',2),('familia','Conclusión de trámites de divorcio',3),('familia','Acuerdos transaccionales',4),('familia','Certificado de matrimonio',5),('familia','Certificado de nacimiento',6),('familia','Cambio de apellidos',7),('familia','Pasaporte',8),
('inmobiliarios','Compra venta de inmueble',1),('inmobiliarios','Minuta y protocolo',2),('inmobiliarios','Impuestos de transferencia',3),('inmobiliarios','Derechos Reales',4),('inmobiliarios','Revisión documental',5),
('firma','Solicitud de firma digital',1),('firma','Certificación digital',2),('firma','Soporte para activación',3),('firma','Uso de firma electrónica',4),
('startup','Constitución de empresas',1),('startup','Contratos comerciales',2),('startup','Acuerdos societarios',3),('startup','Registro y formalización',4),
('gestoria','Pago de impuestos',1),('gestoria','Trámites SENAPI',2),('gestoria','Trámites FUNDEMPRESA',3),('gestoria','Cuaderno Electrónico Fiscalía',4),('gestoria','Trámites administrativos',5);

insert into public.digital_portals(id, title, image_url, url, sort_order)
values
('ciudadania','CIUDADANÍA DIGITAL','/assets/gov/ciudadania.png','',1),
('fundempresa','FUNDEMPRESA','/assets/gov/fundempresa.png','',2),
('hermes','HERMES - Notificación Electrónica','/assets/gov/hermes.png','',3),
('justicia-libre','Justicia Libre - Fiscalía','/assets/gov/justicia-libre.png','',4),
('registro-comercio','Registro de Comercio','/assets/gov/registro-comercio.jpg','',5),
('ruat','RUAT','/assets/gov/ruat.png','',6),
('sinarep','SINAREP - Derechos Reales','/assets/gov/sinarep.png','',7),
('sirej','SIREJ','/assets/gov/sirej.png','',8),
('sirej-react','SIREJ React – Consulta para PARTES','/assets/gov/sirej-react.png','',9),
('mercurio','Sistema Mercurio - Buzón Judicial','/assets/gov/mercurio.jpg','',10)
on conflict (id) do update set
  title = excluded.title,
  image_url = excluded.image_url,
  url = excluded.url,
  sort_order = excluded.sort_order,
  active = true;

insert into public.app_settings(key, value, description)
values ('whatsapp_number','59173132529','Número principal usado por botones de WhatsApp en contacto, agenda y servicios')
on conflict (key) do update set value = excluded.value, description = excluded.description, updated_at = now();

-- -----------------------------
-- INSTRUCCIÓN POSTERIOR
-- -----------------------------
-- Después de crear usuarios en Authentication, asigna roles así:
-- Administrador maestro aprobado para producción:
-- 1) Primero crea este usuario en Authentication > Users:
--    correo: legaltic.abogados@gmail.com
--    contraseña: una contraseña segura o temporal.
-- 2) Luego ejecuta:
-- update public.profiles set role = 'admin', active = true, full_name = 'Administrador Legal TIC' where email = 'legaltic.abogados@gmail.com';
-- 3) Para abogados habilitados:
-- update public.profiles set role = 'lawyer', active = true, full_name = 'Abogado habilitado' where email = 'abogado@legaltic.bo';
-- Nota: las contraseñas reales se administran en Supabase Auth o desde la función segura de Netlify; no se guardan en public.profiles.
