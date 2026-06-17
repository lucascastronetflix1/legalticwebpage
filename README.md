# LegalTIC Web App v7.9.18

Corrección puntual sobre versión aprobada v7.9.17:

- Corrige sincronización de rol/estado de usuarios Google cuando el perfil se encuentra por correo y no por id local.
- Evita el mensaje técnico “No se encontró el perfil en Supabase...” cuando el usuario existe en la bandeja local.
- Mantiene el cambio aplicado en pantalla y persistido en respaldo local si el perfil aún no existe en public.profiles durante pruebas localhost.
- Reduce el ancho del Editor de usuario y compacta sus botones sin tocar la lógica aprobada de Google Auth, administrador maestro, solicitudes vacías ni avatar por iniciales.

# LegalTIC Web App v7.9.9 — Google Auth real y perfil compacto

Versión corregida para que la dinámica real sea Google Auth para clientes, abogados y administradores, sin registro nativo visible y con perfil compacto en Mis solicitudes.

## Cambios principales

- Se mantiene el acceso con Google como dinámica principal para usuarios, abogados y administradores.
- Se elimina el registro/inicio nativo visible por contraseña de la web.
- El botón público queda como **INICIAR CON GOOGLE**.
- `legaltic.abogados@gmail.com` queda forzado como administrador maestro cuando ingresa con esa cuenta Google.
- Los usuarios con rol `lawyer` en `public.profiles` ingresan directamente al panel interno como abogados habilitados.
- Los usuarios nuevos ingresan como clientes y vuelven a Inicio con sesión iniciada.
- Los usuarios de Google se sincronizan en Supabase `Authentication > Users` y en `public.profiles`.
- En “Mis solicitudes” se elimina el bloque grande de perfil. Queda solo la foto pequeña de perfil al lado del título; al hacer clic en la foto se abre un modal de edición.
- Después de guardar perfil, el modal se cierra automáticamente y no queda cuadro amarillo ocupando la pantalla.
- Se conserva el texto:
  - Seguridad: la contraseña no se crea en esta web. Cada usuario administra su contraseña desde su propia cuenta Google.
  - Recuperación: si el usuario olvida su contraseña, debe recuperarla desde Google.


## Regla de acceso desde esta versión

Desde esta versión, la regla operativa es:

- Clientes: ingresan con Google.
- Abogados: ingresan con Google y deben tener `role = lawyer` y `active = true` en `public.profiles`.
- Administrador maestro: ingresa con Google usando exactamente `legaltic.abogados@gmail.com`.
- Administradores adicionales: ingresan con Google y deben tener `role = admin` y `active = true` en `public.profiles`.
- La web no usa contraseña propia ni recuperación propia por correo. La contraseña se administra en Google.

Si después de subir esta versión aparece el formulario nativo anterior, Netlify está sirviendo una versión vieja o el navegador tiene caché. Usar **Clear cache and deploy site** y luego **Ctrl + F5**.

## Variables necesarias en Netlify

Configura estas variables en Netlify:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY_PUBLICA
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY_PUBLICA
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY_SECRETA
```

La variable `SUPABASE_SERVICE_ROLE_KEY` no debe llevar `VITE_` porque es secreta y solo se usa en las funciones de Netlify.

## Configuración obligatoria en Supabase y Google

1. En Google Cloud Console crea un OAuth Client ID tipo Web application.
2. En Authorized JavaScript origins agrega tu dominio de Netlify, por ejemplo:
   `https://TU-SITIO.netlify.app`
3. En Authorized redirect URIs agrega la callback exacta de Supabase:
   `https://TU-PROYECTO.supabase.co/auth/v1/callback`
4. En Supabase ve a Authentication > Providers > Google y activa Google.
5. Pega el Client ID y Client Secret de Google.
6. En Supabase Authentication > URL Configuration coloca como Site URL tu dominio de Netlify.
7. En Redirect URLs agrega tu dominio de Netlify, por ejemplo:
   `https://TU-SITIO.netlify.app/**`
8. En Netlify usa Clear cache and deploy site.

## Comandos verificados

```bash
npm test
npm run build
```

Resultado local: 14 pruebas aprobadas y build correcto.


## v7.9.10 - corrección localhost Google Auth

- En localhost con `npm run dev`, Vite no ejecuta funciones Netlify (`/.netlify/functions/...`).
- Ahora, si la función `oauth-profile-sync` no responde o no devuelve perfil, la app toma la sesión real de Google desde Supabase y construye el perfil localmente.
- `legaltic.abogados@gmail.com` queda forzado como administrador maestro después de validar sesión Google.
- Clientes vuelven a Inicio con sesión iniciada.
- Abogados/administradores van directo al panel interno según `profiles.role` o correo maestro.
- Se mantiene eliminado el formulario nativo de contraseña; el acceso real es Google.


## Nota v7.9.12

Esta versión reincorpora `.env.local` dentro del ZIP por instrucción expresa del titular del proyecto, para evitar pasos manuales al trabajar en localhost.

Corrección base conservada: `StatusBadge` corregido, flujo Google Auth en localhost, y respaldo local cuando Vite no ejecuta funciones de Netlify.


