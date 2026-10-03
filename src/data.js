export const roleEmails = {
  admin: ['admin@legaltic.bo', 'administrador@legaltic.bo', 'limber@legaltic.bo'],
  lawyer: ['abogado@legaltic.bo', 'carla@legaltic.bo', 'marco@legaltic.bo'],
};

export function getRoleFromEmail(email = '') {
  const clean = email.trim().toLowerCase();
  if (roleEmails.admin.includes(clean)) return 'admin';
  if (roleEmails.lawyer.includes(clean)) return 'lawyer';
  return 'client';
}

export const firdiSteps = [
  'El cliente hace contacto con FiRDi y proporciona datos y detalles de su proceso.',
  'FiRDi asigna a un gestor para atender sus necesidades.',
  'El gestor de FiRDi procesa la información y detalles que se requerirán.',
  'El gestor de FiRDi ejecuta el servicio.',
  'El gestor de FiRDi revisa y ejerce seguimiento al servicio ejecutado.',
  'Se entrega el servicio al cliente con garantía de calidad.',
];

export const serviceGroups = [
  { id: 'todos', label: 'Todos' },
  { id: 'personas', label: 'Personas' },
  { id: 'empresas', label: 'Empresas' },
  { id: 'firdi', label: 'FiRDi' },
];

export const services = [
  {
    id: 'cursos',
    name: 'CURSOS LEGAL TIC',
    group: 'firdi',
    price: 'Cotización según curso',
    image: '/assets/services/cursos.jpg',
    detail: 'Capacitaciones y actualización profesional constante, con contenidos jurídicos y tecnológicos orientados al uso práctico de herramientas digitales.',
    subservices: ['Curso de uso de plataforma', 'Webinar jurídico', 'Actualización profesional', 'Asesoría de herramientas digitales'],
  },
  {
    id: 'herencia',
    name: 'HERENCIA Y TESTAMENTOS',
    group: 'personas',
    price: 'Desde Bs. 250',
    image: '/assets/services/herencia.jpg',
    detail: 'Asesoramiento y asistencia con atención personalizada para procedimientos sucesorios, administrativos o judiciales.',
    subservices: ['Aceptación de herencia', 'Certificado de defunción', 'Impuesto de sucesiones', 'Impuesto municipal de transferencia de terrenos', 'Otras certificaciones e inscripciones'],
  },
  {
    id: 'impuestos',
    name: 'DECLARACIÓN DE IMPUESTOS',
    group: 'personas',
    price: 'Según revisión',
    image: '/assets/services/impuestos.jpeg',
    detail: 'Realización y revisión de declaraciones con enfoque profesional, procurando la integridad de los intereses del solicitante.',
    subservices: ['Declaración tributaria', 'Revisión de formularios', 'Orientación sobre obligaciones fiscales'],
  },
  {
    id: 'familia',
    name: 'TRÁMITES DE REGISTRO CIVIL, CARÁCTER FAMILIAR Y PROCESOS JUDICIALES',
    group: 'personas',
    price: 'Según trámite',
    image: '/assets/services/familia.jpg',
    detail: 'Procesos y procedimientos para cambio o modificación de estado civil y trámites familiares o judiciales.',
    subservices: ['Cambio de estado civil', 'Liquidación de bienes gananciales', 'Conclusión de trámites de divorcio', 'Acuerdos transaccionales', 'Certificado de matrimonio', 'Certificado de nacimiento', 'Cambio de apellidos', 'Pasaporte'],
  },
  {
    id: 'inmobiliarios',
    name: 'TRÁMITES INMOBILIARIOS – VIVIENDA',
    group: 'personas',
    price: 'Según inmueble',
    image: '/assets/services/inmobiliarios.jpg',
    detail: 'Compra venta, hipoteca, contratos, transferencias, sucesiones, donaciones, escrituras e impuestos vinculados a inmuebles.',
    subservices: ['Compra venta de inmueble', 'Minuta y protocolo', 'Impuestos de transferencia', 'Derechos Reales', 'Revisión documental'],
  },
  {
    id: 'firma',
    name: 'FIRMA DIGITAL',
    group: 'empresas',
    price: 'Según entidad',
    image: '/assets/services/firma.jpg',
    detail: 'Gestión y orientación para solicitud, habilitación y uso de firma digital en procesos administrativos o empresariales.',
    subservices: ['Solicitud de firma digital', 'Certificación digital', 'Soporte para activación', 'Uso de firma electrónica'],
  },
  {
    id: 'startup',
    name: 'SERVICIOS STARTUP',
    group: 'empresas',
    price: 'Paquete inicial',
    image: '/assets/services/startup.jpg',
    detail: 'Servicios legales de constitución, contratos, estructura documental y prevención de riesgos para nuevas empresas.',
    subservices: ['Constitución de empresas', 'Contratos comerciales', 'Acuerdos societarios', 'Registro y formalización'],
  },
  {
    id: 'empresarial',
    name: 'SERVICIOS Y ASESORAMIENTO EMPRESARIAL',
    group: 'empresas',
    price: 'Cotización ejecutiva',
    image: '/assets/services/empresarial.jpg',
    detail: 'Asesoramiento empresarial, representación legal, directorios, contratos estratégicos, prevención de controversias y gobierno corporativo.',
    subservices: ['Constitución de empresas', 'Representación legal', 'Contratos comerciales', 'Prevención de litigios', 'Gobierno corporativo'],
  },
  {
    id: 'banca',
    name: 'ASESORAMIENTO FINANCIERO Y DE PROYECTOS CON LA BANCA',
    group: 'empresas',
    price: 'Según carpeta',
    image: '/assets/services/banca.jpg',
    detail: 'Conformación documental para acceso a préstamos, créditos bancarios, seguros, reaseguros y banca.',
    subservices: ['Carpeta documental bancaria', 'Revisión de requisitos', 'Negociación jurídica', 'Contratos financieros'],
  },
  {
    id: 'urbanizacion',
    name: 'PROYECTOS DE URBANIZACIÓN, BIENES RAÍCES Y CONSTRUCCIÓN',
    group: 'empresas',
    price: 'Proyecto especial',
    image: '/assets/services/urbanizacion.jpg',
    detail: 'Estudio legal de proyectos, negociación jurídica, análisis de inmuebles, saneamiento y contratos vinculados.',
    subservices: ['Análisis legal de inmueble', 'Saneamiento documental', 'Contratos de proyecto', 'Gestión de urbanización'],
  },
  {
    id: 'gestoria',
    name: 'GESTORÍA ADMINISTRATIVA, LABORAL Y OTROS SERVICIOS',
    group: 'firdi',
    price: 'Según trámite',
    image: '/assets/services/gestoria.jpg',
    detail: 'Gestoría administrativa y trámites online mediante asesoramiento específico y uso de plataformas virtuales.',
    subservices: ['Pago de impuestos', 'Trámites SENAPI', 'Trámites FUNDEMPRESA', 'Cuaderno Electrónico Fiscalía', 'Trámites administrativos'],
  },
  {
    id: 'confidencialidad',
    name: 'ACUERDO DE CONFIDENCIALIDAD (GRATUITO)',
    group: 'personas',
    price: 'Gratis',
    image: '/assets/services/confidencialidad.jpg',
    detail: 'Instrumento de obligación de confidencialidad para proteger la información entregada al solicitar un servicio.',
    subservices: ['Acuerdo de confidencialidad', 'Revisión básica de datos'],
  },
  {
    id: 'acuerdo-comercial',
    name: 'ACUERDO COMERCIAL ESTRATÉGICO (GRATUITO)',
    group: 'personas',
    price: 'Gratis',
    image: '/assets/services/acuerdo-comercial.jpg',
    detail: 'Acuerdo base para ordenar la relación comercial y estratégica entre cliente y firma, según el servicio solicitado.',
    subservices: ['Acuerdo comercial', 'Solicitud inicial', 'Datos para propuesta'],
  },
  {
    id: 'penales',
    name: 'CONTINUACIÓN DE PROCESOS PENALES',
    group: 'personas',
    price: 'Evaluación previa',
    image: '/assets/services/penales.jpg',
    detail: 'Prosecución, revisión y seguimiento de procesos penales nuevos o ya constituidos.',
    subservices: ['Revisión de antecedentes', 'Memoriales', 'Seguimiento fiscal/judicial', 'Estrategia procesal'],
  },
  {
    id: 'registro-ip',
    name: 'REGISTRO Y PROPIEDAD INTELECTUAL',
    group: 'personas',
    price: 'Según registro',
    image: '/assets/services/registro-ip.jpg',
    detail: 'Registro de marca, gestión de patentes, registro de dominio y protección de activos intangibles.',
    subservices: ['Registro de marca', 'Búsqueda preliminar', 'Gestión de patentes', 'Registro de dominio'],
  },
  {
    id: 'transferencias',
    name: 'TRANSFERENCIAS MUEBLES E INMUEBLES',
    group: 'personas',
    price: 'Según operación',
    image: '/assets/services/transferencias.jpg',
    detail: 'Transferencias de vehículos, maquinaria, viviendas, lotes y otros bienes muebles o inmuebles.',
    subservices: ['Transferencia de vehículo', 'Transferencia de inmueble', 'Minutas', 'Impuestos y registros'],
  },
  {
    id: 'asociaciones',
    name: 'CONSTITUCIÓN Y ASESORÍA JURÍDICA DE ASOCIACIONES',
    group: 'personas',
    price: 'Según alcance',
    image: '/assets/services/asociaciones.jpg',
    detail: 'Inicio y conclusión del procedimiento para constituir asociaciones, con entrega física y digital de certificaciones.',
    subservices: ['Constitución de asociación', 'Estatuto y reglamento', 'Trámite administrativo', 'Certificaciones'],
  },
];