## Versión v7.9.14 — navegación activa y eliminación de usuarios

Cambios incluidos:

- Corrige la cinta de navegación pública: al pasar de Inicio a FiRDi, Agenda, Contáctanos o Servicios, solo queda marcada la sección activa.
- Agrega botón **Eliminar usuario** en la bandeja de administración.
- El botón **Bloquear acceso** se conserva como bloqueo sin borrar historial.
- En producción Netlify, **Eliminar usuario** usa la función segura `netlify/functions/admin-users.mjs` para borrar el perfil y el usuario de Supabase Auth.
- En localhost con `npm run dev`, si Netlify Functions no están disponibles, elimina el registro de `public.profiles` y lo quita de la bandeja local.
- Se protege el administrador maestro `legaltic.abogados@gmail.com` para que no pueda eliminarse desde la bandeja.

## v7.9.16 — Corrección editor de usuarios

- Se corrige el aviso de Supabase `Cannot coerce the result to a single JSON object` al guardar cambios de rol/estado del usuario.
- Se amplía la columna del Editor de usuario para evitar que se vea apretada.
- Los botones Guardar cambios, Limpiar formulario, Bloquear acceso y Eliminar usuario pasan al lado derecho del título del editor.
- Se mantiene aprobada la lógica de ingreso con Google, lista de usuarios/roles, bandeja vacía para usuarios nuevos y avatar con iniciales.

## Versión v7.9.19

Correcciones aplicadas sobre la versión aprobada:

- El rol autorizado desde Usuarios y roles ahora se conserva al volver a ingresar con Google en localhost. Si un usuario fue cambiado a abogado habilitado, al iniciar sesión debe entrar al panel interno.
- La sincronización de perfiles intenta actualizar por id, por email y, si corresponde, insertar el perfil en Supabase cuando existe un id Google válido.
- El editor de usuario quedó más compacto y los botones Guardar, Limpiar, Bloquear y Eliminar quedan en una sola fila.
- Se conserva Google Auth, administrador maestro, usuarios Google visibles, solicitudes vacías, avatar con iniciales y archivo .env.local incluido.



## Versión v7.9.20 — Herramientas TIC LegalTIC

Base aprobada conservada desde v7.9.19. Cambios agregados:

- Nueva sección pública **Herramientas TIC** ubicada entre **FiRDi** y **Agenda una reunión**.
- Diseño tipo dashboard corporativo con tarjetas premium, escalable para Base LegalTIC, ENDO y futuras herramientas.
- Logos oficiales incorporados en `public/assets/tools/`.
- Cinta de navegación actualizada con **HERRAMIENTAS TIC**.
- Administración de herramientas dentro de **Panel interno → Servicios ofertados**, sin crear nueva bandeja.
- Cada herramienta permite editar nombre, subtítulo, descripción, logo, URL, texto del botón, orden y estado activo/inactivo.
- Las herramientas se guardan localmente y, si Supabase está configurado, en `app_settings` con la clave `tic_tools`.
- Se mantiene `.env.local` incluido conforme a instrucción del usuario.

Pruebas realizadas:

```bash
npm test
npm run build
```

Resultado: 14 pruebas aprobadas y build correcto.


## v7.9.24 - Inicio / FiRDi integrado

- Se eliminó la onda divisoria entre Inicio y FiRDi para que ambas secciones queden acopladas visualmente.
- Se eliminó la onda divisoria entre FiRDi y Herramientas TIC para mantener continuidad de fondo oscuro.
- Herramientas TIC conserva logos PNG sin tarjeta/fondo individual y botones aprobados.


## v7.9.25 - Herramientas TIC: ondas y logos

- Se elimina la línea recta entre Inicio y FiRDi: Inicio termina con onda oscura integrada.
- FiRDi inicia con la misma continuidad de onda, sin separación blanca.
- Herramientas TIC vuelve a ser una sección independiente con fondo diferente, enlazada mediante onda oscura/azul sin corte blanco.
- En el panel interno, Herramientas TIC ya no muestra campos Nombre ni Subtítulo; conserva descripción, URL, botón, logo, orden y estado.
- Logos Base LegalTIC y ENDO se reemplazan por versiones PNG transparentes de mayor calidad, sin fondos blancos externos.


## Versión v7.9.27
- Sección Herramientas TIC: fondo ejecutivo azul acero/gris, sin amarillo ni verde LegalTIC.
- Se eliminó la línea amarilla residual y cualquier resto de fondo verde/amarillo en esa sección.
- Se mantiene la base aprobada v7.9.19+ y el logo ENDO corregido.


## Versión v7.9.28 — Herramientas TIC fondo continuo

- Ajuste visual puntual en la sección pública Herramientas TIC.
- La onda superior e inferior conserva su forma, pero ya no deja franjas verdes residuales.
- El fondo ejecutivo de Herramientas TIC cubre toda la sección de forma uniforme.
- Se conserva todo lo aprobado de v7.9.19 y ajustes posteriores.
# legalticwebpage
# legalticwebpage
# legalticwebpage