export const ticTools = [
  {
    id: 'base-legaltic',
    name: 'Base LegalTIC',
    tagline: 'Gestión legal digital',
    description: 'Plataforma ejecutiva para administrar servicios, usuarios, solicitudes, pagos y documentos jurídicos desde un entorno LegalTIC.',
    image: '/assets/tools/base-legaltic.png',
    url: '',
    buttonLabel: 'Acceder a Base LegalTIC',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'endo',
    name: 'ENDO',
    tagline: 'Impresión y documentación legal',
    description: 'Herramienta TIC orientada a impresión, gestión documental y trabajo legal administrativo con lógica práctica de despacho.',
    image: '/assets/tools/endo.png',
    url: '',
    buttonLabel: 'Descargar ENDO',
    active: true,
    sortOrder: 2,
  },
];

export const portals = [
  { id: 'ciudadania', title: 'CIUDADANÍA DIGITAL', image: '/assets/gov/ciudadania.png', url: '' },
  { id: 'fundempresa', title: 'FUNDEMPRESA', image: '/assets/gov/fundempresa.png', url: '' },
  { id: 'hermes', title: 'HERMES - Notificación Electrónica', image: '/assets/gov/hermes.png', url: '' },
  { id: 'justicia-libre', title: 'Justicia Libre - Fiscalía', image: '/assets/gov/justicia-libre.png', url: '' },
  { id: 'registro-comercio', title: 'Registro de Comercio', image: '/assets/gov/registro-comercio.jpg', url: '' },
  { id: 'ruat', title: 'RUAT', image: '/assets/gov/ruat.png', url: '' },
  { id: 'sinarep', title: 'SINAREP - Derechos Reales', image: '/assets/gov/sinarep.png', url: '' },
  { id: 'sirej', title: 'SIREJ', image: '/assets/gov/sirej.png', url: '' },
  { id: 'sirej-react', title: 'SIREJ React – Consulta para PARTES', image: '/assets/gov/sirej-react.png', url: '' },
  { id: 'mercurio', title: 'Sistema Mercurio - Buzón Judicial', image: '/assets/gov/mercurio.jpg', url: '' },
];

export const baseRequests = [
  {
    id: 'LT-001',
    service: 'HERENCIA Y TESTAMENTOS',
    client: 'María Castillo',
    phone: '67844933',
    email: 'maria@mail.com',
    subservices: ['Aceptación de herencia'],
    updatedAt: '2026-05-12, 09:30:43',
    state: 'Solicitud',
    payment: 'Pendiente de comprobación',
    paymentReceipt: 'voucher-transferencia.jpg',
    requiredUploads: ['Carnet de identidad', 'Certificado de defunción', 'Declaratoria de herederos'],
    uploadedByClient: ['Carnet de identidad.pdf', 'Certificado de defunción.jpg'],
    finalDocument: '',
    assignedTo: 'Sin asignar',
    adminNote: 'Verificar pago antes de iniciar elaboración.',
  },
  {
    id: 'LT-002',
    service: 'SERVICIOS STARTUP',
    client: 'Luis Arteaga',
    phone: '67899934',
    email: 'prueba@gmail.com',
    subservices: ['Contratos comerciales'],
    updatedAt: '2026-05-12, 10:25:35',
    state: 'En desarrollo',
    payment: 'Pago aprobado',
    paymentReceipt: 'qr-pago-startup.png',
    requiredUploads: ['Carnet de identidad', 'Datos de la empresa', 'NIT o reserva de nombre'],
    uploadedByClient: ['Carnet Luis.pdf', 'Datos startup.docx'],
    finalDocument: '',
    assignedTo: 'Abg. Carla Rojas',
    adminNote: 'Preparar contrato base y solicitar dato faltante de representante.',
  },
  {
    id: 'LT-003',
    service: 'FIRMA DIGITAL',
    client: 'Empresa Andina SRL',
    phone: '72112233',
    email: 'admin@andina.bo',
    subservices: ['Solicitud de firma digital', 'Soporte para activación'],
    updatedAt: '2026-05-12, 11:11:53',
    state: 'Concluido',
    payment: 'Pago aprobado',
    paymentReceipt: 'comprobante-firma.pdf',
    requiredUploads: ['Carnet representante legal', 'Poder', 'NIT'],
    uploadedByClient: ['Carnet representante.pdf', 'Poder.pdf', 'NIT.pdf'],
    finalDocument: 'instructivo-firma-digital.pdf',
    assignedTo: 'Abg. Marco Peña',
    adminNote: 'Documento final cargado.',
  },
];

export function buildNewRequest(service, selectedSubservices = []) {
  return {
    id: `LT-${Date.now().toString().slice(-5)}`,
    service: service.name,
    client: 'Usuario Demo',
    phone: '70000000',
    email: 'usuario@demo.com',
    subservices: selectedSubservices.length ? selectedSubservices : service.subservices.slice(0, 1),
    updatedAt: '2026-05-12, 12:00:00',
    state: 'Solicitud',
    payment: 'Pendiente de comprobación',
    paymentReceipt: 'pendiente-de-subir.pdf',
    requiredUploads: ['Carnet de identidad', 'Comprobante de pago', 'Documentos específicos del servicio'],
    uploadedByClient: [],
    finalDocument: '',
    assignedTo: 'Sin asignar',
    adminNote: 'Nueva solicitud creada desde catálogo.',
  };
}


export function applyRequestPatch(requests, requestId, patch, timestamp = 'Actualizado ahora') {
  return requests.map((request) => {
    const matches = request.id === requestId || request.dbId === requestId;
    return matches ? { ...request, ...patch, updatedAt: timestamp } : request;
  });
}

export function validatePreviewData() {
  if (firdiSteps.length !== 6) return false;
  if (!services.some((service) => service.id === 'firma')) return false;
  if (!services.every((service) => service.image && service.subservices.length > 0)) return false;
  if (getRoleFromEmail('admin@legaltic.bo') !== 'admin') return false;
  if (getRoleFromEmail('abogado@legaltic.bo') !== 'lawyer') return false;
  if (getRoleFromEmail('cliente@correo.com') !== 'client') return false;
  if (baseRequests.some((request) => !request.paymentReceipt)) return false;
  if (!portals.every((portal) => Object.prototype.hasOwnProperty.call(portal, 'url'))) return false;
  if (!ticTools.every((tool) => tool.image && Object.prototype.hasOwnProperty.call(tool, 'url'))) return false;
  return true;
}

export function buildEnumeratedServiceOptions(serviceList = services) {
  return serviceList.map((service, index) => ({
    id: service.id,
    value: service.name,
    label: `${index + 1}. ${service.name}`,
  }));
}
