import React, { useEffect, useMemo, useState } from 'react';
import {
  applyRequestPatch,
  buildEnumeratedServiceOptions,
  baseRequests,
  buildNewRequest,
  firdiSteps,
  portals as initialPortals,
  ticTools as initialTicTools,
  serviceGroups,
  services as initialServices,
  validatePreviewData,
} from './data.js';

import { supabase } from './lib/supabaseClient.js';

import {
  isSupabaseConfigured,
  listServiceCatalog,
  upsertServiceCatalog,
  deleteServiceCatalog,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
  listRequestsForRole,
  listOccupiedAppointmentSlots,
  bookAppointment,
  signInOrDemo,
  signInWithGoogle,
  syncGoogleSessionProfile,
  signOutCurrent,
  getCurrentUserProfile,
  ensureCurrentGoogleProfile,
  listDigitalPortals,
  upsertDigitalPortal,
  deleteDigitalPortal,
  getAppSetting,
  upsertAppSetting,
  listProfiles,
  updateProfileRole,
  deleteManagedProfile,
  updateCurrentPassword,
  updateOwnProfile,
} from './lib/serviceRequestsRepository.js';

validatePreviewData();

const privacyPolicyText = "ChatGPT\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nConoce la plataforma Legal TIC_1080p.mp4\nArchivo\n\nTutorial de uso Plataforma Legal TIC_1080p.mp4\nArchivo\n\nPágina Web-20260512T043835Z-3-001.zip\nArchivo zip\n\nGobierno Electrónico-20260512T043841Z-3-001.zip\nArchivo zip\n1. quiero que de acuerdo a los videos e imagenes que te pase asemejes al 100% la pagina que se muestra en los videos, verifica y analiza detalladamente cada archivo, sobre todo los videos.\n2. asi mismo lo que pretendo que conformemos ahora es una web app que comprende: esta pagina web para usuarios y tambien una para administrador y abogados habilitados que pueden ver y aprobar solicitudes previa comprobación de pago.\n- segun verificaras y analizaras que se ofertan servicios, que al ser solicitudes requieren de su tratamiento y envio de documentos solicitados.\n\n- finalmente encontraras un documento word que indica algunas instrucciones que se hicieron en su momento, tomalas en cuenta.\n\n- del mismo modo para ello en la bandeja de solicitud de servicios se pueden descargar los documentos solicitados, y tambien se pueden subir documentos (carnet, certificados, etc. necesarios para conformar un documento o servicio solicitado).\n\nVoy a trabajar sobre los archivos que acabas de subir, no sobre suposiciones: extraeré fotogramas de los videos, revisaré los ZIP, buscaré el Word con instrucciones y luego actualizaré la vista previa para acercarla a la página real.\n\nThought for 9m 17s\nListo. Actualicé la vista previa del panel lateral y la convertí en una web app Legal TIC mucho más cercana a lo que muestran los videos.\n\nIncluí estos flujos:\n\nPágina pública\n\nInicio con logo Legal TIC Abogados.\n\nBotones Empresas / Personas.\n\nSección FiRDi con los 6 pasos.\n\nAgenda de reunión.\n\nFormulario de contacto.\n\nCatálogo de servicios.\n\nPortales de Gobierno Electrónico.\n\nUsuario / cliente\n\nRegistro.\n\nInicio de sesión.\n\nCatálogo con botón Solicitar servicio.\n\nModal de subservicios.\n\nBandeja Mis solicitudes de servicios.\n\nEstados: Solicitud, En desarrollo, Concluido, Cancelado.\n\nVer subservicios solicitados.\n\nDescargar documento final cuando exista.\n\nSubir documentos como carnet, certificados, comprobante de pago, etc.\n\nAdministrador / abogado habilitado\n\nPanel interno.\n\nBandeja de solicitudes.\n\nDescargar comprobante de pago.\n\nDescargar documentos subidos por el cliente.\n\nAprobar pago.\n\nAsignar / tomar solicitud.\n\nSubir documento final.\n\nConcluir o cancelar solicitud.\n\nDiferenciación entre Administrador y Abogado habilitado.\n\nTambién tomé en cuenta el documento Word: FiRDi como gestoría administrativa y trámites online, servicios para personas y empresas, acuerdo de confidencialidad, acuerdo comercial estratégico y servicios por subcategorías.\n\nPunto que necesito confirmar para no programar mal la lógica final:\n\n¿Los abogados habilitados podrán aprobar pagos, o solo el administrador debe aprobar pagos y los abogados solo atender solicitudes ya aprobadas?\n\n\nsobre tu pregunta:\n¿Los abogados habilitados podrán aprobar pagos, o solo el administrador debe aprobar pagos y los abogados solo atender solicitudes ya aprobadas? NO solo el administrador.\nel boton panel interno no debe aparecer, cuando el administrador y abogados ingresen con su correo automaticamente la vista debe cambiar a el panel administrativo (eso si, ya dentro del panel de administración sus facultades son diferentes obvimente).\n\n2. puedes darle esa caracteristica viva y no tan estatica a la web de usuarios, tal cual sale en los videos.\n3. para el panel interno dale una vista mas coorporativa-ejecutiva fina.\n\n4. te paso el logo de legaltic para que lo uses.\n5. utiliza las imagenes que te di para rellenar los lugares donde deban ir (replica el video tal cual).\n6. utiliza el mismo tipo de letra que se usa en los videos.\n\nno tomes en cuenta la imagen.\ndime si el archivo zip que me diste tiene el archivo .env\n\nPensado durante 5m 25s\nListo. Apliqué las mejoras sin romper la estructura aprobada y preparé un nuevo ZIP:\n\nDescargar Legal TIC Web App v3 — mejoras aprobadas\n\nCambios aplicados:\n\nFuente Arial en todo el proyecto.\n\nImagen real de FiRDi incorporada en lugar de solo escribir “FiRDi”.\n\nPanel interno más ejecutivo/comercial, a pantalla completa, con sidebar fijo y scroll vertical.\n\nBotón “Agenda tu videoconferencia” corregido y la frase “contáctanos por whatsapp” ahora es clickable.\n\nWhatsApp conectado al número +591 73132529.\n\nBotón flotante de WhatsApp en cada servicio abre conversación indicando el servicio seleccionado.\n\nEliminé la categoría visible de los servicios ofertados.\n\nSe mantiene solicitud de subservicios al crear una solicitud.\n\nAdministrador puede crear, editar y eliminar servicios, incluyendo imagen.\n\nLos cambios de servicios se reflejan en la bandeja pública de usuarios mientras la app esté abierta.\n\nAgregué pruebas nuevas: ahora pasan 10 pruebas.\n\nVerifiqué compilación: npm run build salió correcto.\n\nPara correrlo:\n\nnpm.cmd install\nnpm.cmd run dev\nSi lo haces desde CMD normal:\n\nnpm install\nnpm run dev\n\n5cf05d9a-a049-4f3e-a537-2d64e6f90b11.png\nbe530d05-71eb-4325-86da-d404780d5493.png\nfc9d06f4-e296-4f97-89ff-63799e179c33.png\n00cc0ac4-d109-418c-9e73-1fa59afda838.png\n3672a52f-221e-43a5-9562-e60c45838d59.png\n- segun imagen quiero que cambies la estructura de la vista de administrador. es muy cuadrada. replica y mejora una version segun los criterios de mi proyecto, tal cual las imagenes que te paso.\n- que los titulos mas grandes como:  Asesoría y Gestoría con innovación, ¿Cómo trabaja FiRDi?, NO SEAN TAN GORDOS/GRUESOS. haz que las fuentes de todo el proyecto sean mas frescas y no tan gruesas y cargadas.\n- que la lista de subservicios de cada servicio tengan casillas de seleccion para que cuando se de click en solicitar servicio lo seleccionado pase a bandeja de solicitud, ahora en caso de que se haya seleccionado un subservicio o servicio de manera equivocada el cliente/usuario podra eliminar su solicitud equivocada.\n\n- que el logotipo de LEGALTIC ABOGADOS no tenga ese fondo blanco, sino que sea solo el logotipo, estilo png.\n- que el logo de FIRDI NO ESTE DENTRO DE ESE CUADRO SINO SOLO SEA EL LOGO DE FIRDI tipo png, \n- que los separadores de seccion no sean lineas sino ondas como en los videos que te pase.\n- que el boton agenda tu conferencia quede en una fila y la palabra contactanos por whatsapp en otra linea abajo.\n- cuando se haga click en el boton agenda tu conferencia, se abra un modal que contenga un calendaria para agendar una fecha y una lista desplegable para elegir el horarios que sean cada 20 minutos entre hora y hora. ademas que tenga la caracteristica que si una hora esta ocupada salga un mensaje de hora ocupada (o elige un mejor termino) esto para que el usuario/cliente sepa que debera esperar o elegir otra hora.\n\nPensado durante 6m 1s\nListo. Preparé una nueva versión manteniendo la estructura aprobada y aplicando las mejoras que pediste.\n\nDescargar Legal TIC Web App v5 — Admin estilo ejecutivo + agenda + subservicios\n\nCambios aplicados\nPanel administrador rediseñado\n\nMás parecido a las imágenes que pasaste.\n\nBarra superior oscura.\n\nMenú lateral izquierdo claro.\n\nFiltros por estado.\n\nBandeja central amplia.\n\nMenú de acciones por solicitud.\n\nVista ejecutiva más fina y menos cuadrada.\n\nFuentes menos pesadas\n\nSe mantiene Arial en todo el proyecto.\n\nBajé el grosor visual de títulos grandes como:\n\n“Asesoría y Gestoría con innovación”\n\n“¿Cómo trabaja FiRDi?”\n\nEl diseño queda más fresco y menos cargado.\n\nLogo LegalTIC sin fondo blanco\n\nConvertí el logo a PNG con fondo transparente.\n\nYa no debería verse como tarjeta blanca detrás.\n\nLogo FiRDi corregido\n\nAhora usa el logo tipo PNG transparente.\n\nYa no aparece dentro de un cuadro.\n\nSeparadores con ondas\n\nReemplacé separadores rígidos por ondas entre secciones, siguiendo el estilo de los videos.\n\nAgenda de videoconferencia\n\nEl botón queda en una línea.\n\n“Contáctanos por WhatsApp” queda abajo, en otra línea.\n\nAl hacer clic en Agenda tu videoconferencia, se abre un modal con:\n\ncalendario,\n\nhorarios cada 20 minutos,\n\naviso cuando una hora está ocupada,\n\nconfirmación por WhatsApp.\n\nWhatsApp\n\nSe mantiene conectado al número:\n\n+591 73132529\nSubservicios seleccionables\n\nAhora el usuario debe marcar casillas de subservicios.\n\nLo seleccionado pasa a la bandeja de solicitudes.\n\nAgregué prueba para verificar que los subservicios seleccionados se conserven correctamente.\n\nEliminar solicitud equivocada\n\nEn “Mis solicitudes”, el cliente/usuario ahora puede eliminar una solicitud creada por error.\n\nServicios editables desde administrador\n\nSe mantiene la opción de:\n\neditar servicio,\n\naumentar servicio,\n\neliminar servicio,\n\ncambiar imagen,\n\nmodificar subservicios.\n\nLo editado se refleja en la bandeja pública mientras la app esté abierta.\n\nVerificación técnica\nAntes de comprimirlo ejecuté:\n\nnpm test\nnpm run build\nResultado:\n\n11 pruebas aprobadas\nBuild correcto\nPara correrlo\nDescarga y descomprime el ZIP. Luego usa preferentemente:\n\nLIMPIAR-E-INICIAR-CMD.bat\nO manualmente:\n\nnpm.cmd install\nnpm.cmd run dev\n\n59f27879-0198-4d28-9533-d0f56ef5924b.png\nb1b2d1c0-45cd-419c-81cc-f2b6290eddce.png\n2003544a-ae20-4ce6-8895-96695a3ae65d.png\nCaptura de pantalla 2026-05-26 195452.png\nbc61cd8a-b4d2-4d63-8fd9-5ab37ed05da3.png\nb23c2776-f627-4566-a8c0-d907064d5cca.png\n90cb2289-e3df-4231-aebd-7b01b6fc09a5.png\n51737dd6-b87c-4c5d-a361-b37dc82a5608.png\nFondo App.jpg\n3f6f6d3c-50c9-4032-ae26-45e91c6b2d02.png\n- haz que cuando se abra la pagina esa parte quede bien encuadrada en la pantalla y no cortada como se ve en la imagen.\n- segun imagen la lista de subservicios no debe quedar en una simple lista con viñetas sino debe poder seleccionarse los subservicios, razon por la cual debe quedar como una lista checklist para marcar y que lo seleccionado pase asi a la bandeja mis solicitudes (tambien si se selecciona algo por error debe poder cambiarse o eliminarse).\n- segun imagen: que las fuentes no esten en negrillas, sino normal.\n- segun imagen: los accesos directos no funcionan,\n- creo que hay varios botones que tienen la misma funcion, si no es necesario tenerlos eliminalos para que la bandeja quede mas limpia.\n- segun imagen: que la lista de servicios oferada se pueda ver segun empresa, personas, firdi, esto para que podamos ver todos para que sea mas facil Editar / aumentar (cambia esta palabra por Adicionar subservicios)/ eliminar.\n- segun imagen: cambia el color de la franja porque no se ve el logo de legaltic.\n- segun imagen: coloca una onda en vez de esa linea de separación de seccion.\n- segun imagen: que la fuente de cada casillas sean en fuente normal y no en negrillas. \n- aplica las ondas a todas las secciones del proyecto para dividirlas. tambien incorpora la imagen de ese hombre en traje (que quede identica). del mismo modo replica la apariencia de la seccion: mismo tamaño del formulario, lugar de titulos, etc. \n\n“Hazlo real con Supabase”\n\nPensado durante 13m 46s\nHecho. Te preparé la versión con agenda real conectable a Supabase, manteniendo la estructura aprobada y agregando las mejoras pendientes.\n\nDescargar Legal TIC Web App v6 — Supabase real\n\nQué cambia esta versión\nAgenda real con Supabase\n\nEl modal de “Agenda tu videoconferencia” consulta horarios ocupados.\n\nSi un horario ya está reservado, muestra aviso de Horario ocupado.\n\nSi está disponible, permite reservarlo.\n\nEn Supabase se bloquea el horario para que otro usuario no pueda tomarlo.\n\nSubservicios con checklist\n\nEn el modal del servicio, los subservicios aparecen con casillas.\n\nLo seleccionado pasa a Mis solicitudes.\n\nEn la bandeja de usuario se puede editar la selección o eliminar la solicitud equivocada.\n\nSupabase preparado\n\nIncluí el archivo:\n\nSUBIR-A-SUPABASE.sql\nEse archivo crea:\n\nperfiles,\n\nservicios ofertados,\n\nsubservicios,\n\nsolicitudes,\n\ndocumentos,\n\nagenda de videoconferencias,\n\nbuckets de Storage,\n\npolíticas RLS,\n\nfunción book_appointment.\n\nPanel administrador\n\nMantiene la estructura ejecutiva tipo TRATO.\n\nAccesos directos funcionales.\n\nServicios filtrables por:\n\nTodos\n\nPersonas\n\nEmpresas\n\nFiRDi\n\nCambié el texto a Editar / adicionar subservicios / eliminar.\n\nLos servicios se pueden guardar en Supabase si el administrador entra con usuario real.\n\nSección del hombre en traje\n\nIncorporé la imagen Fondo App.jpg.\n\nMejoré la composición para que se parezca más al video: hombre a la izquierda, formulario a la derecha, onda superior y mejor encuadre.\n\nEstilo visual\n\nFuente Arial.\n\nMenos negrilla.\n\nTítulos más livianos.\n\nOndas de separación.\n\nLogo LegalTIC y FiRDi como PNG, sin cuadros innecesarios.\n\nCómo correrlo\nDescomprime el ZIP y usa:\n\nnpm.cmd install\nnpm.cmd run dev\nO doble clic en:\n\nLIMPIAR-E-INICIAR-CMD.bat\nPara activar Supabase real\nEntra a Supabase.\n\nAbre SQL Editor.\n\nEjecuta el archivo:\n\nSUBIR-A-SUPABASE.sql\nCopia:\n\n.env.example\ny renómbralo como:\n\n.env.local\nCompleta:\n\nVITE_SUPABASE_URL=\nVITE_SUPABASE_ANON_KEY=\nNo pude ejecutar el build final en este entorno porque la instalación de paquetes npm quedó bloqueada por red/timeout, pero el ZIP ya está estructurado con los archivos necesarios para correrlo en tu equipo.\n\n\n8b3a05d7-10a2-4ab0-a8bd-d7ff3c2066a3.png\naa107d68-f867-4084-99ec-646f49095235.png\n4ea2797a-78b4-43b7-b6ce-a03cf7ccf1cd.png\n-  segun imagen: salio ese error.\n- segun imagen quiero que la pantalla inicial salga con ese encuadre donde se vea todo lo que se ve con la imagen que te pase como muestra. quita el logo de legaltic mas grande.\n- segun imagen: sale ese error cuando se reserva horario.\n\n70659097-5d21-457d-b922-3e9b1abba91f.png\n4b7b4e71-9d42-4a27-82d6-fde46ec8d3a2.png\nCaptura de pantalla 2026-05-27 173726.png\n8b8d0986-5fde-4ad1-ac5f-0245b0c1022e.png\n- segun imagen: porque salio ese mensaje?\n- segun imagen: porque cuando elijo un horario sale ocupado? si antes en la lista decia disponible. acaso no deberia decir tu horario esta agendado. Toma nota...\n- segun imagen que esa seccion salga entera cuando se haga click en el boton agendar reunion y en la cabecera agendar reunion.\n- segun imagen: que la sección diga Gobierno Digital Bolivia: todos las imagenes debes estar tipo dashboard elegante y fino que cuando se haga click te dirija al sitio segun la url que se le ponga a cada imagen.\n- sobre el punto anterior: que en la bandeja administrador tambien aparezcan con su boton y bandeja propia las imagenes, url que ira en esta seccion. Estas deben ser editables, donde se pueda modificar o eliminar. cada imagen debe acomodarse y en orden de la mejor manera en esta sección.\n- ASEGURATE DE CREAR EL ARCHIVO ENV.LOCAL Y NO CREES ARCHIVOS BASURA QUE SOLO LLENEN EL PROYECTO INNECESARIAMENTE.\n\n- REGLA: DALE A ESTA SECCION DINAMISMO E INTERACTIVIDAD. \n\nPensado durante 1m 27s\nEstá estructurado en 3 niveles de acceso: cliente, abogado habilitado y administrador.\n\nPero te aclaro algo importante: en la versión actual hay una parte real con Supabase y una parte de respaldo/demo por correo para que puedas probar aunque Supabase todavía no esté perfecto.\n\n1. Cómo se determina el tipo de usuario\nLa estructura real está pensada así:\n\nTipo de usuario\tRol en Supabase\tDónde entra\nCliente\tclient\tBandeja Mis solicitudes\nAbogado habilitado\tlawyer\tPanel interno administrativo\nAdministrador\tadmin\tPanel interno administrativo completo\nEn Supabase existe una tabla:\n\nprofiles\ncon este campo:\n\nrole text check (role in ('admin','lawyer','client'))\nEntonces, cuando una persona inicia sesión, la app revisa su perfil y decide:\n\nclient  → Mis solicitudes\nlawyer  → Panel interno\nadmin   → Panel interno\nPor eso ya no hay botón público de “Panel interno”. El sistema debe enviarlo automáticamente según su rol.\n\n2. Cliente registrado\nEl cliente común entra como:\n\nclient\nPuede:\n\nver la web pública;\n\nver servicios;\n\nseleccionar subservicios;\n\ncrear solicitudes;\n\nsubir documentos;\n\nsubir comprobante de pago;\n\nver el estado de sus solicitudes;\n\neditar subservicios de una solicitud;\n\neliminar una solicitud equivocada, siempre que todavía esté en estado Solicitud;\n\ndescargar documento final cuando el administrador o abogado lo suba.\n\nNo puede:\n\nver solicitudes de otros clientes;\n\nentrar al panel interno;\n\naprobar pagos;\n\neditar servicios ofertados;\n\neditar Gobierno Digital Bolivia;\n\nver documentos de otros usuarios;\n\nasignar abogados.\n\n3. Abogado habilitado\nEl abogado entra como:\n\nlawyer\nAl iniciar sesión, la app lo manda directamente al panel interno.\n\nPuede:\n\nver solicitudes asignadas o habilitadas;\n\nrevisar documentos del cliente;\n\ndescargar documentos;\n\ntomar o trabajar una solicitud;\n\nsubir documento final o avance;\n\nmarcar trabajo operativo;\n\npedir revisión administrativa.\n\nNo debe poder:\n\naprobar pagos;\n\neliminar servicios ofertados;\n\nmodificar Gobierno Digital Bolivia;\n\ncrear/eliminar servicios comerciales;\n\neliminar solicitudes administrativamente;\n\ncambiar reglas comerciales.\n\nEn la interfaz actual ya se respeta esta regla: cuando entra como abogado, el botón de aprobar pago queda bloqueado o no disponible.\n\n4. Administrador\nEl administrador entra como:\n\nadmin\nAl iniciar sesión, también va directo al panel interno, pero con facultades completas.\n\nPuede:\n\nver todas las solicitudes;\n\nver todos los documentos;\n\ndescargar comprobantes;\n\naprobar pagos;\n\nrechazar o revisar pagos;\n\nasignar abogado;\n\ntomar solicitud;\n\ncancelar solicitud;\n\nsubir documento final;\n\neditar servicios ofertados;\n\nadicionar subservicios;\n\neliminar servicios;\n\ncambiar imágenes de servicios;\n\neditar accesos de Gobierno Digital Bolivia;\n\ncambiar imágenes y URLs de Gobierno Digital;\n\ngestionar el flujo comercial completo.\n\nRegla central:\n\nSolo el administrador aprueba pagos.\n5. Registro de usuarios\nAquí hay que tener cuidado.\n\nLa estructura correcta debe ser:\n\nCliente\nEl cliente puede registrarse desde la web pública.\n\nAl registrarse, Supabase debe crear:\n\nauth.users\ny además un perfil en:\n\nprofiles\ncon:\n\nrole = client\nactive = true\nAbogado\nEl abogado no debería poder registrarse libremente como abogado.\n\nDebe ocurrir así:\n\nEl abogado crea cuenta o el administrador la crea.\n\nEl administrador lo habilita.\n\nSe cambia su perfil a:\n\nrole = lawyer\nactive = true\nAdministrador\nEl administrador no debe crearse desde registro público.\n\nDebe asignarse manualmente o mediante panel maestro seguro:\n\nupdate public.profiles\nset role = 'admin'\nwhere email = 'correo@legaltic.bo';\n6. Restricción real en Supabase\nEn el archivo SQL ya existe esta idea:\n\nis_internal_user()\nReconoce a:\n\nadmin\nlawyer\nY también:\n\nis_admin_user()\nReconoce solo a:\n\nadmin\nEso permite separar:\n\nAcción\tCliente\tAbogado\tAdmin\nVer servicios\tSí\tSí\tSí\nSolicitar servicio\tSí\tSí\tSí\nVer sus solicitudes\tSí\tSí\tSí\nVer todas las solicitudes\tNo\tSí\tSí\nVer documentos de clientes\tNo\tSí\tSí\nSubir documento final\tNo\tSí\tSí\nAprobar pago\tNo\tNo\tSí\nEditar servicios ofertados\tNo\tNo\tSí\nEditar Gobierno Digital\tNo\tNo\tSí\nEliminar solicitud propia en estado inicial\tSí\tNo\tSí\nCancelar administrativamente\tNo\tNo\tSí\n7. Punto de seguridad que recomiendo reforzar\nHay una contingencia técnica importante: la interfaz ya bloquea al abogado para aprobar pagos, pero para seguridad profesional conviene reforzar también Supabase.\n\n¿Por qué? Porque la interfaz impide que el abogado haga clic, pero una seguridad fuerte debe impedirlo también en base de datos.\n\nMi recomendación para la siguiente versión es separar las actualizaciones así:\n\nCliente:\nsolo puede editar subservicios, nota y documentos propios mientras la solicitud esté en estado Solicitud.\n\nAbogado:\npuede actualizar estado operativo, asignación y documento final, pero nunca payment_status.\n\nAdministrador:\npuede actualizar payment_status, cancelar, editar todo y aprobar pago.\nEso evita que alguien con rol lawyer, aunque manipule el navegador o haga una llamada directa, pueda aprobar pagos.\n\n8. Estructura ideal definitiva\nPara dejarlo bien profesional, la próxima corrección debería incluir:\n\nTrigger automático en Supabase\n\ncada nuevo usuario registrado crea perfil automático client.\n\nPanel administrador de usuarios\n\nlistar usuarios registrados;\n\ncambiar cliente a abogado;\n\nactivar/desactivar abogado;\n\nbloquear usuario.\n\nRLS más estricta\n\nsolo admin modifica pagos;\n\nabogado no puede tocar payment_status;\n\ncliente no puede editar solicitudes en desarrollo o concluidas.\n\nAuditoría\n\nguardar quién aprobó pago;\n\nquién subió documento final;\n\nquién canceló;\n\nfecha y hora de cada acción.\n\nMi criterio: la estructura está bien planteada, pero para producción real conviene reforzar la seguridad en Supabase antes de comercializarla.\n\n\navancemos en la perfeccion de la web app. aprovechando comprobe que los botones de la imagen no funcionan.\n\nPensado durante 4m 6s\nPerfecto. Corregí esa parte y preparé una nueva versión:\n\nDescargar Legal TIC Web App v6.3 — botones admin funcionales\n\nQué corregí\nBotones del detalle administrativo\n\nAprobar pago\n\nTomar / asignar\n\nSubir final\n\nCancelar\n\nAhora actualizan la solicitud en pantalla y muestran un aviso de confirmación.\n\nMenú de acciones de la tabla\n\nTambién corregí el menú de cada fila.\n\nAntes podía actualizar la solicitud equivocada porque dependía de la solicitud activa anterior.\n\nAhora cada acción se aplica sobre la solicitud correcta.\n\nBotones de documentos\n\nLos botones de:\n\ncomprobante,\n\ncarnet,\n\ncertificados,\n\ndocumentos cargados,\nahora generan una descarga simulada para confirmar que el botón funciona.\n\nEn producción, esos botones deben descargar el archivo real desde Supabase Storage, pero ya dejé la estructura funcional para que no parezcan botones muertos.\n\nAviso de sincronización\n\nSi Supabase está configurado, intenta guardar.\n\nSi Supabase no confirma, mantiene el cambio en pantalla y muestra: pendiente de sincronizar.\n\nSi no hay .env.local completo, funciona en modo local.\n\nPrueba agregada\n\nAgregué una prueba para verificar que una acción administrativa se aplique sobre la solicitud correcta y no sobre otra.\n\nCómo correrlo\nnpm.cmd install\nnpm.cmd run dev\nO usa:\n\nLIMPIAR-E-INICIAR-CMD.bat\nEsta versión conserva la estructura aprobada y corrige únicamente la funcionalidad de esos botones internos.\n\n\n160de414-3ae2-4a0c-9f2f-71cf4ab69895.png\n670206a7-26fe-48cf-a749-3cff1dbba35f.png\n46daf17b-2d3c-477a-9c71-940ef67e163c.png\n6b1b390b-8e1a-4c1b-8250-4d2bbcf19351.png\nd45ebadd-9d91-4359-b0f0-57bada1b977e.png\n- segun imagen: GOBIERNO DIGITAL (titulo grande en negrillas), Portales institucionales y trámites digitales (subtitulo por debajo del titulo y mucho mas pequeño) no debe ir nada mas que titule esta seccion. EN CUANTO A LOS LOGOS (deben ser mas pequeños sin fondo estilo png con la caracteristica de reflejo de imagen  (como el efecto de asesoria y gestoria con innovación), con su titulo nombre centrado y por debajo , NO DEBE IR NADA MAS.\n- segun imagen: de entrada salio ese mensaje de error como se ve en la linea amarilla.\n- segun imagen: este mensaje no debe salir porque se ve duplicado \"Tu horario está agendado. Quedó bloqueado para otros usuarios.\"\n- no quiero que al hacer click en cualquiera de las pestañas: INICIO\nFiRDi\nAGENDA UNA REUNIÓN (INCLUYE SU BOTON Y PESTAÑA) \nCONTÁCTANOS\nSERVICIOS\nse vea solo esa seccion en pantalla sino: debe verse toda la pagina al hacer scroll, pero cuando se hace click en una de las pestañas debe llevar a la seccion elegida sin privar de ver todas las demas secciones cuando se hace scroll. \n- SEGUN IMAGEN: CUANDO SE SOLICITE INFORMACIÓN DE ENVIARSE UN MENSAJE A WHATSAPP +591 73132529.\n- el numero de whatsapp debe ser editable por el administrador en su bandeja correspondiente. tomandose en cuenta que al editar el numero este modifica automaticamente en la web app y su funcionalidad se automatiza inmediatamente.\n- genera una seccion para autorizar, eliminar o modificar clientes, abogados y administrador en la bandeja de administrador.\n\n\nInspecting project files for modification\nI'll ensure the response is beginner-friendly.";

const roleLabels = {
  admin: 'Administrador',
  lawyer: 'Abogado habilitado',
  client: 'Usuario',
};

const DEFAULT_WHATSAPP_NUMBER = '59173132529';
const MASTER_ADMIN_EMAIL = 'legaltic.abogados@gmail.com';

function isMasterAdminEmail(email = '') {
  return String(email || '').trim().toLowerCase() === MASTER_ADMIN_EMAIL;
}

const initialUsers = [
  { id: 'u-admin-master', fullName: 'Administrador Legal TIC', email: MASTER_ADMIN_EMAIL, phone: '73132529', role: 'admin', active: true, avatarUrl: '' },
];

const LOCAL_GOOGLE_USERS_KEY = 'legaltic.google.users.v1';

const LOCAL_TIC_TOOLS_KEY = 'legaltic.tic.tools.v1';

function normalizeTicTool(item = {}, index = 0) {
  const id = String(item.id || item.name || `tic-tool-${Date.now()}-${index}`).trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const name = String(item.name || 'Herramienta TIC').trim();
  return {
    id,
    name,
    tagline: String(item.tagline || '').trim(),
    description: String(item.description || '').trim(),
    image: String(item.image || item.logo || '/assets/tools/base-legaltic.png').trim(),
    url: String(item.url || '').trim(),
    buttonLabel: String(item.buttonLabel || item.button_label || 'Ver herramienta').trim(),
    active: item.active !== false,
    sortOrder: Number.isFinite(Number(item.sortOrder ?? item.sort_order)) ? Number(item.sortOrder ?? item.sort_order) : index + 1,
  };
}

function sortTicTools(tools = []) {
  return [...tools].map(normalizeTicTool).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

function readLocalTicTools(fallback = initialTicTools) {
  if (typeof window === 'undefined') return sortTicTools(fallback);
  try {
    const raw = window.localStorage.getItem(LOCAL_TIC_TOOLS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? sortTicTools(parsed) : sortTicTools(fallback);
  } catch {
    return sortTicTools(fallback);
  }
}

function writeLocalTicTools(tools = []) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_TIC_TOOLS_KEY, JSON.stringify(sortTicTools(tools)));
  } catch {
    // La app continúa aunque el respaldo local no esté disponible.
  }
}

function parseRemoteTicTools(value) {
  if (!value) return [];
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? sortTicTools(parsed) : [];
  } catch {
    return [];
  }
}

function normalizeManagedUser(item = {}) {
  const email = String(item.email || '').trim().toLowerCase();
  const fullName = String(item.fullName || item.full_name || item.name || email || 'Usuario').trim();
  return {
    id: item.id || item.dbId || email || `usuario-${Date.now()}`,
    fullName,
    email,
    phone: item.phone || '',
    role: ['admin', 'lawyer', 'client'].includes(item.role) ? item.role : 'client',
    active: item.active !== false,
    avatarUrl: item.avatarUrl || item.avatar_url || '',
  };
}

function mergeManagedUsers(...groups) {
  const map = new Map();
  groups.flat().filter(Boolean).map(normalizeManagedUser).forEach((item) => {
    const key = item.email || item.id;
    if (!key) return;
    const previous = map.get(key) || {};
    map.set(key, { ...previous, ...item, role: item.email === MASTER_ADMIN_EMAIL ? 'admin' : item.role, active: item.email === MASTER_ADMIN_EMAIL ? true : item.active });
  });
  return Array.from(map.values());
}

function readLocalGoogleUsers() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_GOOGLE_USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(normalizeManagedUser) : [];
  } catch {
    return [];
  }
}

function writeLocalGoogleUsers(users = []) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_GOOGLE_USERS_KEY, JSON.stringify(mergeManagedUsers(users)));
  } catch {
    // Respaldo local no disponible; la app continúa con Supabase.
  }
}

function rememberGoogleUserForAdmin(profile) {
  if (!profile?.email) return;
  const current = readLocalGoogleUsers();
  writeLocalGoogleUsers(mergeManagedUsers([profile], current));
}

function readLocalAuthorizationForEmail(email) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanEmail) return null;
  return readLocalGoogleUsers().find((item) => String(item.email || '').trim().toLowerCase() === cleanEmail) || null;
}

function shouldUseLocalRoleFallback() {
  if (typeof window === 'undefined') return false;
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

function normalizeWhatsappNumber(number = DEFAULT_WHATSAPP_NUMBER) {
  const digits = String(number || '').replace(/\D/g, '');
  if (!digits) return DEFAULT_WHATSAPP_NUMBER;
  return digits.startsWith('591') ? digits : `591${digits}`;
}

function buildWhatsappLink(message, number = DEFAULT_WHATSAPP_NUMBER) {
  return `https://wa.me/${normalizeWhatsappNumber(number)}?text=${encodeURIComponent(message)}`;
}


function generateTemporaryPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const randomPart = Array.from({ length: 10 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  return `LegalTIC-${randomPart}#`;
}

function ProfileAvatar({ user, size = 42, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const rawAvatar = String(user?.avatarUrl || user?.avatar_url || '').trim();
  useEffect(() => { setImageFailed(false); }, [rawAvatar]);
  const displayName = String(user?.name || user?.fullName || user?.full_name || user?.email || 'Usuario').trim();
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'US';
  if (rawAvatar && !imageFailed) {
    return (
      <img
        src={rawAvatar}
        alt="Foto de perfil"
        onError={() => setImageFailed(true)}
        className={`rounded-full object-cover ring-2 ring-white ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-[#EAF2FB] text-sm font-semibold text-[#00465F] ring-2 ring-white ${className}`}
      style={{ width: size, height: size }}
      title={displayName}
    >
      {initials || <Icon name="user" size={Math.max(18, Math.round(size * 0.42))} />}
    </div>
  );
}

async function fileToSmallAvatar(file) {
  if (!file) return '';
  if (!file.type?.startsWith('image/')) throw new Error('El archivo debe ser una imagen.');
  if (file.size > 2 * 1024 * 1024) throw new Error('La imagen no debe superar 2 MB antes de comprimir.');
  const imageUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      img.src = imageUrl;
    });
    const maxSize = 160;
    const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.72);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}


function describeAdminPatch(patch) {
  if (patch.payment === 'Pago aprobado') return 'Pago aprobado correctamente';
  if (patch.payment === 'Pago rechazado') return 'Pago rechazado correctamente';
  if (patch.state === 'En desarrollo') return 'Solicitud tomada/asignada correctamente';
  if (patch.finalDocument) return 'Documento final registrado correctamente';
  if (patch.state === 'Cancelado') return 'Solicitud cancelada correctamente';
  if (patch.adminNote) return 'Nota interna actualizada correctamente';
  return 'Solicitud actualizada correctamente';
}

function normalizeDownloadName(label = 'documento') {
  return label
    .replace(/^Comprobante:\s*/i, 'Comprobante - ')
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ._ -]/g, '')
    .trim()
    .replace(/\s+/g, '-') || 'documento-legaltic';
}

function downloadMockDocument(label) {
  const content = [
    'LEGAL TIC ABOGADOS',
    'Descarga de documento desde la bandeja interna',
    `Documento: ${label}`,
    `Fecha: ${new Date().toLocaleString('es-BO')}`,
    '',
    'Nota: en producción este botón abrirá o descargará el archivo real guardado en Supabase Storage.',
  ].join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${normalizeDownloadName(label)}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function FirdiImage({ className = '' }) {
  return (
    <img
      src="/assets/firdi-01.png"
      alt="FiRDi Legal TIC"
      className={`object-contain ${className}`}
    />
  );
}

function Icon({ name, size = 24, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };
  const paths = {
    building: <><path d="M4 21h16" /><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></>,
    people: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="3" /><path d="M2 21a6 6 0 0 1 12 0" /><path d="M13 21a5 5 0 0 1 8 0" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></>,
    file: <><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5" /><path d="M9 15l2 2 4-5" /></>,
    whatsapp: <><path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2-5.1A8.5 8.5 0 1 1 21 11.5z" /><path d="M9 8c.5 3 2.4 5 5.5 6" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 10v6M12 7h.01" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-5" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="M8 12l2.5 2.5L16 9" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    x: <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    pin: <><path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
    facebook: <><path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.5.3-.8.8-.8H17V6h-2z" /></>,
    instagram: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3" /><path d="M17 7h.01" /></>,
    youtube: <><path d="M22 12s0-3-1-4c-.5-.8-1.2-1-2-1.1C16 6.5 12 6.5 12 6.5s-4 0-7 .4c-.8.1-1.5.3-2 1.1-1 1-1 4-1 4s0 3 1 4c.5.8 1.2 1 2 1.1 3 .4 7 .4 7 .4s4 0 7-.4c.8-.1 1.5-.3 2-1.1 1-1 1-4 1-4z" /><path d="M10 9.7l5 2.3-5 2.3z" /></>,
    linkedin: <><path d="M6 9v11" /><path d="M6 6h.01" /><path d="M11 20v-6a3 3 0 0 1 6 0v6" /><path d="M11 9v11" /><rect x="3" y="3" width="18" height="18" rx="2" /></>,
    tiktok: <><path d="M14 3v10.5a4.5 4.5 0 1 1-4.5-4.5" /><path d="M14 5c1.4 2 3.2 3 5 3" /></>,
  };
  return <svg {...common}>{paths[name] || paths.info}</svg>;
}

function Logo({ className = '', small = false }) {
  return (
    <img
      src="/assets/logo-legaltic.png"
      alt="Legal TIC Abogados"
      className={`${small ? 'h-10 md:h-12' : 'h-20 md:h-28'} w-auto object-contain ${className}`}
    />
  );
}


function WaveDivider({ color = '#ffffff', flip = false, className = '' }) {
  return (
    <div className={`relative h-16 overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`h-full w-full ${flip ? 'rotate-180' : ''}`}>
        <path fill={color} d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,58.7C960,43,1056,21,1152,26.7C1248,32,1344,64,1392,80L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
      </svg>
    </div>
  );
}

function ScheduleModal({ onClose, user, whatsappNumber }) {
  const today = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  const defaultDate = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedSlot, setSelectedSlot] = useState('09:00');
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingState, setBookingState] = useState('idle');
  const [reservedByUser, setReservedByUser] = useState(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    note: '',
  });

  const slots = useMemo(() => {
    const values = [];
    for (let hour = 8; hour <= 18; hour += 1) {
      for (const minute of [0, 20, 40]) {
        if (hour === 18 && minute > 0) continue;
        values.push(`${pad(hour)}:${pad(minute)}`);
      }
    }
    return values;
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadOccupiedSlots() {
      setLoadingSlots(true);
      setMessage('');
      try {
        if (isSupabaseConfigured) {
          const occupied = await listOccupiedAppointmentSlots(selectedDate);
          if (!cancelled) setOccupiedSlots(occupied);
        } else {
          const demoOccupied = selectedDate === defaultDate ? ['09:00', '11:20', '15:40'] : ['10:00'];
          if (!cancelled) setOccupiedSlots(demoOccupied);
        }
      } catch (error) {
        if (!cancelled) {
          setOccupiedSlots([]);
          setMessage(`No se pudieron consultar horarios en Supabase. Revisa el archivo .env.local y que SUBIR-A-SUPABASE.sql esté ejecutado. Detalle: ${error.message}`);
        }
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    }
    loadOccupiedSlots();
    return () => { cancelled = true; };
  }, [selectedDate, defaultDate]);

  const reservedHere = reservedByUser?.date === selectedDate && reservedByUser?.slot === selectedSlot;
  const isOccupied = occupiedSlots.includes(selectedSlot) && !reservedHere;
  const whatsappHref = buildWhatsappLink(`Hola Legal TIC, deseo agendar una reunión virtual. Fecha: ${selectedDate}. Hora: ${selectedSlot}.`, whatsappNumber);

  const submitBooking = async () => {
    if (isOccupied) return;
    setBookingState('saving');
    setMessage('');
    try {
      if (isSupabaseConfigured) {
        await bookAppointment({ slotDate: selectedDate, slotTime: selectedSlot, ...form });
        setReservedByUser({ date: selectedDate, slot: selectedSlot });
        setOccupiedSlots((prev) => Array.from(new Set([...prev, selectedSlot])));
        setBookingState('saved');
        setMessage('');
      } else {
        setReservedByUser({ date: selectedDate, slot: selectedSlot });
        setOccupiedSlots((prev) => Array.from(new Set([...prev, selectedSlot])));
        setBookingState('saved');
        setMessage('');
      }
    } catch (error) {
      setBookingState('error');
      if (String(error.message || '').toLowerCase().includes('ocupado') || String(error.message || '').toLowerCase().includes('duplicate')) {
        setOccupiedSlots((prev) => Array.from(new Set([...prev, selectedSlot])));
        setMessage('Horario no disponible. Elige otro horario para continuar.');
      } else {
        setMessage(`No se pudo reservar en Supabase. Verifica que VITE_SUPABASE_URL tenga una URL válida y que SUBIR-A-SUPABASE.sql esté ejecutado. Detalle: ${error.message}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[#003044]/55 p-3 backdrop-blur-sm">
      <article className="w-full max-w-2xl max-h-[78dvh] overflow-y-auto rounded-[28px] bg-white shadow-[0_28px_80px_rgba(0,0,0,.22)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <div>
            <p className="text-sm uppercase tracking-[.22em] text-[#F7B900]">Agenda Legal TIC</p>
            <h3 className="mt-1 text-xl font-normal text-[#003044]">Agenda tu reunión virtual</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-[#EEF3F7] p-2 text-[#003044]"><Icon name="x" /></button>
        </div>
        <div className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_.82fr]">
          <div className="space-y-3">
            <label className="block text-sm font-normal text-[#003044]">Nombre completo
              <input value={form.fullName} onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))} className="mt-1.5 w-full rounded-2xl border border-slate-200 px-4 py-2 outline-none transition focus:border-[#F7B900]" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-normal text-[#003044]">Correo
                <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="mt-1.5 w-full rounded-2xl border border-slate-200 px-4 py-2 outline-none transition focus:border-[#F7B900]" />
              </label>
              <label className="block text-sm font-normal text-[#003044]">WhatsApp
                <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="mt-1.5 w-full rounded-2xl border border-slate-200 px-4 py-2 outline-none transition focus:border-[#F7B900]" />
              </label>
            </div>
            <label className="block text-sm font-normal text-[#003044]">Selecciona la fecha
              <input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} className="mt-1.5 w-full rounded-2xl border border-slate-200 px-4 py-2 outline-none transition focus:border-[#F7B900]" />
            </label>
            <label className="block text-sm font-normal text-[#003044]">Selecciona el horario
              <select value={selectedSlot} onChange={(event) => setSelectedSlot(event.target.value)} className="mt-1.5 w-full rounded-2xl border border-slate-200 px-4 py-2 outline-none transition focus:border-[#F7B900]">
                {slots.map((slot) => <option key={slot} value={slot}>{slot}{reservedByUser?.date === selectedDate && reservedByUser?.slot === slot ? ' · agendado por ti' : occupiedSlots.includes(slot) ? ' · ocupado' : ' · disponible'}</option>)}
              </select>
            </label>
            <textarea value={form.note} onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))} placeholder="Describe brevemente tu consulta" className="min-h-16 w-full rounded-2xl border border-slate-200 px-4 py-2 outline-none transition focus:border-[#F7B900]" />
          </div>
          <div className="rounded-[24px] bg-[#F5F9FC] p-4">
            <p className="text-sm uppercase tracking-[.18em] text-[#00708A]">Resumen</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div><p className="text-[#003044]">Fecha</p><p>{selectedDate}</p></div>
              <div><p className="text-[#003044]">Horario</p><p>{selectedSlot}</p></div>
              <div><p className="text-[#003044]">Duración estimada</p><p>20 minutos</p></div>
              <div><p className="text-[#003044]">Consulta Supabase</p><p>{isSupabaseConfigured ? 'Activa' : 'Modo demo/local'}</p></div>
            </div>
            <div className={`mt-3 rounded-2xl px-4 py-2.5 text-sm ${isOccupied ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {loadingSlots ? 'Consultando disponibilidad...' : reservedHere ? 'Tu horario está agendado.' : isOccupied ? 'Horario ocupado. Elige otro horario disponible.' : 'Horario disponible para reserva.'}
            </div>
            {message && <div className="mt-2 rounded-2xl bg-white px-4 py-2.5 text-sm text-slate-600 ring-1 ring-slate-100">{message}</div>}
            <button type="button" onClick={submitBooking} disabled={isOccupied || reservedHere || bookingState === 'saving'} className="mt-4 w-full rounded-full bg-[#00465F] px-5 py-2.5 text-sm font-normal text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300">
              {bookingState === 'saving' ? 'Guardando...' : reservedHere ? 'Reunión agendada' : 'Reservar reunión'}
            </button>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-2 flex justify-center rounded-full border border-[#00465F]/15 bg-white px-5 py-2.5 text-sm font-normal text-[#00465F]">Coordinar por WhatsApp</a>
            <button type="button" onClick={onClose} className="mt-2 w-full rounded-full border border-slate-200 px-5 py-2.5 text-sm font-normal text-[#003044]">Cerrar</button>
          </div>
        </div>
      </article>
    </div>
  );
}

function Header({ view, activeNav, setView, user, logout, goToSection, openServicesGroup, transparent = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = [
    ['home', 'INICIO'],
    ['firdi', 'FiRDi'],
    ['tools', 'HERRAMIENTAS TIC'],
    ['agenda', 'AGENDA UNA REUNIÓN'],
    ['contact', 'CONTÁCTANOS'],
    ['services', 'SERVICIOS'],
  ];
  const isLoggedIn = Boolean(user);

  const handleNav = (key) => {
    const sectionMap = { home: 'inicio', firdi: 'firdi', tools: 'herramientas-tic', agenda: 'agenda', contact: 'contactanos' };
    setMobileMenuOpen(false);
    if (key === 'services') {
      openServicesGroup('todos');
      return;
    }
    goToSection(sectionMap[key]);
  };

  return (
    <header className={`site-header fixed left-0 right-0 top-0 z-50 h-[78px] transition-all duration-300 ${transparent ? 'site-header-transparent border-transparent bg-transparent shadow-none' : 'border-b border-slate-200 bg-white/92 shadow-sm backdrop-blur-xl'}`}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        <button type="button" onClick={() => { setMobileMenuOpen(false); goToSection('inicio'); }} className="flex items-center">
          <Logo small />
        </button>

        <nav className="hidden items-center gap-7 text-[13px] tracking-wide text-[#00465F] lg:flex">
          {nav.map(([key, label]) => (
            <button key={key} type="button" onClick={() => handleNav(key)} className={`header-nav-link relative py-3 transition hover:text-[#F7B900] focus:text-[#F7B900] ${key === (activeNav || view) ? "header-nav-active" : ""}`}>
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          {isLoggedIn ? (
            <>
              <button type="button" onClick={() => setView(user?.role === 'client' ? 'myRequests' : 'admin')} className="flex max-w-[230px] items-center gap-2 rounded-full border border-[#EAF2FB] bg-white px-2.5 py-1.5 text-left shadow-sm transition hover:-translate-y-0.5">
                <ProfileAvatar user={user} size={34} />
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-[#003044]">{user?.name || user?.email}</span>
                  <span className="block truncate text-[11px] text-[#00708A]">{user?.role === 'admin' ? 'Administrador' : user?.role === 'lawyer' ? 'Abogado' : 'Cliente'}</span>
                </span>
              </button>
              <button type="button" onClick={() => setView(user?.role === 'client' ? 'myRequests' : 'admin')} className="rounded-full border-2 border-[#F7B900] bg-[#00465F] px-4 py-2 text-xs font-normal text-white shadow-soft md:text-sm">{user?.role === 'client' ? 'MIS SOLICITUDES' : 'PANEL'}</button>
              <button type="button" onClick={logout} className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-normal text-slate-600 md:block">Salir</button>
            </>
          ) : (
            <button type="button" onClick={() => setView('login')} className="header-action-register rounded-full border-2 border-[#F7B900] bg-[#00465F] px-5 py-2 text-xs font-semibold text-white shadow-soft md:text-sm">INICIAR CON GOOGLE</button>
          )}
        </div>

        <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="mobile-menu-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/30 text-[#00465F] shadow-soft backdrop-blur lg:hidden" aria-label="Abrir menú">
          <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-panel absolute left-3 right-3 top-[84px] rounded-[24px] border border-white/40 bg-white/94 p-3 shadow-executive backdrop-blur-xl lg:hidden">
          <div className="grid gap-1">
            {nav.map(([key, label]) => (
              <button key={key} type="button" onClick={() => handleNav(key)} className="rounded-2xl px-4 py-3 text-left text-sm tracking-wide text-[#00465F] transition hover:bg-[#EAF2FB]">
                {label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 rounded-2xl bg-[#F7FAFD] px-4 py-3">
                  <ProfileAvatar user={user} size={40} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#003044]">{user?.name || user?.email}</p>
                    <p className="truncate text-xs text-[#00708A]">{user?.email}</p>
                  </div>
                </div>
                <button type="button" onClick={() => { setMobileMenuOpen(false); setView(user?.role === 'client' ? 'myRequests' : 'admin'); }} className="rounded-full border-2 border-[#F7B900] bg-[#00465F] px-4 py-3 text-sm text-white">{user?.role === 'client' ? 'MIS SOLICITUDES' : 'PANEL'}</button>
                <button type="button" onClick={() => { setMobileMenuOpen(false); logout(); }} className="rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-600">Salir</button>
              </>
            ) : (
              <button type="button" onClick={() => { setMobileMenuOpen(false); setView('login'); }} className="rounded-full border-2 border-[#F7B900] bg-[#00465F] px-4 py-3 text-sm font-semibold text-white">INICIAR CON GOOGLE</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ goToSection, openServicesGroup, user, whatsappNumber }) {
  const [openAgenda, setOpenAgenda] = useState(false);
  const socialLinks = [
    { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/legalticoficial' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/legal_tic' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@legaltic' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/legal-tic' },
    { label: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@legalticabogados' },
    { label: 'WhatsApp', icon: 'whatsapp', href: buildWhatsappLink('Hola Legal TIC, deseo recibir información sobre sus servicios.', whatsappNumber) },
  ];
  const locationHref = 'https://www.google.com/maps/search/?api=1&query=Legal%20TIC%20Abogados%20Bolivia';
  return (
    <section id="inicio" className="hero-video-section relative isolate flex min-h-screen items-center justify-center overflow-hidden scroll-mt-[78px] pt-[78px] text-center">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/assets/fondo-app.jpg">
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/42 backdrop-blur-[.45px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.18),rgba(0,0,0,.30)),linear-gradient(120deg,rgba(0,70,95,.28),rgba(0,0,0,.18))]" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-10">
        <Logo className="mb-4 h-28 md:h-36" />
        <h1 className="hero-readable-title max-w-4xl text-center text-3xl leading-tight tracking-tight text-[#101923] md:text-5xl">Asesoría y Gestoría con innovación</h1>
        <p className="hero-readable-copy hero-normal-copy mt-3 max-w-3xl text-center text-base leading-7 text-white/90 md:text-lg">Ofrecemos servicios para Empresas privadas o personas naturales, escoge que tipo quieres:</p>
        <div className="mt-7 grid grid-cols-2 gap-8 text-[#00465F]">
          <button type="button" onClick={() => openServicesGroup('empresas')} className="hero-main-choice group">
            <Icon name="building" size={68} className="mx-auto transition group-hover:-translate-y-1" />
            <span>EMPRESAS</span>
          </button>
          <button type="button" onClick={() => openServicesGroup('personas')} className="hero-main-choice group">
            <Icon name="people" size={68} className="mx-auto transition group-hover:-translate-y-1" />
            <span>PERSONAS</span>
          </button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setOpenAgenda(true)} className="hero-action-pill">
            <Icon name="calendar" size={20} /> Agendar reunión virtual
          </button>
          <a href={locationHref} target="_blank" rel="noreferrer" className="hero-action-pill hero-action-secondary">
            <Icon name="pin" size={20} /> Ubicación
          </a>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="hero-social-badge" title={item.label}>
              <Icon name={item.icon} size={22} />
            </a>
          ))}
        </div>
        <button type="button" onClick={() => goToSection('firdi')} className="mt-8 flex h-12 w-7 items-start justify-center rounded-full border-2 border-[#00465F]/35 p-1" aria-label="Bajar a FiRDi"><span className="h-2 w-2 animate-bounce rounded-full bg-[#00465F]" /></button>
      </div>
      <div className="pointer-events-none absolute bottom-[-1px] left-0 right-0 z-[2] h-24 overflow-hidden md:h-32" aria-hidden="true">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="h-full w-full">
          <path fill="#111111" d="M0,86 C160,116 286,126 438,102 C604,75 729,58 900,84 C1078,110 1234,110 1440,72 L1440,140 L0,140 Z" />
        </svg>
      </div>
      {openAgenda && <ScheduleModal user={user} whatsappNumber={whatsappNumber} onClose={() => setOpenAgenda(false)} />}
    </section>
  );
}


function FirdiSection() {
  const icons = ['whatsapp', 'user', 'file', 'edit', 'calendar', 'check'];
  return (
    <section className="relative overflow-hidden bg-[#111111] py-20 text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(247,185,0,.18), transparent 18%), radial-gradient(circle at 80% 10%, rgba(87,201,0,.16), transparent 18%), radial-gradient(circle at 50% 80%, rgba(0,168,200,.12), transparent 18%)' }} />
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="font-bold uppercase tracking-[.28em] text-[#57C900]">Gestoría administrativa y trámites fáciles</p>
          <h2 className="section-readable-title mt-4 text-4xl md:text-5xl">¿Cómo trabaja FiRDi?</h2>
          <p className="mt-5 text-white/70">FiRDi agiliza gestiones ante administración pública y entidades privadas mediante asesoramiento específico, uso de plataformas virtuales y seguimiento documental.</p>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_280px_1fr]">
          <div className="space-y-5">{firdiSteps.slice(0, 3).map((step, index) => <FirdiCard key={step} index={index} icon={icons[index]} text={step} />)}</div>
          <div className="relative mx-auto text-center">
            <div className="absolute inset-0 rounded-full bg-[#57C900]/15 blur-3xl" />
            <FirdiImage className="relative mx-auto h-56 w-56 drop-shadow-[0_18px_30px_rgba(0,0,0,.28)]" />
            <div className="mt-4 inline-flex rounded-full border border-[#57C900]/35 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-white/80 backdrop-blur">FiRDi · firma digital y gestoría</div>
          </div>
          <div className="space-y-5">{firdiSteps.slice(3).map((step, index) => <FirdiCard key={step} index={index + 3} icon={icons[index + 3]} text={step} />)}</div>
        </div>
      </div>
    </section>
  );
}

function FirdiCard({ index, icon, text }) {
  return (
    <article className="reveal-card flex items-center gap-4">
      <div className="w-14 text-center text-6xl font-black text-[#57C900]/55">{index + 1}</div>
      <div className="flex-1 rounded-2xl border border-white/10 bg-[#202020] p-4 shadow-soft transition hover:-translate-y-1 hover:border-[#F7B900]/50">
        <div className="mx-auto -mt-9 mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#111] text-[#F7B900] shadow-soft"><Icon name={icon} /></div>
        <p className="text-center text-sm leading-6 text-white/80">{text}</p>
      </div>
    </article>
  );
}


function TicToolsSection({ tools = [] }) {
  const activeTools = sortTicTools(tools).filter((tool) => tool.active !== false);
  if (!activeTools.length) return null;
  return (
    <section id="herramientas-tic" className="relative scroll-mt-[78px] overflow-hidden bg-[#DDE8EE] py-16 text-[#003044] md:py-20">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 16% 18%, rgba(255,255,255,.72), transparent 24%), radial-gradient(circle at 86% 20%, rgba(0,70,95,.14), transparent 23%), linear-gradient(135deg, #F1F6F8 0%, #DDE8EE 48%, #C7D7DF 100%)' }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#B9CBD4]/80" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#003044]">Ecosistema LegalTIC</p>
          <h2 className="mt-3 text-3xl font-normal leading-tight text-[#003044] md:text-4xl">Herramientas TIC para gestión legal</h2>
        </div>
        <div className="mx-auto mt-9 grid max-w-5xl gap-10 md:grid-cols-2 xl:grid-cols-3">
          {activeTools.map((tool) => (
            <article key={tool.id} className="group relative flex min-h-[255px] flex-col items-center justify-between text-center transition duration-300 hover:-translate-y-1">
              <div className="relative flex h-52 w-full max-w-[340px] items-center justify-center md:h-60 md:max-w-[390px]">
                <div className="pointer-events-none absolute inset-x-8 top-12 h-16 rounded-full bg-[#003044]/12 blur-2xl transition group-hover:translate-x-3" />
                <img src={tool.image} alt={tool.name} className="relative z-10 max-h-[210px] max-w-full object-contain drop-shadow-[0_28px_34px_rgba(0,48,68,.24)] md:max-h-[245px]" />
              </div>
              {tool.description && <p className="mt-4 max-w-[330px] text-sm font-normal leading-6 text-[#003044] md:text-base">{tool.description}</p>}
              <div className="mt-5 text-center">
                {tool.url ? (
                  <a href={tool.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border-2 border-[#00465F] bg-[#00465F] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#003044]">{tool.buttonLabel}</a>
                ) : (
                  <span className="inline-flex items-center justify-center rounded-full border border-[#00465F]/30 bg-white/55 px-5 py-2.5 text-sm font-semibold text-[#00465F]">URL pendiente</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgendaSection({ user, whatsappNumber }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section id="agenda" className="flex min-h-[calc(100svh-78px)] scroll-mt-[78px] items-center bg-[#F5F9FC] py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 text-lg text-slate-700 md:grid-cols-2">
          <p>Contratar servicios legales de alta calidad no debería ser complicado.</p>
          <p>En <span className="text-[#00465F]">Legal TIC</span> los precios están a un clic, con <span className="text-[#00465F]">precio justo y lenguaje claro</span>.</p>
        </div>
        <h2 className="mt-12 text-center text-4xl font-normal text-[#00465F] md:text-5xl">Nos preocupamos genuinamente<br /><span className="text-[#F7B900]">por entender su necesidad</span></h2>
        <div className="mt-14 grid gap-12 text-center md:grid-cols-3">
          <InfoPillar icon="calendar" text="Agenda una reunión virtual gratis de 20 minutos." />
          <InfoPillar icon="video" text="Un abogado te escuchará y entenderá tu necesidad." />
          <InfoPillar icon="file" text="Te enviaremos una propuesta con la solución que mejor se adecue." />
        </div>
        <div className="mt-12 text-center">
          <button type="button" onClick={() => setOpenModal(true)} className="inline-flex rounded-full border-2 border-[#F7B900] bg-[#00465F] px-8 py-3 text-base font-normal text-white shadow-[0_18px_34px_rgba(0,70,95,.18)] transition hover:-translate-y-1">AGENDA TU REUNIÓN VIRTUAL</button>
          <div className="mt-5">
            <a href={buildWhatsappLink('Hola Legal TIC, necesito información sobre sus servicios.', whatsappNumber)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-base text-[#F7B900] transition hover:text-[#00465F]">o contáctanos por whatsapp <Icon name="whatsapp" className="text-[#00465F]" /></a>
          </div>
        </div>
      </div>
      {openModal && <ScheduleModal user={user} whatsappNumber={whatsappNumber} onClose={() => setOpenModal(false)} />}
    </section>
  );
}


function InfoPillar({ icon, text }) {
  return <div className="px-4"><Icon name={icon} size={88} className="mx-auto mb-5 text-[#00465F]" /><p className="mx-auto max-w-[250px] whitespace-pre-line text-slate-700">{text}</p></div>;
}


function ContactSection({ services, whatsappNumber }) {
  const serviceOptions = buildEnumeratedServiceOptions(services);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', note: '', service: services[0]?.name || 'FIRMA DIGITAL' });
  const updateContact = (field, value) => setContact((prev) => ({ ...prev, [field]: value }));
  const message = `Hola Legal TIC, solicito información. Nombre: ${contact.name || 'Sin indicar'}. Correo: ${contact.email || 'Sin indicar'}. Teléfono: ${contact.phone || 'Sin indicar'}. Servicio: ${contact.service}. Consulta: ${contact.note || 'Sin indicar'}.`;

  return (
    <section id="contactanos" className="relative min-h-[720px] scroll-mt-[78px] overflow-hidden bg-[#EAF2FB]">
      <div className="contact-image-wave absolute inset-y-0 left-0 w-full md:w-[58%]">
        <img src="/assets/fondo-app.jpg" alt="Legal TIC atención digital" className="h-full w-full object-cover object-bottom opacity-95" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#EAF2FB]/78 to-[#EAF2FB]" />
      <WaveDivider color="#EAF2FB" className="absolute left-0 right-0 top-0 rotate-180" />
      <div className="relative mx-auto grid min-h-[720px] max-w-6xl items-center gap-10 px-5 pb-28 pt-20 md:grid-cols-[.95fr_1.05fr]">
        <div className="hidden md:block" />
        <div className="contact-form-soft rounded-[34px] bg-[#EAF2FB]/88 p-6 backdrop-blur-sm md:p-8">
          <h2 className="contact-readable-title text-3xl leading-tight text-black md:text-[36px]">¡Contáctanos para conocer<br />nuestros servicios!</h2>
          <form className="mt-8 max-w-md space-y-3" onSubmit={(event) => { event.preventDefault(); window.open(buildWhatsappLink(message, whatsappNumber), '_blank', 'noopener,noreferrer'); }}>
            <Field label="NOMBRE Y APELLIDO" placeholder="Nombre y apellido" value={contact.name} onChange={(event) => updateContact('name', event.target.value)} />
            <Field label="CORREO / EMAIL" placeholder="Correo / Email" value={contact.email} onChange={(event) => updateContact('email', event.target.value)} />
            <Field label="TELÉFONO" placeholder="Teléfono" value={contact.phone} onChange={(event) => updateContact('phone', event.target.value)} />
            <label className="block text-xs font-normal uppercase tracking-wide text-[#00708A]">¿CÓMO PODEMOS AYUDARTE?
              <textarea value={contact.note} onChange={(event) => updateContact('note', event.target.value)} className="mt-1 min-h-28 w-full rounded border-2 border-[#00A8C8] bg-white/85 px-4 py-3 font-normal outline-none transition focus:border-[#F7B900]" placeholder="Describe brevemente tu necesidad" />
            </label>
            <label className="block text-xs font-normal uppercase tracking-wide text-[#00708A]">ESCOJA EL SERVICIO QUE NECESITE
              <select value={contact.service} onChange={(event) => updateContact('service', event.target.value)} className="mt-1 w-full rounded border-2 border-[#00A8C8] bg-white px-4 py-3 font-normal text-slate-700 outline-none transition focus:border-[#F7B900]">
                {serviceOptions.map((option) => <option key={option.id} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <button type="submit" className="rounded-full border-2 border-[#F7B900] bg-[#00465F] px-7 py-3 font-normal text-white shadow-executive transition hover:-translate-y-1">SOLICITAR INFORMACIÓN</button>
          </form>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-16 overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full">
          <path fill="#F4FAFE" d="M0,94C170,112,330,116,490,104C670,90,820,66,1010,72C1190,78,1320,96,1440,104L1440,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = 'text', value, onChange, help }) {
  return (
    <label className="block text-xs font-normal uppercase tracking-wide text-[#00708A]">{label}
      <input type={type} value={value} onChange={onChange} className="mt-1 w-full rounded border-2 border-[#00A8C8] bg-white px-4 py-3 font-normal text-slate-700 outline-none transition focus:border-[#F7B900]" placeholder={placeholder} />
      {help && <p className="mt-1 text-xs italic text-slate-500">{help}</p>}
    </label>
  );
}

function ServicesPage({ user, setView, addRequest, services, whatsappNumber, embedded = false, initialFilter = 'todos', showIntro = true, showOtherProcedures = true }) {
  const [filter, setFilter] = useState(initialFilter);
  const [modal, setModal] = useState(null);
  const [requestModal, setRequestModal] = useState(null);
  useEffect(() => { setFilter(initialFilter); }, [initialFilter]);
  const filtered = useMemo(() => filter === 'todos' ? services : services.filter((service) => service.group === filter), [filter, services]);
  return (
    <main id="servicios" className={`scroll-mt-[78px] bg-white pb-24 ${embedded ? 'pt-16' : 'pt-12'}`}>
      <section className="mx-auto max-w-7xl px-5">
        {showIntro && (
          <div className="text-center">
            <h1 className="mt-3 text-4xl font-normal md:text-5xl">Nuestros servicios</h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Selecciona un servicio, revisa los subservicios y crea tu solicitud.</p>
          </div>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {(embedded ? serviceGroups.filter((group) => group.id !== 'todos') : serviceGroups).map((group) => (
            <button key={group.id} type="button" onClick={() => setFilter(group.id)} className={`rounded-full px-5 py-3 text-sm font-normal shadow-soft transition hover:-translate-y-1 ${filter === group.id ? 'bg-[#F7B900] text-[#00465F]' : group.id === 'firdi' ? 'bg-[#111] text-[#57C900] ring-2 ring-[#57C900]' : 'bg-[#00465F] text-white'}`}>{group.label}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, index) => <ServiceCard key={item.id} item={item} index={index} onInfo={setModal} onRequest={setRequestModal} whatsappNumber={whatsappNumber} />)}
        </div>
      </section>
      {showOtherProcedures && <OtherProcedures />}
      {modal && <InfoModal item={modal} whatsappNumber={whatsappNumber} onClose={() => setModal(null)} onRequest={(selected) => { setRequestModal({ service: modal, preselected: selected }); setModal(null); }} />}
      {requestModal && <RequestModal item={requestModal} user={user} setView={setView} onClose={() => setRequestModal(null)} addRequest={addRequest} />}
    </main>
  );
}

function ServiceCard({ item, index, onInfo, onRequest, whatsappNumber }) {
  const whatsappHref = buildWhatsappLink(`Hola Legal TIC, quiero solicitar información sobre el servicio: ${item.name}.`, whatsappNumber);
  return (
    <article className="reveal-card group relative mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-100 transition hover:-translate-y-2 hover:shadow-executive" style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}>
      <button type="button" onClick={() => onInfo(item)} className="relative h-64 w-full overflow-hidden bg-slate-200">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-left">
          <span className="rounded-full bg-[#F7B900] px-3 py-1 text-xs font-normal text-[#00465F]">{item.price}</span>
          <h3 className="mt-3 line-clamp-2 text-xl font-black uppercase leading-tight text-white drop-shadow">{item.name}</h3>
        </div>
      </button>
      <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label={`Solicitar ${item.name} por WhatsApp`} className="absolute right-6 top-[232px] flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#57C900] text-white shadow-soft transition hover:scale-110"><Icon name="whatsapp" /></a>
      <div className="px-5 py-5 pb-20">
        <div className="flex items-center justify-between text-sm text-slate-500"><span className="rounded-full bg-[#F5F9FC] px-3 py-1 font-bold text-[#00465F]">{item.price}</span><button type="button" onClick={() => onInfo(item)} className="text-slate-500 transition hover:text-[#00465F]"><Icon name="info" size={28} /></button></div>
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{item.detail}</p>
      </div>
      <button type="button" onClick={() => onRequest(item)} className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-[#00465F] py-3 font-black uppercase text-white transition hover:bg-[#003044]">Solicitar servicio <Icon name="edit" size={18} /></button>
    </article>
  );
}

function OtherProcedures() {
  const items = ['Trámites de Registro Civil, carácter familiar y procesos judiciales', 'Trámites inmobiliarios – Vivienda', 'Prosecución de procesos penales nuevos y constituidos', 'Certificados de antecedentes penales', 'Certificados de matrimonio, soltería', 'Certificados de nacimiento', 'Certificados de defunción', 'Homologación de sentencias en materia familiar', 'Licencias de conducir'];
  return (
    <section className="mt-20 bg-[#F5F9FC] py-20">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <div className="mx-auto mb-8 text-center"><FirdiImage className="mx-auto h-44 w-44 drop-shadow-[0_18px_28px_rgba(0,0,0,.16)]" /></div>
        <h2 className="text-3xl font-black text-[#00465F]">Otros trámites administrativos</h2>
        <div className="mt-8 grid gap-4 text-left text-slate-700 md:grid-cols-2">
          {items.map((item) => <p key={item} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm"><span className="font-black text-[#00465F]">▪</span>{item}</p>)}
        </div>
      </div>
    </section>
  );
}

function InfoModal({ item, whatsappNumber, onClose, onRequest }) {
  const [selected, setSelected] = useState(item.subservices.slice(0, 1));
  const toggle = (name) => setSelected((prev) => prev.includes(name) ? prev.filter((entry) => entry !== name) : [...prev, name]);
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#00465F]/55 p-4 backdrop-blur-sm">
      <article className="relative grid max-h-[86vh] w-full max-w-6xl overflow-auto rounded-2xl bg-white shadow-executive md:grid-cols-[.9fr_1.1fr]">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-[#00465F] p-2 text-white"><Icon name="x" /></button>
        <div className="min-h-[340px] bg-slate-100"><img src={item.image} alt={item.name} className="h-full min-h-[340px] w-full object-cover" /></div>
        <div className="p-7 md:p-9">
          <h2 className="text-3xl font-normal uppercase text-[#101923]">{item.name}</h2>
          <p className="mt-4 text-justify leading-7 text-slate-700"><span className="font-normal text-[#003044]">Detalles:</span> {item.detail}</p>
          <div className="mt-6 rounded-2xl bg-[#F5F9FC] p-5">
            <p className="font-normal text-[#00465F]">Subservicios disponibles</p>
            <div className="mt-3 grid gap-2 text-slate-700">
              {item.subservices.map((sub) => (
                <label key={sub} className="flex items-start gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-100">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[#00465F]" checked={selected.includes(sub)} onChange={() => toggle(sub)} />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" disabled={!selected.length} onClick={() => onRequest(selected)} className="rounded-full border-2 border-[#57C900] bg-[#00465F] px-6 py-3 font-normal text-white disabled:opacity-45">Solicitar selección</button>
            <a href={buildWhatsappLink(`Hola Legal TIC, quiero consultar por el servicio: ${item.name}.`, whatsappNumber)} target="_blank" rel="noreferrer" className="rounded-full bg-[#57C900] px-6 py-3 font-normal text-white">WhatsApp</a>
            <button type="button" onClick={onClose} className="rounded-full bg-[#F7B900] px-6 py-3 font-normal text-[#00465F]">Cerrar</button>
          </div>
        </div>
      </article>
    </div>
  );
}

function RequestModal({ item, user, setView, onClose, addRequest }) {
  const service = item.service || item;
  const [checked, setChecked] = useState(item.preselected || []);
  const [created, setCreated] = useState(false);
  const toggle = (name) => setChecked((prev) => prev.includes(name) ? prev.filter((entry) => entry !== name) : [...prev, name]);

  if (!user) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <article className="relative w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-executive">
          <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-[#00465F] p-2 text-white"><Icon name="x" /></button>
          <Logo className="mx-auto" />
          <p className="mt-5 text-slate-700">Para crear una solicitud, primero debes iniciar sesión o registrarte.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => { onClose(); setView('login'); }} className="rounded-full border-2 border-[#F7B900] bg-[#00465F] px-5 py-3 font-black text-white">INICIAR CON GOOGLE</button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <article className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-executive">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-[#00465F] p-2 text-white"><Icon name="x" /></button>
        <div className="max-h-[72vh] overflow-auto p-7 scrollbar-thin">
          {created ? (
            <div className="py-10 text-center">
              <Icon name="check" size={70} className="mx-auto text-[#57C900]" />
              <h3 className="mt-4 text-3xl font-black text-[#00465F]">Solicitud creada</h3>
              <p className="mt-3 text-slate-600">El administrador verificará el comprobante de pago. Luego se asignará a un abogado habilitado para su tratamiento.</p>
            </div>
          ) : (
            <>
              <p className="text-sm font-black uppercase tracking-[.22em] text-[#F7B900]">Nueva solicitud</p>
              <h3 className="mt-2 text-2xl font-normal text-[#00465F]">{service.name}</h3>
              <p className="mt-4 text-sm text-slate-600">Seleccione uno o más subservicios que desea solicitar:</p>
              <div className="mt-4 grid gap-3">
                {service.subservices.map((sub) => (
                  <label key={sub} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm">
                    <input type="checkbox" className="mt-1 h-5 w-5 accent-[#00465F]" checked={checked.includes(sub)} onChange={() => toggle(sub)} />
                    <span>{sub}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-[#F5F9FC] p-5">
                <p className="font-black text-[#00465F]">Documentos que podrá subir en su bandeja</p>
                <p className="mt-2 text-sm text-slate-600">Carnet de identidad, comprobante de pago, certificados, documentos base y cualquier archivo necesario para conformar el servicio solicitado.</p>
              </div>
            </>
          )}
        </div>
        <footer className="flex flex-wrap justify-end gap-2 bg-[#EAF2FB] p-4">
          {created ? (
            <button type="button" onClick={() => { onClose(); setView('myRequests'); }} className="rounded-full bg-[#00465F] px-5 py-2 font-black text-white">Ver mis solicitudes</button>
          ) : (
            <button type="button" disabled={checked.length === 0} onClick={() => { addRequest(service, checked); setCreated(true); }} className="rounded-full border-2 border-[#57C900] bg-[#00465F] px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45">Crear solicitud</button>
          )}
          <button type="button" onClick={onClose} className="rounded-full bg-white px-5 py-2 font-black text-[#00465F]">Cerrar</button>
        </footer>
      </article>
    </div>
  );
}

function AuthPage({ type, loginWithGoogle, setView }) {
  const [authMessage, setAuthMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const startGoogle = async () => {
    setAuthMessage('');
    setAuthLoading(true);
    const result = await loginWithGoogle();
    if (result?.ok === false) {
      setAuthMessage(result.message || 'No se pudo iniciar sesión con Google.');
      setAuthLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-78px)] flex-col bg-white pt-12">
      <section className="mx-auto w-full max-w-2xl px-5">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-4 text-center text-4xl font-semibold">Acceso con Google</h1>
        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
          Usa tu cuenta Google para registrarte o iniciar sesión. LegalTIC no crea ni guarda una contraseña propia de la web.
        </p>
        <div className="mt-7 rounded-[28px] border border-slate-100 bg-[#F7FAFD] p-5 shadow-sm">
          <button
            type="button"
            onClick={startGoogle}
            disabled={authLoading}
            className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#F7B900] bg-white px-7 py-3 font-semibold text-[#003044] shadow-executive transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#00465F] text-white">G</span>
            {authLoading ? 'CONECTANDO CON GOOGLE...' : 'INICIAR CON GOOGLE'}
          </button>
          <div className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-100">
            <p><b className="text-[#003044]">Seguridad:</b> la contraseña no se crea en esta web. Cada usuario administra su contraseña desde su propia cuenta Google.</p>
            <p className="mt-2"><b className="text-[#003044]">Recuperación:</b> si el usuario olvida su contraseña, debe recuperarla desde Google.</p>
            <p className="mt-2"><b className="text-[#003044]">Sin cuenta agregada:</b> al presionar Google, elige “Usar otra cuenta” e ingresa tu correo Gmail y contraseña. Si no tienes cuenta Google, debes crear una cuenta Google primero.</p>
          </div>
          {authMessage && <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{authMessage}</div>}
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={() => setView('home')} className="text-sm font-semibold text-[#00465F]">Volver al inicio</button>
          </div>
        </div>
      </section>
      <FooterWave />
    </main>
  );
}



function ProfileSettings({ user, updateProfile, onSaved, onCancel }) {
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(user?.name || '');
    setPhone(user?.phone || '');
  }, [user?.name, user?.phone]);

  const save = async (extra = {}) => {
    setSaving(true);
    setMessage('');
    const result = await updateProfile({ fullName, phone, ...extra });
    setSaving(false);
    if (result?.ok) {
      setMessage('');
      if (onSaved) onSaved();
      return;
    }
    setMessage(result?.message || 'No se pudo actualizar el perfil.');
  };

  const changeAvatar = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const avatarUrl = await fileToSmallAvatar(file);
      await save({ avatarUrl });
    } catch (error) {
      setMessage(error.message);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#003044]/45 px-4 py-6 backdrop-blur-sm">
      <section className="w-full max-w-2xl rounded-[28px] border border-white/70 bg-white p-5 shadow-executive">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <ProfileAvatar user={user} size={62} />
            <div>
              <p className="text-xs uppercase tracking-[.20em] text-[#FF7A1A]">Mi perfil</p>
              <h2 className="text-2xl font-semibold text-[#003044]">{user?.name || user?.email}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>
          <button type="button" onClick={onCancel} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-500">Cerrar</button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px] md:items-end">
          <label className="text-xs uppercase tracking-wide text-[#00708A]">Nombre visible
            <input value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-[#FF7A1A]" />
          </label>
          <label className="text-xs uppercase tracking-wide text-[#00708A]">Celular
            <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-[#FF7A1A]" />
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="cursor-pointer rounded-full border border-[#00465F] bg-white px-5 py-2.5 text-center text-sm font-semibold text-[#00465F] shadow-sm transition hover:-translate-y-0.5">
            Cambiar foto pequeña
            <input type="file" accept="image/*" className="hidden" onChange={changeAvatar} />
          </label>
          <button type="button" onClick={() => save()} disabled={saving} className="rounded-full bg-[#00465F] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar perfil'}</button>
        </div>
        {message && <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
      </section>
    </div>
  );
}

function MyRequests({ requests, services, setView, deleteRequest, editRequestSubservices, user, updateProfile }) {
  const [tab, setTab] = useState('Pendientes');
  const [expanded, setExpanded] = useState({});
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const visible = requests.filter((request) => tab === 'Pendientes' ? request.state !== 'Concluido' && request.state !== 'Cancelado' : tab === 'Completados' ? request.state === 'Concluido' : request.state === 'Cancelado');
  return (
    <main className="bg-white pb-24 pt-12">
      <section className="relative mx-auto max-w-7xl px-5">
        {user && showProfileEditor && (
          <ProfileSettings user={user} updateProfile={updateProfile} onSaved={() => setShowProfileEditor(false)} onCancel={() => setShowProfileEditor(false)} />
        )}
        <div className="relative mx-auto max-w-4xl">
          <h1 className="px-16 text-center text-4xl font-semibold md:text-5xl">Mis solicitudes de<br />servicios</h1>
          {user && (
            <button
              type="button"
              onClick={() => setShowProfileEditor(true)}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-soft ring-2 ring-[#18A64A]/80 transition hover:-translate-y-[52%]"
              title="Editar perfil"
              aria-label="Editar perfil"
            >
              <ProfileAvatar user={user} size={58} />
            </button>
          )}
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">Revisa tus subservicios seleccionados, documentos pendientes y elimina una solicitud si fue creada por error.</p>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {['Pendientes', 'Completados', 'Cancelados'].map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-xl py-4 text-xs font-semibold uppercase shadow-soft md:text-sm ${tab === item ? 'bg-[#00465F] text-white' : 'bg-white text-[#00465F] ring-1 ring-slate-100'}`}>{item}</button>)}
        </div>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-100 bg-white p-5 shadow-executive scrollbar-thin">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="text-xs uppercase text-[#00465F]"><tr className="border-b border-[#00465F]"><th className="py-4">Servicio solicitado</th><th>Subservicios</th><th>Actualizado en</th><th>Estado</th><th>Documento final</th><th>Documentos</th><th>Acción</th></tr></thead>
            <tbody>
              {!visible.length && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">No tienes solicitudes registradas todavía.</td>
                </tr>
              )}
              {visible.map((request) => (
                <React.Fragment key={request.id}>
                  <tr className="border-b border-slate-200">
                    <td className="py-5 font-semibold text-slate-700">{request.service}</td>
                    <td><button type="button" onClick={() => setExpanded((prev) => ({ ...prev, [request.id]: !prev[request.id] }))} className="rounded-full bg-[#00465F] px-5 py-2 font-semibold text-white">{expanded[request.id] ? 'Ocultar −' : 'Ver +'}</button></td>
                    <td className="text-slate-600">{request.updatedAt}</td>
                    <td><StatusBadge value={request.state} /></td>
                    <td>{request.finalDocument ? <button type="button" className="flex gap-2 font-semibold text-[#00465F]"><Icon name="download" size={18} /> PDF</button> : <span className="text-slate-400">Pendiente</span>}</td>
                    <td><button type="button" className="rounded bg-[#EAF2FB] px-3 py-2 text-xs font-semibold text-[#00465F]"><Icon name="upload" size={16} className="mr-1 inline" /> Subir</button></td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteRequest(request.id)}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        Eliminar solicitud
                      </button>
                    </td>
                  </tr>
                  {expanded[request.id] && <RequestExpanded request={request} services={services} onChangeSubservices={(next) => editRequestSubservices(request.id, next)} />}
                </React.Fragment>
              ))}
              {visible.length === 0 && <tr><td colSpan="7" className="py-10 text-center text-slate-500">No tienes solicitudes en esta categoría.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      <FooterWave />
    </main>
  );
}

function AdminPanel({ user, requests, setRequests, services, setServices, portals, setPortals, ticTools, setTicTools, managedUsers, setManagedUsers, whatsappNumber, setWhatsappNumber, logout }) {
  const [active, setActive] = useState(requests[0]?.id || '');
  const [filter, setFilter] = useState('Todos');
  const [section, setSection] = useState('solicitudes');
  const [query, setQuery] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const selected = requests.find((request) => request.id === active) || requests[0];
  const canApprovePayments = user?.role === 'admin';
  const counts = {
    todos: requests.length,
    solicitud: requests.filter((r) => r.state === 'Solicitud').length,
    desarrollo: requests.filter((r) => r.state === 'En desarrollo').length,
    pagos: requests.filter((r) => r.payment === 'Pendiente de comprobación').length,
    concluidos: requests.filter((r) => r.state === 'Concluido').length,
    cancelados: requests.filter((r) => r.state === 'Cancelado').length,
  };
  const filteredRequests = requests.filter((request) => {
    const matchesFilter =
      filter === 'Todos' ? true :
      filter === 'Pagos por verificar' ? request.payment === 'Pendiente de comprobación' :
      filter === 'Concluidos' ? request.state === 'Concluido' :
      filter === 'Cancelados' ? request.state === 'Cancelado' :
      request.state === filter;
    const text = `${request.client} ${request.email} ${request.service} ${request.id}`.toLowerCase();
    return matchesFilter && text.includes(query.toLowerCase());
  });

  const updateSelected = async (patch, requestId = active) => {
    const target = requests.find((request) => request.id === requestId || request.dbId === requestId) || selected;
    if (!target) return;
    const timestamp = new Date().toLocaleString('es-BO');
    const label = describeAdminPatch(patch);

    setActive(target.id);
    setRequests((prev) => applyRequestPatch(prev, target.id, patch, timestamp));
    setActionMessage(`${label}. Cambio aplicado en pantalla.`);

    if (isSupabaseConfigured && target.dbId) {
      try {
        const saved = await updateServiceRequest(target.dbId, { ...patch, dbId: target.dbId });
        setRequests((prev) => prev.map((request) => request.id === target.id ? saved : request));
        setActionMessage(`${label}. Cambio guardado en Supabase.`);
      } catch (error) {
        setActionMessage(`${label}. Pendiente de sincronizar con Supabase: ${error.message}`);
      }
    } else if (!isSupabaseConfigured) {
      setActionMessage(`${label}. Modo local: configura .env.local para guardar en Supabase.`);
    }
  };

  const topTabs = [
    { id: 'solicitudes', label: 'Solicitudes', icon: 'file' },
    { id: 'servicios', label: 'Servicios ofertados', icon: 'edit' },
    { id: 'pagos', label: 'Pagos', icon: 'card' },
    { id: 'documentos', label: 'Documentos', icon: 'download' },
    { id: 'gobierno', label: 'Gobierno Digital', icon: 'building' },
    { id: 'usuarios', label: 'Usuarios', icon: 'people' },
    { id: 'configuracion', label: 'Configuración', icon: 'card' },
  ];
  const sidebarFilters = [
    ['Todos', counts.todos],
    ['Solicitud', counts.solicitud],
    ['En desarrollo', counts.desarrollo],
    ['Pagos por verificar', counts.pagos],
    ['Concluidos', counts.concluidos],
    ['Cancelados', counts.cancelados],
  ];

  return (
    <main className="admin-shell h-screen overflow-hidden bg-[#F4F5FB] text-slate-900">
      <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-[#F7FAFD] px-5 text-[#2A2D38] shadow-sm">
        <button type="button" onClick={() => setSection('solicitudes')} className="flex items-center gap-3">
          <Logo small className="admin-logo-flat" />
        </button>
        <nav className="hidden h-full items-center gap-10 md:flex">
          {topTabs.map((tab) => (
            <button key={tab.id} type="button" onClick={() => { setSection(tab.id); setTimeout(() => document.querySelector('.admin-content-scroll')?.scrollTo({ top: 0, behavior: 'smooth' }), 0); }} className={`relative flex h-full items-center gap-2 px-2 text-[15px] font-medium transition ${section === tab.id ? 'text-[#2A2D38] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[4px] after:bg-[#FF7A1A]' : 'text-slate-500 hover:text-[#2A2D38]'}`}>
              <Icon name={tab.icon} size={20} /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ProfileAvatar user={user} size={44} />
          <div className="hidden text-right sm:block">
            <p className="font-medium leading-tight">{user.name || roleLabels[user.role]}</p>
            <p className="text-xs uppercase text-[#FF7A1A]">{roleLabels[user.role]}</p>
          </div>
          <button type="button" onClick={logout} className="rounded-full bg-[#363948] px-4 py-2 text-sm font-normal text-white transition hover:bg-[#2A2D38]">Salir</button>
        </div>
      </header>

      <div className="grid h-[calc(100vh-76px)] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden h-full overflow-y-auto border-r border-slate-200 bg-white px-3 py-5 lg:block scrollbar-thin">
          <section>
            <h2 className="text-sm font-semibold text-[#2A2D38]">Mis solicitudes</h2>
            <div className="mt-5 space-y-2">
              {sidebarFilters.map(([label, total]) => (
                <button key={label} type="button" onClick={() => { setSection('solicitudes'); setFilter(label); }} className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[13px] transition ${section === 'solicitudes' && filter === label ? 'bg-[#55B8D9] text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-[#00465F]'}`}>
                  <span>{label}</span><span>{total}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 border-t border-slate-200 pt-5">
            <h2 className="text-base font-semibold text-[#2A2D38]">Gestión interna</h2>
            <div className="mt-4 space-y-2">
              <button type="button" onClick={() => setSection('servicios')} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${section === 'servicios' ? 'bg-[#55B8D9] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Icon name="edit" size={18} /> Servicios ofertados</button>
              <button type="button" onClick={() => setSection('documentos')} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${section === 'documentos' ? 'bg-[#55B8D9] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Icon name="download" size={18} /> Documentos</button>
              <button type="button" onClick={() => setSection('pagos')} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${section === 'pagos' ? 'bg-[#55B8D9] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Icon name="card" size={18} /> Pagos</button>
              <button type="button" onClick={() => setSection('gobierno')} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${section === 'gobierno' ? 'bg-[#55B8D9] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Icon name="building" size={18} /> Gobierno Digital</button>
              <button type="button" onClick={() => setSection('usuarios')} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${section === 'usuarios' ? 'bg-[#55B8D9] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Icon name="people" size={18} /> Usuarios y roles</button>
              <button type="button" onClick={() => setSection('configuracion')} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${section === 'configuracion' ? 'bg-[#55B8D9] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Icon name="card" size={18} /> Configuración</button>
            </div>
          </section>

          <div className="mt-7 rounded-md bg-[#F2F4FC] p-4 text-center">
            <p className="text-slate-500">Regla activa:</p>
            <p className="mt-1 font-semibold text-[#2A2D38]">Solo administrador aprueba pagos</p>
            <p className="mt-3 text-xs leading-5 text-slate-500">Los abogados trabajan solicitudes asignadas o habilitadas.</p>
          </div>
        </aside>

        <section className="admin-content-scroll h-full overflow-y-auto px-6 py-7 scrollbar-thin xl:px-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#FF7A1A]">Panel interno Legal TIC</p>
              <h1 className="mt-2 text-3xl font-semibold text-[#2A2D38]">Centro ejecutivo comercial</h1>
            </div>
            <label className="relative block w-full max-w-[360px]">
              <Icon name="search" size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar solicitud" className="w-full border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#55B8D9]" />
            </label>
          </div>
          {actionMessage && (
            <div className="mt-5 flex items-start justify-between gap-4 rounded-md border border-[#F7B900]/40 bg-[#FFF8DF] px-4 py-3 text-sm text-[#7A4A00]">
              <span>{actionMessage}</span>
              <button type="button" onClick={() => setActionMessage('')} className="text-[#00465F]">Cerrar</button>
            </div>
          )}

          {section === 'servicios' ? (
            <div className="mt-8"><AdminServicesManager services={services} setServices={setServices} ticTools={ticTools} setTicTools={setTicTools} canEdit={canApprovePayments} /></div>
          ) : section === 'gobierno' ? (
            <div className="mt-8"><AdminPortalsManager portals={portals} setPortals={setPortals} canEdit={canApprovePayments} /></div>
          ) : section === 'usuarios' ? (
            <div className="mt-8"><AdminUsersManager users={managedUsers} setUsers={setManagedUsers} canEdit={canApprovePayments} currentUser={user} /></div>
          ) : section === 'configuracion' ? (
            <div className="mt-8"><AdminSettingsManager whatsappNumber={whatsappNumber} setWhatsappNumber={setWhatsappNumber} canEdit={canApprovePayments} /></div>
          ) : (
            <>
              <section className="mt-7">
                <h2 className="mb-4 text-lg font-semibold text-[#2A2D38]">Accesos directos</h2>
                <div className="grid gap-5 xl:grid-cols-3">
                  <QuickActionCard active title="Revisar solicitudes" text="Consulta documentos, subservicios y estado operativo." icon="file" onClick={() => { setSection('solicitudes'); setFilter('Todos'); }} />
                  <QuickActionCard title="Enviar documento final" text="Carga el documento elaborado para que el cliente pueda descargarlo." icon="upload" onClick={() => { setSection('documentos'); setFilter('En desarrollo'); }} />
                  <QuickActionCard title="Comprobar pago" text="Valida comprobantes antes de aprobar el tratamiento del servicio." icon="card" onClick={() => { setSection('pagos'); setFilter('Pagos por verificar'); }} />
                </div>
              </section>

              <section className="mt-10 grid gap-7 2xl:grid-cols-[minmax(0,1fr)_360px]">
                <div>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-[#2A2D38]">Tus solicitudes más recientes</h2>
                    <div className="flex flex-wrap gap-2">
                      {['Todos', 'Solicitud', 'En desarrollo', 'Concluidos'].map((item) => (
                        <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-md px-4 py-2 text-sm font-medium ${filter === item ? 'bg-[#FF7A1A] text-white' : 'bg-white text-slate-600 shadow-sm'}`}>{item}</button>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-x-auto border border-slate-200 bg-white scrollbar-thin">
                    <table className="w-full min-w-[980px] text-sm">
                      <thead className="bg-[#F0F2F7] text-left text-slate-700">
                        <tr><th className="w-12 px-5 py-4"><input type="checkbox" /></th><th>Cliente</th><th>Servicio</th><th>Pago</th><th>Estatus</th><th>Participantes</th><th className="text-center">Menú</th></tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((request) => (
                          <tr key={request.id} className={`border-t border-slate-200 transition hover:bg-[#F7FAFD] ${selected?.id === request.id ? 'bg-[#F7FAFD]' : 'bg-white'}`}>
                            <td className="px-5 py-4"><input type="checkbox" /></td>
                            <td className="py-4"><b className="font-semibold">{request.client}</b><br /><span className="text-slate-500">{request.email}</span></td>
                            <td className="max-w-[270px] pr-4">{request.service}</td>
                            <td><PaymentBadge value={request.payment} /></td>
                            <td><StatusBadge value={request.state} /></td>
                            <td><ParticipantDots request={request} /></td>
                            <td className="relative text-center"><AdminRowMenu request={request} setActive={setActive} updateSelected={updateSelected} canApprovePayments={canApprovePayments} selectedId={selected?.id} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {selected && <AdminExecutiveDetail selected={selected} updateSelected={updateSelected} canApprovePayments={canApprovePayments} user={user} />}
              </section>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function QuickActionCard({ title, text, icon, active = false, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`relative min-h-[124px] border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 ${active ? 'border-[#FF7A1A]' : 'border-transparent'}`}>
      {active && <span className="absolute right-0 top-0 bg-[#FF7A1A] px-4 py-2 text-xs font-normal text-white">prioritario</span>}
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-md ${active ? 'text-[#FF7A1A]' : 'text-[#5B6475]'}`}><Icon name={icon} size={32} /></div>
        <div><h3 className="font-normal text-[#2A2D38]">{title}</h3><p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">{text}</p></div>
      </div>
    </button>
  );
}

function ParticipantDots({ request }) {
  const initials = request.assignedTo && request.assignedTo !== 'Sin asignar' ? ['LC', 'AB'] : ['US'];
  return <div className="flex gap-2">{initials.map((item, index) => <span key={`${item}-${index}`} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${index === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{item}</span>)}</div>;
}

function AdminRowMenu({ request, setActive, updateSelected, canApprovePayments, selectedId }) {
  const [open, setOpen] = useState(false);
  const act = (patch) => {
    setActive(request.id);
    setOpen(false);
    setTimeout(() => updateSelected(patch, request.id), 0);
  };
  return (
    <div className="inline-block text-left">
      <button type="button" onClick={() => { setActive(request.id); setOpen((value) => !value); }} className={`rounded-md border px-3 py-2 ${selectedId === request.id ? 'border-[#FF7A1A] text-[#FF7A1A]' : 'border-slate-200 text-slate-600'}`}><Icon name="menu" size={20} /></button>
      {open && (
        <div className="absolute right-4 top-14 z-30 w-56 border border-slate-100 bg-white py-2 text-left shadow-2xl">
          <button type="button" onClick={() => { setActive(request.id); setOpen(false); }} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"><Icon name="info" size={17} /> Ver detalle</button>
          {canApprovePayments && <button type="button" onClick={() => act({ payment: 'Pago aprobado' })} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"><Icon name="check" size={17} /> Aprobar pago</button>}
          <button type="button" onClick={() => act({ state: 'En desarrollo', assignedTo: canApprovePayments ? 'Abg. Carla Rojas' : 'Abogado habilitado actual' })} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"><Icon name="edit" size={17} /> Tomar solicitud</button>
          <button type="button" onClick={() => act({ finalDocument: 'documento-final-servicio.pdf', state: 'Concluido' })} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"><Icon name="upload" size={17} /> Subir documento final</button>
        </div>
      )}
    </div>
  );
}

function AdminExecutiveDetail({ selected, updateSelected, canApprovePayments, user }) {
  return (
    <aside className="border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#FF7A1A]">Solicitud</p><h2 className="mt-2 text-3xl font-semibold text-[#00465F]">{selected.id}</h2><p className="text-slate-500">{selected.client}</p></div>
        <StatusBadge value={selected.state} />
      </div>
      <div className="mt-7 space-y-5 text-sm">
        <Detail label="Servicio" value={selected.service} />
        <Detail label="Teléfono / WhatsApp" value={selected.phone} />
        <Detail label="Subservicios" value={selected.subservices.join(', ')} />
        <Detail label="Asignado a" value={selected.assignedTo} />
        <Detail label="Nota interna" value={selected.adminNote} />
      </div>
      <div className="mt-7 border border-slate-200 bg-[#F8FAFC] p-4">
        <p className="font-semibold text-[#2A2D38]">Comprobante y documentos</p>
        <DocumentButton label={`Comprobante: ${selected.paymentReceipt}`} />
        {selected.uploadedByClient.map((doc) => <DocumentButton key={doc} label={doc} />)}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {canApprovePayments ? <button type="button" onClick={() => updateSelected({ payment: 'Pago aprobado' })} className="rounded-md bg-green-600 px-4 py-3 font-semibold text-white">Aprobar pago</button> : <button type="button" disabled className="rounded-md bg-slate-200 px-4 py-3 font-semibold text-slate-500"><Icon name="lock" size={16} className="mr-1 inline" /> Pago solo admin</button>}
        <button type="button" onClick={() => updateSelected({ state: 'En desarrollo', assignedTo: user.role === 'lawyer' ? 'Abogado habilitado actual' : 'Abg. Carla Rojas' })} className="rounded-md bg-[#00465F] px-4 py-3 font-semibold text-white">Tomar / asignar</button>
        <button type="button" onClick={() => updateSelected({ finalDocument: 'documento-final-servicio.pdf', state: 'Concluido', payment: selected.payment })} className="rounded-md bg-[#FF7A1A] px-4 py-3 font-semibold text-white">Subir final</button>
        {canApprovePayments ? <button type="button" onClick={() => updateSelected({ state: 'Cancelado' })} className="rounded-md bg-red-600 px-4 py-3 font-semibold text-white">Cancelar</button> : <button type="button" onClick={() => updateSelected({ adminNote: 'El abogado solicitó revisión administrativa.' })} className="rounded-md bg-slate-800 px-4 py-3 font-semibold text-white">Pedir revisión</button>}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">Regla aplicada: solo el administrador aprueba pagos. El abogado habilitado atiende solicitudes, descarga documentos y sube documentos finales o avances.</p>
    </aside>
  );
}


function AdminTicToolsManager({ tools = [], setTools, canEdit }) {
  const emptyForm = { id: '', name: '', tagline: '', description: '', image: '/assets/tools/base-legaltic.png', url: '', buttonLabel: 'Ver herramienta', active: true, sortOrder: tools.length + 1 };
  const sortedTools = sortTicTools(tools);
  const [editingId, setEditingId] = useState(sortedTools[0]?.id || '');
  const selected = sortedTools.find((tool) => tool.id === editingId) || sortedTools[0];
  const [form, setForm] = useState(() => selected ? { ...selected } : emptyForm);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!sortedTools.some((tool) => tool.id === editingId) && sortedTools[0]) {
      setEditingId(sortedTools[0].id);
      setForm({ ...sortedTools[0] });
    }
  }, [tools, editingId]);

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const selectTool = (tool) => { setEditingId(tool.id); setForm({ ...tool }); setMessage(''); };
  const startNew = async () => {
    if (!canEdit) return;
    const sequence = sortedTools.length + 1;
    const next = normalizeTicTool({
      ...emptyForm,
      id: `herramienta-${Date.now().toString().slice(-5)}`,
      name: `Nueva herramienta ${sequence}`,
      tagline: 'Herramienta TIC',
      description: 'Descripción pendiente de edición.',
      buttonLabel: 'Ver herramienta',
      active: false,
      sortOrder: sequence,
    }, sequence - 1);
    setEditingId(next.id);
    setForm({ ...next });
    setMessage('Nueva herramienta creada como inactiva. Edita sus datos, activa la herramienta y guarda los cambios.');
    try {
      await persistTools([...sortedTools, next]);
    } catch (error) {
      setMessage(`Nueva herramienta creada en pantalla; pendiente de Supabase: ${error.message}`);
    }
  };
  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateForm('image', URL.createObjectURL(file));
  };
  const persistTools = async (nextTools) => {
    const normalized = sortTicTools(nextTools);
    setTools(normalized);
    writeLocalTicTools(normalized);
    if (isSupabaseConfigured) await upsertAppSetting('tic_tools', JSON.stringify(normalized));
    return normalized;
  };
  const saveTool = async () => {
    if (!canEdit || !form.name.trim()) return;
    setSaving(true);
    setMessage('');
    try {
      const normalized = normalizeTicTool(form, sortedTools.length);
      const exists = sortedTools.some((tool) => tool.id === normalized.id);
      const nextTools = exists ? sortedTools.map((tool) => tool.id === normalized.id ? normalized : tool) : [normalized, ...sortedTools];
      await persistTools(nextTools);
      setEditingId(normalized.id);
      setForm({ ...normalized });
      setMessage('Herramienta TIC guardada correctamente.');
    } catch (error) {
      setMessage(`Guardado local aplicado; pendiente de Supabase: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };
  const deleteTool = async () => {
    if (!canEdit) return;
    const targetId = form.id || editingId || selected?.id;
    if (!targetId) {
      setMessage('Selecciona una herramienta para eliminar.');
      return;
    }
    const nextTools = sortedTools.filter((tool) => tool.id !== targetId);
    const next = nextTools[0] || emptyForm;
    setTools(nextTools);
    writeLocalTicTools(nextTools);
    setEditingId(next.id || '');
    setForm({ ...next });
    setMessage('Herramienta eliminada de la sección pública.');
    try {
      if (isSupabaseConfigured) await upsertAppSetting('tic_tools', JSON.stringify(sortTicTools(nextTools)));
    } catch (error) {
      setMessage(`Herramienta eliminada en pantalla; pendiente de Supabase: ${error.message}`);
    }
  };

  return (
    <section className="mb-7 rounded-[28px] border border-white bg-white p-5 shadow-executive">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#F7B900]">Herramientas TIC</p>
          <h2 className="mt-1 text-2xl font-normal text-[#003044]">Logos, enlaces y herramientas propias</h2>
          <p className="mt-1 text-sm text-slate-500">Este bloque alimenta la nueva sección pública ubicada entre FiRDi y Agenda.</p>
        </div>
        <button type="button" onClick={startNew} disabled={!canEdit} className="rounded-full bg-[#00465F] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-45">Nueva herramienta</button>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[.85fr_1.15fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {sortedTools.map((tool) => (
            <button key={tool.id} type="button" onClick={() => selectTool(tool)} className={`rounded-3xl border bg-[#F7FAFD] p-4 text-left transition hover:-translate-y-1 hover:shadow-soft ${form.id === tool.id ? 'border-[#F7B900] ring-2 ring-[#F7B900]/35' : 'border-slate-100'}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm"><img src={tool.image} alt={tool.name} className="max-h-full max-w-full object-contain" /></div>
                <div className="min-w-0"><p className="truncate text-sm font-semibold text-[#003044]">{tool.name}</p><p className="truncate text-xs text-slate-500">{tool.active ? 'Activo' : 'Inactivo'} · {tool.url || 'URL pendiente'}</p></div>
              </div>
            </button>
          ))}
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
          <label className="block text-xs font-normal uppercase tracking-wide text-[#00708A]">DESCRIPCIÓN CORTA
            <textarea value={form.description} onChange={(event) => updateForm('description', event.target.value)} disabled={!canEdit} className="mt-1 min-h-20 w-full rounded-2xl border border-slate-200 px-4 py-2.5 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">URL / DESTINO
              <input value={form.url} onChange={(event) => updateForm('url', event.target.value)} disabled={!canEdit} placeholder="https://..." className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
            </label>
            <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">TEXTO DEL BOTÓN
              <input value={form.buttonLabel} onChange={(event) => updateForm('buttonLabel', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
            </label>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-[150px_1fr]">
            <div className="flex h-32 items-center justify-center rounded-3xl bg-transparent p-2"><img src={form.image} alt="Logo herramienta" className="max-h-full max-w-full object-contain drop-shadow-[0_14px_20px_rgba(0,70,95,.16)]" /></div>
            <div>
              <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">LOGO DE LA HERRAMIENTA
                <input type="file" accept="image/*" onChange={onImageChange} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm disabled:bg-slate-100" />
              </label>
              <label className="mt-3 block text-xs font-normal uppercase tracking-wide text-[#00708A]">O PEGAR RUTA / URL DEL LOGO
                <input value={form.image} onChange={(event) => updateForm('image', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
              </label>
            </div>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-[120px_120px_1fr]">
            <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">ORDEN
              <input type="number" value={form.sortOrder} onChange={(event) => updateForm('sortOrder', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
            </label>
            <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">ESTADO
              <select value={form.active ? 'true' : 'false'} onChange={(event) => updateForm('active', event.target.value === 'true')} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 outline-none focus:border-[#F7B900] disabled:bg-slate-100"><option value="true">Activo</option><option value="false">Inactivo</option></select>
            </label>
            <div className="flex items-end gap-2">
              <button type="button" onClick={saveTool} disabled={!canEdit || saving} className="flex-1 rounded-2xl bg-[#00465F] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-45">{saving ? 'Guardando...' : 'Guardar herramienta'}</button>
              <button type="button" onClick={deleteTool} disabled={!canEdit || !form.id} className="rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-45">Eliminar</button>
            </div>
          </div>
          {message && <p className="mt-3 rounded-2xl bg-[#FFF8DF] px-4 py-3 text-sm text-[#7A4A00]">{message}</p>}
        </div>
      </div>
    </section>
  );
}

function AdminServicesManager({ services, setServices, ticTools, setTicTools, canEdit }) {
  const emptyForm = { id: '', name: '', group: 'personas', price: '', image: '/assets/services/gestoria.jpg', detail: '', subservicesText: '' };
  const [groupFilter, setGroupFilter] = useState('todos');
  const [editingId, setEditingId] = useState(services[0]?.id || '');
  const selected = services.find((service) => service.id === editingId) || services[0];
  const [form, setForm] = useState(() => selected ? serviceToForm(selected) : emptyForm);
  const [saving, setSaving] = useState(false);
  const visibleServices = groupFilter === 'todos' ? services : services.filter((service) => service.group === groupFilter);

  function serviceToForm(service) {
    return {
      id: service.id,
      name: service.name,
      group: service.group,
      price: service.price || '',
      image: service.image || '/assets/services/gestoria.jpg',
      detail: service.detail || '',
      subservicesText: (service.subservices || []).join('\n'),
    };
  }

  useEffect(() => {
    if (!services.some((service) => service.id === editingId) && services[0]) {
      setEditingId(services[0].id);
      setForm(serviceToForm(services[0]));
    }
  }, [services, editingId]);

  const selectService = (service) => { setEditingId(service.id); setForm(serviceToForm(service)); };
  const startNew = () => { const next = { ...emptyForm, id: `servicio-${Date.now().toString().slice(-5)}` }; setEditingId(''); setForm(next); };
  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateForm('image', URL.createObjectURL(file));
  };

  const buildServiceFromForm = () => {
    const cleanName = form.name.trim();
    if (!cleanName) return null;
    const subservices = form.subservicesText.split('\n').map((item) => item.trim()).filter(Boolean);
    return {
      id: form.id || `servicio-${Date.now().toString().slice(-5)}`,
      name: cleanName.toUpperCase(),
      group: form.group,
      price: form.price.trim() || 'Según cotización',
      image: form.image || '/assets/services/gestoria.jpg',
      detail: form.detail.trim() || 'Servicio Legal TIC sujeto a revisión y cotización.',
      subservices: subservices.length ? subservices : ['Solicitud general'],
    };
  };

  const saveService = async () => {
    if (!canEdit) return;
    const nextService = buildServiceFromForm();
    if (!nextService) return;
    setSaving(true);
    try {
      const savedService = isSupabaseConfigured ? await upsertServiceCatalog(nextService) : nextService;
      setServices((prev) => {
        const exists = prev.some((service) => service.id === nextService.id || service.id === savedService.id);
        if (exists) return prev.map((service) => (service.id === nextService.id || service.id === savedService.id) ? savedService : service);
        return [savedService, ...prev];
      });
      setEditingId(savedService.id);
      setForm(serviceToForm(savedService));
    } catch (error) {
      alert(`No se pudo guardar el servicio en Supabase: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async () => {
    if (!canEdit || !form.id) return;
    if (!confirm('¿Eliminar este servicio del catálogo público?')) return;
    try {
      if (isSupabaseConfigured) await deleteServiceCatalog(form.id);
      setServices((prev) => prev.filter((service) => service.id !== form.id));
      const next = services.find((service) => service.id !== form.id);
      if (next) { setEditingId(next.id); setForm(serviceToForm(next)); } else { startNew(); }
    } catch (error) {
      alert(`No se pudo eliminar el servicio en Supabase: ${error.message}`);
    }
  };

  return (
    <div className="mt-8">
      <AdminTicToolsManager tools={ticTools} setTools={setTicTools} canEdit={canEdit} />
      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
      <div className="rounded-[28px] border border-white bg-white p-5 shadow-executive">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-normal text-[#003044]">Servicios ofertados</h2>
            <p className="mt-1 text-sm text-slate-500">Edita servicios por grupo. Lo guardado se refleja en la bandeja pública de usuarios.</p>
          </div>
          <button type="button" onClick={startNew} disabled={!canEdit} className="rounded-full bg-[#00465F] px-5 py-2 text-sm font-normal text-white disabled:opacity-45">Nuevo servicio</button>
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {serviceGroups.map((group) => <button key={group.id} type="button" onClick={() => setGroupFilter(group.id)} className={`rounded-full px-4 py-2 text-sm font-normal ${groupFilter === group.id ? 'bg-[#FF7A1A] text-white' : 'bg-[#F4F5FB] text-slate-600'}`}>{group.label}</button>)}
        </div>
        <div className="grid max-h-[680px] gap-4 overflow-y-auto pr-1 md:grid-cols-2 scrollbar-thin">
          {visibleServices.map((service) => (
            <button key={service.id} type="button" onClick={() => selectService(service)} className={`overflow-hidden rounded-3xl border text-left shadow-soft transition hover:-translate-y-1 ${form.id === service.id ? 'border-[#F7B900] ring-2 ring-[#F7B900]/40' : 'border-slate-100'}`}>
              <img src={service.image} alt={service.name} className="h-32 w-full object-cover" />
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-normal uppercase text-[#003044]">{service.name}</p>
                <p className="mt-2 text-xs text-slate-500">{service.subservices.length} subservicios · {service.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white bg-white p-6 shadow-executive">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[.18em] text-[#F7B900]">Editor comercial</p>
            <h2 className="mt-2 text-2xl font-normal text-[#003044]">Editar / adicionar subservicios / eliminar</h2>
          </div>
          {!canEdit && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-normal text-slate-500">Solo administrador</span>}
        </div>
        <div className="grid gap-4">
          <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">NOMBRE DEL SERVICIO
            <input value={form.name} onChange={(event) => updateForm('name', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">GRUPO DE VISUALIZACIÓN
              <select value={form.group} onChange={(event) => updateForm('group', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700 outline-none focus:border-[#F7B900] disabled:bg-slate-100">
                <option value="personas">Personas</option><option value="empresas">Empresas</option><option value="firdi">FiRDi</option>
              </select>
            </label>
            <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">PRECIO / REFERENCIA
              <input value={form.price} onChange={(event) => updateForm('price', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
            </label>
          </div>
          <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">DETALLE DEL SERVICIO
            <textarea value={form.detail} onChange={(event) => updateForm('detail', event.target.value)} disabled={!canEdit} className="mt-1 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
          </label>
          <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">SUBSERVICIOS, UNO POR LÍNEA
            <textarea value={form.subservicesText} onChange={(event) => updateForm('subservicesText', event.target.value)} disabled={!canEdit} className="mt-1 min-h-36 w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700 outline-none focus:border-[#F7B900] disabled:bg-slate-100" placeholder={'Aceptación de herencia\nCertificado de defunción\nImpuesto de sucesiones'} />
          </label>
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50"><img src={form.image} alt="Vista previa del servicio" className="h-44 w-full object-cover" /></div>
            <div>
              <label className="text-xs font-normal uppercase tracking-wide text-[#00708A]">IMAGEN DEL SERVICIO
                <input type="file" accept="image/*" onChange={onImageChange} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal disabled:bg-slate-100" />
              </label>
              <label className="mt-4 block text-xs font-normal uppercase tracking-wide text-[#00708A]">O PEGAR RUTA / URL DE IMAGEN
                <input value={form.image} onChange={(event) => updateForm('image', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700 outline-none focus:border-[#F7B900] disabled:bg-slate-100" />
              </label>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <button type="button" onClick={saveService} disabled={!canEdit || saving} className="rounded-2xl bg-[#00465F] px-4 py-3 font-normal text-white disabled:opacity-45">{saving ? 'Guardando...' : 'Guardar servicio'}</button>
            <button type="button" onClick={startNew} disabled={!canEdit} className="rounded-2xl bg-[#F7B900] px-4 py-3 font-normal text-[#003044] disabled:opacity-45">Limpiar / nuevo</button>
            <button type="button" onClick={deleteService} disabled={!canEdit || !form.id} className="rounded-2xl bg-red-600 px-4 py-3 font-normal text-white disabled:opacity-45">Eliminar</button>
          </div>
          <p className="text-xs leading-5 text-slate-500">Si Supabase está configurado, estos cambios se guardan en service_catalog y service_subservices. Sin .env.local, funcionan en modo local para vista previa.</p>
        </div>
      </div>
      </div>
    </div>
  );
}

function AdminPortalsManager({ portals, setPortals, canEdit }) {
  const emptyForm = { id: '', title: '', image: '/assets/gov/ciudadania.png', url: '' };
  const [editingId, setEditingId] = useState(portals[0]?.id || '');
  const selected = portals.find((portal) => portal.id === editingId) || portals[0];
  const [form, setForm] = useState(() => selected ? portalToForm(selected) : emptyForm);
  const [saving, setSaving] = useState(false);

  function portalToForm(portal) {
    return {
      id: portal.id,
      title: portal.title,
      image: portal.image || '/assets/gov/ciudadania.png',
      url: portal.url || '',
    };
  }

  useEffect(() => {
    if (!portals.some((portal) => portal.id === editingId) && portals[0]) {
      setEditingId(portals[0].id);
      setForm(portalToForm(portals[0]));
    }
  }, [portals, editingId]);

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const selectPortal = (portal) => { setEditingId(portal.id); setForm(portalToForm(portal)); };
  const startNew = () => { const next = { ...emptyForm, id: `portal-${Date.now().toString().slice(-5)}` }; setEditingId(''); setForm(next); };
  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateForm('image', URL.createObjectURL(file));
  };

  const buildPortalFromForm = () => {
    const title = form.title.trim();
    if (!title) return null;
    return {
      id: form.id || `portal-${Date.now().toString().slice(-5)}`,
      title,
      image: form.image || '/assets/gov/ciudadania.png',
      url: form.url.trim(),
    };
  };

  const savePortal = async () => {
    if (!canEdit) return;
    const nextPortal = buildPortalFromForm();
    if (!nextPortal) return;
    setSaving(true);
    try {
      const savedPortal = isSupabaseConfigured ? await upsertDigitalPortal(nextPortal) : nextPortal;
      setPortals((prev) => {
        const exists = prev.some((portal) => portal.id === nextPortal.id || portal.id === savedPortal.id);
        if (exists) return prev.map((portal) => (portal.id === nextPortal.id || portal.id === savedPortal.id) ? savedPortal : portal);
        return [savedPortal, ...prev];
      });
      setEditingId(savedPortal.id);
      setForm(portalToForm(savedPortal));
    } catch (error) {
      alert(`No se pudo guardar el portal en Supabase: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const deletePortal = async () => {
    if (!canEdit || !form.id) return;
    if (!confirm('¿Eliminar este acceso de Gobierno Digital Bolivia?')) return;
    try {
      if (isSupabaseConfigured) await deleteDigitalPortal(form.id);
      setPortals((prev) => prev.filter((portal) => portal.id !== form.id));
      const next = portals.find((portal) => portal.id !== form.id);
      if (next) { setEditingId(next.id); setForm(portalToForm(next)); } else { startNew(); }
    } catch (error) {
      alert(`No se pudo eliminar el portal en Supabase: ${error.message}`);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
      <section className="bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="uppercase tracking-[.20em] text-[#FF7A1A]">Gobierno Digital Bolivia</p>
            <h2 className="mt-2 text-2xl font-normal text-[#2A2D38]">Imágenes, enlaces y orden visual</h2>
            <p className="mt-1 text-sm text-slate-500">Cada tarjeta pública será clickable y abrirá la URL configurada.</p>
          </div>
          <button type="button" onClick={startNew} disabled={!canEdit} className="rounded-md bg-[#00465F] px-5 py-3 text-sm text-white disabled:opacity-45">Nuevo acceso</button>
        </div>
        <div className="mt-6 grid max-h-[700px] gap-4 overflow-y-auto pr-1 sm:grid-cols-2 scrollbar-thin">
          {portals.map((portal) => (
            <button key={portal.id} type="button" onClick={() => selectPortal(portal)} className={`group overflow-hidden bg-white text-left shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-lg ${form.id === portal.id ? 'ring-[#FF7A1A]' : 'ring-slate-200'}`}>
              <div className="h-32 bg-[#F4F5FB]"><img src={portal.image} alt={portal.title} className="h-full w-full object-contain p-3 transition group-hover:scale-105" /></div>
              <div className="p-4"><p className="line-clamp-2 text-sm text-[#00465F]">{portal.title}</p><p className="mt-2 truncate text-xs text-slate-400">{portal.url || 'URL pendiente'}</p></div>
            </button>
          ))}
        </div>
      </section>
      <section className="bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="uppercase tracking-[.20em] text-[#FF7A1A]">Editor de acceso</p>
        <h2 className="mt-2 text-2xl font-normal text-[#2A2D38]">Editar / modificar / eliminar</h2>
        {!canEdit && <p className="mt-2 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-500">Solo el administrador puede modificar estos accesos.</p>}
        <div className="mt-4 grid gap-3">
          <label className="text-xs uppercase tracking-wide text-[#00708A]">TÍTULO DEL PORTAL
            <input value={form.title} onChange={(event) => updateForm('title', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-slate-700 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100" />
          </label>
          <label className="text-xs uppercase tracking-wide text-[#00708A]">URL / ENLACE DE DESTINO
            <input value={form.url} onChange={(event) => updateForm('url', event.target.value)} disabled={!canEdit} placeholder="https://..." className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-slate-700 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100" />
          </label>
          <div className="grid gap-4 md:grid-cols-[240px_1fr]">
            <div className="overflow-hidden bg-[#F4F5FB] ring-1 ring-slate-200"><img src={form.image} alt="Vista previa" className="h-48 w-full object-contain p-3" /></div>
            <div>
              <label className="text-xs uppercase tracking-wide text-[#00708A]">IMAGEN DEL PORTAL
                <input type="file" accept="image/*" onChange={onImageChange} disabled={!canEdit} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm disabled:bg-slate-100" />
              </label>
              <label className="mt-4 block text-xs uppercase tracking-wide text-[#00708A]">O PEGAR RUTA / URL DE IMAGEN
                <input value={form.image} onChange={(event) => updateForm('image', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-slate-700 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100" />
              </label>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <button type="button" onClick={savePortal} disabled={!canEdit || saving} className="rounded-md bg-[#00465F] px-4 py-3 text-white disabled:opacity-45">{saving ? 'Guardando...' : 'Guardar acceso'}</button>
            <button type="button" onClick={startNew} disabled={!canEdit} className="rounded-md bg-[#F7B900] px-4 py-3 text-[#003044] disabled:opacity-45">Limpiar / nuevo</button>
            <button type="button" onClick={deletePortal} disabled={!canEdit || !form.id} className="rounded-md bg-red-600 px-4 py-3 text-white disabled:opacity-45">Eliminar</button>
          </div>
          <p className="text-xs leading-5 text-slate-500">Con Supabase configurado se guarda en la tabla digital_portals. Sin .env.local funciona como edición local para vista previa.</p>
        </div>
      </section>
    </div>
  );
}

function AdminUsersManager({ users, setUsers, canEdit, currentUser }) {
  const empty = { id: '', fullName: '', email: '', phone: '', role: 'client', active: true, avatarUrl: '', password: '' };
  const [form, setForm] = useState(empty);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const isMasterAdmin = String(currentUser?.email || '').toLowerCase() === MASTER_ADMIN_EMAIL;
  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const selectUser = (item) => setForm({ ...empty, ...item, password: '' });
  const reset = () => { setForm(empty); setMessage(''); };

  const saveUser = async () => {
    if (!canEdit || !form.email.trim()) return;
    const email = form.email.trim().toLowerCase();
    const next = {
      ...form,
      email,
      fullName: form.fullName.trim() || email,
    };

    if (next.role === 'admin' && !isMasterAdmin) {
      setMessage('Solo el administrador maestro puede crear o convertir usuarios en administrador.');
      return;
    }

    if (!next.id || String(next.id).startsWith('usuario-')) {
      setMessage('Primero el usuario debe ingresar con su cuenta Google. Después aparecerá en esta bandeja y podrás autorizarlo como cliente, abogado habilitado o administrador.');
      return;
    }

    try {
      if (isSupabaseConfigured) {
        await updateProfileRole(next.id, { email: next.email, role: next.role, active: next.active, full_name: next.fullName, phone: next.phone, avatar_url: next.avatarUrl });
        setMessage('Perfil, rol y estado actualizados en Supabase. El usuario seguirá ingresando con su cuenta Google.');
      } else {
        setMessage('Cambio aplicado en pantalla. Para producción configura Supabase y Google OAuth.');
      }
    } catch (error) {
      setMessage(`El cambio quedó aplicado en pantalla, pero no se pudo sincronizar: ${error.message}`);
    }

    const publicNext = { ...next, password: '' };
    setUsers((prev) => {
      const updated = prev.some((item) => item.id === publicNext.id || item.email === publicNext.email)
        ? prev.map((item) => (item.id === publicNext.id || item.email === publicNext.email) ? { ...item, ...publicNext } : item)
        : [publicNext, ...prev];
      writeLocalGoogleUsers(updated);
      return updated;
    });
    setForm(publicNext);
  };

  const blockUser = async () => {
    if (!canEdit || !form.id) return;
    if (form.role === 'admin' && !isMasterAdmin) {
      setMessage('Solo el administrador maestro puede retirar acceso de administradores.');
      return;
    }
    if (!confirm('¿Bloquear este usuario? No se borra su historial; queda inactivo.')) return;
    try {
      if (isSupabaseConfigured && !String(form.id).startsWith('usuario-')) await updateProfileRole(form.id, { email: form.email, role: form.role, active: false, full_name: form.fullName, phone: form.phone, avatar_url: form.avatarUrl });
      setMessage('Usuario bloqueado correctamente.');
    } catch (error) {
      setMessage(`El usuario se bloqueará en pantalla, pero no se pudo sincronizar con Supabase: ${error.message}`);
    }
    setUsers((prev) => {
      const updated = prev.map((item) => item.id === form.id ? { ...item, active: false } : item);
      writeLocalGoogleUsers(updated);
      return updated;
    });
    setForm((prev) => ({ ...prev, active: false }));
  };

  const deleteUser = async () => {
    if (!canEdit || !form.id) return;
    const targetEmail = String(form.email || '').trim().toLowerCase();
    if (targetEmail === MASTER_ADMIN_EMAIL) {
      setMessage('No se puede eliminar el administrador maestro de LegalTIC.');
      return;
    }
    if (form.role === 'admin' && !isMasterAdmin) {
      setMessage('Solo el administrador maestro puede eliminar administradores.');
      return;
    }
    const ok = confirm(`¿Eliminar definitivamente a ${form.fullName || form.email}?\n\nEsta acción lo quitará de la bandeja y, en producción Netlify, también eliminará su usuario de Supabase Auth.`);
    if (!ok) return;
    try {
      if (isSupabaseConfigured && !String(form.id).startsWith('usuario-')) {
        const result = await deleteManagedProfile(form.id, form.email);
        if (result?.localOnly) {
          setMessage('Usuario eliminado de public.profiles. En localhost con Vite puro no se ejecutan funciones Netlify; la eliminación total de Auth se completará al usar Netlify.');
        } else {
          setMessage('Usuario eliminado de la web app y Supabase.');
        }
      } else {
        setMessage('Usuario eliminado de la bandeja local.');
      }
      setUsers((prev) => {
        const updated = prev.filter((item) => item.id !== form.id);
        writeLocalGoogleUsers(updated);
        return updated;
      });
      reset();
    } catch (error) {
      setMessage(`No se pudo eliminar completamente: ${error.message}`);
    }
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_390px]">
      <section className="min-w-0 overflow-hidden rounded-[2px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#FF7A1A]">Usuarios y roles</p>
            <h2 className="mt-2 text-2xl font-normal leading-tight text-[#2A2D38]">Autorizar, modificar o bloquear accesos</h2>
          </div>
          <button type="button" onClick={reset} disabled={!canEdit} className="rounded-md bg-[#00465F] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-45">Nuevo usuario</button>
        </div>

        <div className="mt-6 overflow-hidden border border-slate-200 bg-white">
          <table className="w-full table-fixed text-[13px]">
            <colgroup>
              <col className="w-[64px]" />
              <col className="w-[24%]" />
              <col className="w-[34%]" />
              <col className="w-[19%]" />
              <col className="w-[92px]" />
              <col className="w-[86px]" />
            </colgroup>
            <thead className="bg-[#F0F2F7] text-left text-slate-700">
              <tr>
                <th className="px-4 py-3 font-medium">Foto</th>
                <th className="px-3 py-3 font-medium">Nombre</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Rol</th>
                <th className="px-3 py-3 font-medium">Estado</th>
                <th className="px-3 py-3 text-center font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id} className="border-t border-slate-200 hover:bg-[#F7FAFD]">
                  <td className="px-4 py-3"><ProfileAvatar user={item} size={38} /></td>
                  <td className="px-3 py-3"><span className="block truncate font-medium text-slate-800" title={item.fullName}>{item.fullName}</span></td>
                  <td className="px-3 py-3"><span className="block truncate text-slate-700" title={item.email}>{item.email}</span></td>
                  <td className="px-3 py-3"><span className="block truncate text-slate-700" title={roleLabels[item.role] || item.role}>{roleLabels[item.role] || item.role}</span></td>
                  <td className="px-3 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.active ? 'Activo' : 'Bloqueado'}</span></td>
                  <td className="px-3 py-3 text-center"><button type="button" onClick={() => selectUser(item)} className="rounded-md bg-[#55B8D9] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3DA9CC]">Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">El ingreso se realiza con Google. Esta bandeja administra perfiles, roles, estado y foto; no administra contraseñas.</p>
      </section>

      <section className="min-w-0 overflow-hidden rounded-[2px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#FF7A1A]">Editor de usuario</p>
              <p className="mt-2 text-sm leading-5 text-slate-500">Selecciona un usuario y ajusta su autorización.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <button type="button" onClick={saveUser} disabled={!canEdit} className="rounded-md bg-[#00465F] px-2.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-45">Guardar</button>
            <button type="button" onClick={reset} disabled={!canEdit} className="rounded-md border border-[#F7B900] bg-white px-2.5 py-2 text-xs font-semibold text-[#003044] shadow-sm transition hover:-translate-y-0.5 disabled:opacity-45">Limpiar</button>
            <button type="button" onClick={blockUser} disabled={!canEdit || !form.id} className="rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 shadow-sm transition hover:-translate-y-0.5 disabled:opacity-45">Bloquear</button>
            <button type="button" onClick={deleteUser} disabled={!canEdit || !form.id} className="rounded-md bg-red-600 px-2.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-45">Eliminar</button>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          <label className="text-xs uppercase tracking-wide text-[#00708A]">NOMBRE COMPLETO
            <input value={form.fullName} onChange={(event) => updateForm('fullName', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100" />
          </label>
          <label className="text-xs uppercase tracking-wide text-[#00708A]">CORREO
            <input value={form.email} onChange={(event) => updateForm('email', event.target.value)} disabled={!canEdit || Boolean(form.id && !String(form.id).startsWith('usuario-'))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100" />
          </label>
          <label className="text-xs uppercase tracking-wide text-[#00708A]">TELÉFONO / WHATSAPP
            <input value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-xs uppercase tracking-wide text-[#00708A]">ROL
              <select value={form.role} onChange={(event) => updateForm('role', event.target.value)} disabled={!canEdit} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100">
                <option value="client">Cliente</option><option value="lawyer">Abogado habilitado</option><option value="admin">Administrador</option>
              </select>
            </label>
            <label className="text-xs uppercase tracking-wide text-[#00708A]">ESTADO
              <select value={form.active ? 'true' : 'false'} onChange={(event) => updateForm('active', event.target.value === 'true')} disabled={!canEdit} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100">
                <option value="true">Activo</option><option value="false">Bloqueado</option>
              </select>
            </label>
          </div>
          <div className="rounded-xl bg-[#F7FAFD] px-3 py-3 text-[13px] leading-5 text-slate-600 ring-1 ring-slate-100">
            <p><b className="text-[#003044]">Acceso Google:</b> esta bandeja ya no genera ni envía contraseñas. Cada usuario administra su contraseña desde su cuenta Google.</p>
            <p className="mt-2"><b className="text-[#003044]">Autorización:</b> cuando el usuario ingrese con Google, aparecerá aquí para que el administrador lo mantenga como cliente o lo cambie a abogado habilitado/administrador.</p>
          </div>
          {message && <p className="rounded-md bg-[#FFF8DF] px-4 py-3 text-sm text-[#7A4A00]">{message}</p>}
        </div>
      </section>
    </div>
  );
}

function AdminSettingsManager({ whatsappNumber, setWhatsappNumber, canEdit }) {
  const [draft, setDraft] = useState(whatsappNumber || DEFAULT_WHATSAPP_NUMBER);
  const [message, setMessage] = useState('');
  const save = async () => {
    if (!canEdit) return;
    const normalized = normalizeWhatsappNumber(draft);
    setWhatsappNumber(normalized);
    setMessage('Número de WhatsApp actualizado en la web app.');
    if (isSupabaseConfigured) {
      try {
        await upsertAppSetting('whatsapp_number', normalized);
        setMessage('Número de WhatsApp actualizado y guardado en Supabase.');
      } catch (error) {
        setMessage(`Actualizado en pantalla, pendiente de Supabase: ${error.message}`);
      }
    }
  };
  return (
    <section className="max-w-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <p className="uppercase tracking-[.20em] text-[#FF7A1A]">Configuración comercial</p>
      <h2 className="mt-2 text-2xl font-normal text-[#2A2D38]">WhatsApp principal de contacto</h2>
      <p className="mt-2 text-sm text-slate-500">Este número alimenta los botones de WhatsApp de contacto, agenda y servicios. Al guardarlo, la web app usa automáticamente el nuevo número.</p>
      <label className="mt-6 block text-xs uppercase tracking-wide text-[#00708A]">NÚMERO WHATSAPP
        <input value={draft} onChange={(event) => setDraft(event.target.value)} disabled={!canEdit} placeholder="73132529" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 outline-none focus:border-[#FF7A1A] disabled:bg-slate-100" />
      </label>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={save} disabled={!canEdit} className="rounded-md bg-[#00465F] px-5 py-3 text-white disabled:opacity-45">Guardar WhatsApp</button>
        <a href={buildWhatsappLink('Prueba de enlace Legal TIC.', draft)} target="_blank" rel="noreferrer" className="rounded-md bg-[#F7B900] px-5 py-3 text-[#003044]">Probar enlace</a>
      </div>
      {message && <p className="mt-4 rounded-md bg-[#FFF8DF] px-4 py-3 text-sm text-[#7A4A00]">{message}</p>}
    </section>
  );
}

function Metric({ label, value, tone }) {
  const tones = { blue: 'from-[#00465F] to-[#006C8A]', aqua: 'from-[#00A8C8] to-[#00465F]', yellow: 'from-[#F7B900] to-[#FFD968]', green: 'from-[#57C900] to-[#2E7D32]' };
  return <div className="overflow-hidden rounded-[26px] bg-white p-5 shadow-soft"><div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${tones[tone]}`} /><div className="text-4xl font-black text-[#003044]">{value}</div><div className="mt-1 text-sm font-bold text-slate-500">{label}</div></div>;
}

function PaymentBadge({ value }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${value === 'Pago aprobado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{value}</span>;
}

function StatusBadge({ value }) {
  const label = value || 'Solicitud';
  const tones = {
    Solicitud: 'bg-blue-50 text-blue-700 ring-blue-100',
    'En desarrollo': 'bg-amber-50 text-amber-700 ring-amber-100',
    Concluido: 'bg-green-50 text-green-700 ring-green-100',
    Cancelado: 'bg-red-50 text-red-700 ring-red-100',
  };
  return <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[label] || 'bg-slate-50 text-slate-600 ring-slate-100'}`}>{label}</span>;
}

function AdminDetail({ selected, updateSelected, canApprovePayments, user }) {
  return (
    <aside className="rounded-[28px] border border-white bg-white p-6 shadow-executive">
      <div className="flex justify-between gap-4">
        <div><p className="text-sm font-black uppercase tracking-[.18em] text-[#F7B900]">Solicitud</p><h2 className="text-3xl font-black text-[#003044]">{selected.id}</h2><p className="text-slate-500">{selected.client}</p></div>
        <StatusBadge value={selected.state} />
      </div>
      <div className="mt-6 grid gap-4 text-sm">
        <Detail label="Servicio" value={selected.service} />
        <Detail label="Teléfono / WhatsApp" value={selected.phone} />
        <Detail label="Subservicios" value={selected.subservices.join(', ')} />
        <Detail label="Asignado a" value={selected.assignedTo} />
        <Detail label="Nota interna" value={selected.adminNote} />
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-[#F8FBFD] p-4">
        <p className="font-black text-[#003044]">Comprobante y documentos del cliente</p>
        <DocumentButton label={`Comprobante: ${selected.paymentReceipt}`} />
        {selected.uploadedByClient.map((doc) => <DocumentButton key={doc} label={doc} />)}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {canApprovePayments ? <button type="button" onClick={() => updateSelected({ payment: 'Pago aprobado' })} className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-normal text-white shadow-sm transition hover:-translate-y-0.5">Aprobar pago</button> : <button type="button" disabled className="rounded-full bg-slate-200 px-5 py-2.5 text-sm font-normal text-slate-500"><Icon name="lock" size={16} className="mr-1 inline" /> Pago solo admin</button>}
        <button type="button" onClick={() => updateSelected({ state: 'En desarrollo', assignedTo: user.role === 'lawyer' ? 'Abogado habilitado actual' : 'Abg. Carla Rojas' })} className="rounded-full bg-[#00465F] px-5 py-2.5 text-sm font-normal text-white shadow-sm transition hover:-translate-y-0.5">Tomar / asignar</button>
        <button type="button" onClick={() => updateSelected({ finalDocument: 'documento-final-servicio.pdf', state: 'Concluido', payment: selected.payment })} className="rounded-full bg-[#F7B900] px-5 py-2.5 text-sm font-normal text-[#003044] shadow-sm transition hover:-translate-y-0.5">Subir final</button>
        {canApprovePayments ? <button type="button" onClick={() => updateSelected({ state: 'Cancelado' })} className="rounded-full bg-red-50 px-5 py-2.5 text-sm font-normal text-red-700 ring-1 ring-red-200 shadow-sm transition hover:-translate-y-0.5">Cancelar</button> : <button type="button" onClick={() => updateSelected({ adminNote: 'El abogado solicitó revisión administrativa.' })} className="rounded-full bg-slate-800 px-5 py-2.5 text-sm font-normal text-white shadow-sm transition hover:-translate-y-0.5">Pedir revisión</button>}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">Regla aplicada: solo el administrador aprueba pagos. El abogado habilitado atiende solicitudes, descarga documentos, toma/asigna según permiso operativo, sube avance o documento final y solicita revisión administrativa.</p>
    </aside>
  );
}

function Detail({ label, value }) {
  return <div><p className="text-xs font-black uppercase tracking-wide text-[#00708A]">{label}</p><p className="text-slate-700">{value}</p></div>;
}

function DocumentButton({ label }) {
  return (
    <button
      type="button"
      onClick={() => downloadMockDocument(label)}
      className="mt-3 flex w-full items-center gap-2 rounded-2xl bg-white px-4 py-3 text-left text-sm font-normal text-[#00465F] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EAF2FB]"
      title="Descargar documento"
    >
      <Icon name="download" size={17} /> {label}
    </button>
  );
}

function PortalsSection({ portals }) {
  return (
    <section id="gobierno-digital" className="relative overflow-hidden bg-gradient-to-b from-[#F4FAFE] via-[#EAF2FB] to-[#DCEAF3] py-20 scroll-mt-[78px]">
      <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(circle at 10% 15%, rgba(0,70,95,.10), transparent 18%), radial-gradient(circle at 88% 5%, rgba(247,185,0,.16), transparent 18%), linear-gradient(180deg, rgba(255,255,255,.18), rgba(234,242,251,.95))' }} />
      <div className="relative mx-auto max-w-7xl px-5 text-center">
        <h2 className="section-title-bold text-4xl uppercase tracking-[.34em] text-[#00465F] md:text-6xl">GOBIERNO DIGITAL</h2>
        <p className="mt-4 text-lg font-normal text-[#00465F] md:text-2xl">Portales institucionales y trámites digitales</p>
      </div>
      <div className="relative mx-auto mt-14 grid max-w-7xl gap-x-7 gap-y-12 px-5 sm:grid-cols-2 lg:grid-cols-5">
        {portals.map((portal, index) => <PortalCard key={portal.id} portal={portal} index={index} />)}
      </div>
    </section>
  );
}

function PortalCard({ portal, index = 0 }) {
  const href = portal.url || '#';
  const isLinked = Boolean(portal.url);
  return (
    <a
      href={href}
      target={isLinked ? '_blank' : undefined}
      rel={isLinked ? 'noreferrer' : undefined}
      onClick={(event) => { if (!isLinked) event.preventDefault(); }}
      className="portal-logo-card reveal-card group block text-center transition hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-[#F7B900]"
      style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}
      title={isLinked ? `Abrir ${portal.title}` : 'URL pendiente de configurar'}
    >
      <div className="portal-logo-reflect mx-auto flex h-24 items-center justify-center rounded-[28px] bg-white/20 px-4 backdrop-blur-sm transition group-hover:bg-white/35">
        <img src={portal.image} alt={portal.title} className="max-h-20 max-w-[145px] object-contain transition duration-500 group-hover:scale-110" />
      </div>
      <p className="mx-auto mt-9 max-w-[190px] text-center text-sm font-normal uppercase tracking-wide text-[#00465F]">{portal.title}</p>
    </a>
  );
}

function FooterWave({ whatsappNumber }) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#111] pb-10 pt-24 text-white">
      <div className="absolute -top-16 left-0 right-0 h-32 scale-x-150 rounded-[50%] bg-white" />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-sm uppercase tracking-[.18em] text-[#F7B900]">LEGALTIC ABOGADOS</h3>
          <p className="max-w-sm text-white/75">Asesoría y Gestoría con innovación.</p>
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            className="mt-5 rounded-full border border-white/20 px-5 py-2 text-sm text-white/85 transition hover:border-[#F7B900] hover:text-[#F7B900]"
          >
            Política de Privacidad
          </button>
        </div>

        <div>
          <h3 className="mb-4 text-sm uppercase tracking-[.18em] text-[#F7B900]">CONTACTO</h3>
          <p>legaltic.abogados@gmail.com</p>
          <p>
            <a
              href={buildWhatsappLink('Hola Legal TIC, necesito información sobre sus servicios.', whatsappNumber)}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F7B900]"
            >
              {`+${normalizeWhatsappNumber(whatsappNumber)}`}
            </a>
          </p>
        </div>

        <div className="text-center">
          <Logo className="mx-auto" small />
          <p className="mt-4">Asesoría y Gestoría con innovación</p>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl border-t border-white/10 px-5 pt-5 text-center text-sm text-white/60">
        © 2026 LEGALTIC ABOGADOS. Todos los derechos reservados.
      </div>

      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
    </footer>
  );
}

function PrivacyPolicyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm">
      <article className="w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-[#F4FAFE] px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-[#F7B900]">LEGALTIC ABOGADOS</p>
            <h2 className="mt-1 text-2xl text-[#00465F]">Política de Privacidad</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00465F] text-white transition hover:bg-[#003044]"
            aria-label="Cerrar política de privacidad"
          >
            <Icon name="x" size={22} />
          </button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 text-sm leading-7 text-slate-700">
          {privacyPolicyText.split('\n').map((line, index) => {
            const clean = line.trim();
            if (!clean) return <div key={index} className="h-3" />;
            if (clean.startsWith('POLÍTICA DE PRIVACIDAD')) {
              return <h3 key={index} className="mb-4 text-xl text-[#00465F]">{clean}</h3>;
            }
            if (/^\d+\./.test(clean)) {
              return <h4 key={index} className="mt-6 text-base text-[#00465F]">{clean}</h4>;
            }
            if (clean.startsWith('LEGALTIC ABOGADOS')) {
              return <p key={index} className="text-[#00465F]">{clean}</p>;
            }
            if (/^_+$/.test(clean)) {
              return <hr key={index} className="my-4 border-slate-200" />;
            }
            return <p key={index} className="mb-2">{clean}</p>;
          })}
        </div>

        <footer className="flex justify-end border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#00465F] px-6 py-2 text-white transition hover:bg-[#003044]"
          >
            Cerrar
          </button>
        </footer>
      </article>
    </div>
  );
}

function Home({ goToSection, openServicesGroup, setView, services, user, portals, ticTools, addRequest, whatsappNumber }) {
  return <>
    <Hero goToSection={goToSection} openServicesGroup={openServicesGroup} user={user} whatsappNumber={whatsappNumber} />
    <div id="firdi" className="scroll-mt-[78px]"><FirdiSection /></div>
    <WaveDivider color="#DDE8EE" className="bg-[#111111] section-wave-tight" />
    <TicToolsSection tools={ticTools} />
    <WaveDivider color="#F5F9FC" className="bg-[#DDE8EE] section-wave-tight" />
    <AgendaSection user={user} whatsappNumber={whatsappNumber} />
    <WaveDivider color="#EAF2FB" />
    <ContactSection services={services} whatsappNumber={whatsappNumber} />
    <PortalsSection portals={portals} />
    <FooterWave whatsappNumber={whatsappNumber} />
  </>;
}


function ResetPasswordPage({ setView }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('Ingresa una nueva contraseña para completar el restablecimiento.');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateCurrentPassword(password);
      setMessage('Contraseña actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.');
      setTimeout(() => setView('login'), 1200);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-78px)] flex-col bg-white pt-12">
      <section className="mx-auto w-full max-w-2xl px-5">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-4 text-center text-4xl font-black">Cambiar contraseña</h1>
        <p className="mt-3 text-center text-sm text-slate-500">Este formulario se usa cuando abres el enlace de recuperación enviado a tu correo.</p>
        <div className="mt-7 space-y-4">
          <div>
            <label className="block text-xs font-normal uppercase tracking-wide text-[#00708A]">NUEVA CONTRASEÑA</label>
            <div className="mt-1 flex rounded border-2 border-[#00A8C8] bg-white focus-within:border-[#F7B900]">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-l px-4 py-3 font-normal text-slate-700 outline-none" placeholder="Mínimo 8 caracteres" autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="min-w-[96px] border-l border-[#00A8C8] px-3 text-sm font-semibold text-[#00465F]">{showPassword ? 'Ocultar' : 'Ver'}</button>
            </div>
          </div>
          {message && <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-semibold text-[#7A4A00]">{message}</div>}
          <button type="button" onClick={save} disabled={saving || password.length < 8} className="w-full rounded-full border-2 border-[#F7B900] bg-[#00465F] px-7 py-3 font-black text-white shadow-executive disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'GUARDANDO...' : 'GUARDAR NUEVA CONTRASEÑA'}</button>
        </div>
      </section>
      <FooterWave />
    </main>
  );
}

export default function LegalTICApp() {
  const [view, setView] = useState('home');
  const [activeNav, setActiveNav] = useState('home');
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState(initialServices);
  const [digitalPortals, setDigitalPortals] = useState(initialPortals);
  const [ticTools, setTicTools] = useState(() => readLocalTicTools(initialTicTools));
  const [systemNote, setSystemNote] = useState('');
  const [pendingScrollId, setPendingScrollId] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP_NUMBER);
  const [managedUsers, setManagedUsers] = useState(() => mergeManagedUsers(readLocalGoogleUsers(), initialUsers));
  const [serviceViewFilter, setServiceViewFilter] = useState('todos');
  const [headerOnHero, setHeaderOnHero] = useState(true);

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const search = typeof window !== 'undefined' ? window.location.search : '';
    if (hash.includes('type=recovery') || search.includes('type=recovery')) {
      setView('resetPassword');
    }
  }, []);

  const goToSection = (sectionId = 'inicio') => {
    const navKeyBySection = { inicio: 'home', firdi: 'firdi', 'herramientas-tic': 'tools', agenda: 'agenda', contactanos: 'contact' };
    setActiveNav(navKeyBySection[sectionId] || 'home');
    if (sectionId === 'inicio') setHeaderOnHero(true);
    setPendingScrollId(sectionId);
    setView('home');
  };

  const openServicesGroup = (group = 'todos') => {
    setActiveNav('services');
    setServiceViewFilter(group);
    setView('services');
  };


  const buildProfileFromGoogleSession = async () => {
    if (!isSupabaseConfigured || !supabase?.auth) return null;
    const { data } = await supabase.auth.getSession();
    const sessionUser = data?.session?.user;
    if (!sessionUser?.email) return null;
    const email = String(sessionUser.email || '').trim().toLowerCase();
    let profile = null;
    try {
      profile = await ensureCurrentGoogleProfile({ masterAdminEmail: MASTER_ADMIN_EMAIL });
    } catch (error) {
      console.warn('Perfil remoto no disponible; aplicando respaldo por cuenta Google:', error.message);
      try { profile = await getCurrentUserProfile(); } catch { profile = null; }
    }
    const metadata = sessionUser.user_metadata || {};
    const localAuthorization = shouldUseLocalRoleFallback() ? readLocalAuthorizationForEmail(email) : null;
    const remoteRole = ['admin', 'lawyer', 'client'].includes(profile?.role) ? profile.role : 'client';
    const localRole = ['admin', 'lawyer', 'client'].includes(localAuthorization?.role) ? localAuthorization.role : '';
    const role = isMasterAdminEmail(email) ? 'admin' : (localRole || remoteRole || 'client');
    return {
      id: profile?.id || localAuthorization?.id || sessionUser.id,
      email,
      fullName: profile?.full_name || profile?.fullName || localAuthorization?.fullName || metadata.full_name || metadata.name || email,
      phone: profile?.phone || localAuthorization?.phone || metadata.phone || '',
      avatarUrl: profile?.avatar_url || profile?.avatarUrl || localAuthorization?.avatarUrl || metadata.avatar_url || metadata.picture || '',
      role,
      active: localAuthorization ? localAuthorization.active !== false : profile?.active !== false,
    };
  };

  const applySessionProfile = (profile, { preferHomeForClient = true } = {}) => {
    if (!profile) return false;
    if (profile.active === false) {
      setUser(null);
      setSystemNote('Tu usuario está bloqueado o pendiente de autorización. Solicita habilitación al administrador.');
      return false;
    }
    const profileEmail = String(profile.email || '').trim().toLowerCase();
    const localAuthorization = shouldUseLocalRoleFallback() ? readLocalAuthorizationForEmail(profileEmail) : null;
    const profileRole = ['admin', 'lawyer', 'client'].includes(profile.role) ? profile.role : 'client';
    const localRole = ['admin', 'lawyer', 'client'].includes(localAuthorization?.role) ? localAuthorization.role : '';
    const role = isMasterAdminEmail(profileEmail) ? 'admin' : (localRole || profileRole);
    const nextUser = {
      email: profile.email,
      role,
      name: profile.fullName || profile.full_name || profile.email,
      phone: profile.phone || '',
      avatarUrl: profile.avatarUrl || profile.avatar_url || '',
      dbId: profile.id || '',
    };
    setSystemNote('');
    setUser(nextUser);
    const currentProfile = {
      id: nextUser.dbId || nextUser.email,
      fullName: nextUser.name,
      email: nextUser.email,
      phone: nextUser.phone || '',
      role: nextUser.role,
      active: true,
      avatarUrl: nextUser.avatarUrl || '',
    };
    rememberGoogleUserForAdmin(currentProfile);
    setManagedUsers((prev) => mergeManagedUsers([currentProfile], readLocalGoogleUsers(), prev, initialUsers));
    setView(role === 'client' && preferHomeForClient ? 'home' : role === 'client' ? 'myRequests' : 'admin');
    return true;
  };

  useEffect(() => {
    let cancelled = false;
    async function restoreGoogleSession() {
      if (!isSupabaseConfigured) return;
      try {
        const profile = await syncGoogleSessionProfile();
        if (!cancelled && profile) {
          applySessionProfile(profile, { preferHomeForClient: true });
          return;
        }
        const fallback = await buildProfileFromGoogleSession();
        if (fallback && !cancelled) applySessionProfile(fallback, { preferHomeForClient: true });
      } catch (error) {
        if (!cancelled) {
          console.warn('Sesión Google pendiente o no disponible:', error.message);
          const fallback = await buildProfileFromGoogleSession();
          if (fallback && !cancelled) applySessionProfile(fallback, { preferHomeForClient: true });
        }
      }
    }
    restoreGoogleSession();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase?.auth) return undefined;
    let syncing = false;
    const syncFromGoogle = async () => {
      if (syncing) return;
      syncing = true;
      try {
        const profile = await syncGoogleSessionProfile();
        if (profile) {
          applySessionProfile(profile, { preferHomeForClient: true });
          return;
        }
        const fallback = await buildProfileFromGoogleSession();
        if (fallback) applySessionProfile(fallback, { preferHomeForClient: true });
      } catch (error) {
        console.warn('No se pudo completar la sesión Google:', error.message);
        const fallback = await buildProfileFromGoogleSession();
        if (fallback) applySessionProfile(fallback, { preferHomeForClient: true });
      } finally {
        syncing = false;
      }
    };
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token && ['SIGNED_IN', 'TOKEN_REFRESHED', 'INITIAL_SESSION'].includes(event)) {
        setTimeout(syncFromGoogle, 0);
      }
      if (event === 'SIGNED_OUT') setUser(null);
    });
    return () => data?.subscription?.unsubscribe?.();
  }, []);

  useEffect(() => {
    const updateHeaderState = () => {
      setHeaderOnHero(view === 'home' && window.scrollY < Math.max(220, window.innerHeight * 0.72));
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);
    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, [view]);

  useEffect(() => {
    if (view === 'home' && pendingScrollId) {
      const timer = setTimeout(() => {
        document.getElementById(pendingScrollId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setPendingScrollId(null);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [view, pendingScrollId]);

  useEffect(() => {
    let cancelled = false;
    async function loadServices() {
      if (!isSupabaseConfigured) return;
      try {
        const remoteServices = await listServiceCatalog();
        if (!cancelled && remoteServices.length) setServices(remoteServices);
      } catch (error) {
        if (!cancelled) console.warn('Servicios en modo local:', error.message);
      }
    }
    loadServices();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadDigitalPortals() {
      if (!isSupabaseConfigured) return;
      try {
        const remotePortals = await listDigitalPortals();
        if (!cancelled && remotePortals.length) setDigitalPortals(remotePortals);
      } catch (error) {
        if (!cancelled) console.warn('Gobierno Digital Bolivia en modo local:', error.message);
      }
    }
    loadDigitalPortals();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadRequests() {
      if (!isSupabaseConfigured || !user) return;
      try {
        const remoteRequests = await listRequestsForRole(user.role);
        if (!cancelled) setRequests(remoteRequests);
      } catch (error) {
        if (!cancelled) console.warn('Solicitudes en modo local:', error.message);
      }
    }
    loadRequests();
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    async function loadSettingsAndUsers() {
      if (!isSupabaseConfigured) return;
      try {
        const remoteWhatsapp = await getAppSetting('whatsapp_number');
        if (!cancelled && remoteWhatsapp) setWhatsappNumber(remoteWhatsapp);
      } catch (error) {
        console.warn('Configuración WhatsApp en modo local:', error.message);
      }
      try {
        const remoteTools = parseRemoteTicTools(await getAppSetting('tic_tools'));
        const nextTools = remoteTools.length ? remoteTools : readLocalTicTools(initialTicTools);
        if (!cancelled) {
          setTicTools(nextTools);
          writeLocalTicTools(nextTools);
        }
      } catch (error) {
        if (!cancelled) setTicTools(readLocalTicTools(initialTicTools));
        console.warn('Herramientas TIC en modo local:', error.message);
      }
      try {
        const remoteUsers = await listProfiles();
        if (!cancelled) {
          const merged = mergeManagedUsers(remoteUsers, readLocalGoogleUsers(), initialUsers);
          writeLocalGoogleUsers(merged);
          setManagedUsers(merged);
        }
      } catch (error) {
        console.warn('Usuarios en modo local:', error.message);
      }
    }
    loadSettingsAndUsers();
    return () => { cancelled = true; };
  }, [user?.role, user?.email]);

  useEffect(() => {
    if (view !== 'home' && !pendingScrollId) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, pendingScrollId]);

  const loginWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return { ok: false, message: 'Acceso bloqueado: falta configurar Supabase en .env.local o en Netlify. Sin VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no puede iniciar Google.' };
    }
    try {
      await signInWithGoogle();
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message || 'No se pudo iniciar sesión con Google.' };
    }
  };

  const login = async (email, password = '', name = '') => {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '');

    const fail = (message) => {
      setUser(null);
      setSystemNote(message);
      return { ok: false, message };
    };

    if (!cleanEmail) return fail('Ingresa tu correo electrónico.');
    if (!cleanPassword) return fail('Ingresa tu contraseña. El acceso sin contraseña quedó bloqueado.');

    if (!isSupabaseConfigured) {
      return fail('Acceso bloqueado: Supabase no está configurado en esta versión. Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Netlify y vuelve a desplegar.');
    }

    try {
      const auth = await signInOrDemo(cleanEmail, cleanPassword);
      const profile = await getCurrentUserProfile();
      const isMasterAdminLogin = isMasterAdminEmail(cleanEmail);

      if (!profile && !isMasterAdminLogin) {
        return fail('Tu correo existe en Supabase Auth, pero no tiene perfil autorizado. Crea o vincula el registro en public.profiles.');
      }

      if (profile?.active === false) {
        return fail('Tu usuario está bloqueado o pendiente de autorización. Solicita habilitación al administrador.');
      }

      // Regla de emergencia controlada: el correo maestro solo entra como administrador
      // si primero superó la contraseña real de Supabase Auth. No existe acceso demo.
      const profileRole = ['admin', 'lawyer', 'client'].includes(profile?.role) ? profile.role : 'client';
      const role = isMasterAdminLogin ? 'admin' : profileRole;
      const fullName = profile?.full_name || name || roleLabels[role] || auth?.user?.email || cleanEmail;
      const nextUser = {
        email: profile?.email || auth?.user?.email || cleanEmail,
        role,
        name: fullName,
        phone: profile?.phone || '',
        avatarUrl: profile?.avatar_url || '',
        dbId: profile?.id || auth?.user?.id || '',
      };

      setSystemNote('');
      setUser(nextUser);
      setView(role === 'client' ? 'myRequests' : 'admin');
      return { ok: true };
    } catch (error) {
      return fail('Correo o contraseña incorrectos, o usuario no autorizado en Supabase.');
    }
  };

  const updateProfile = async ({ fullName, phone, avatarUrl }) => {
    const patch = {
      full_name: fullName || user?.name || user?.email,
      phone: phone || '',
    };
    if (avatarUrl !== undefined) patch.avatar_url = avatarUrl;
    const localUser = {
      ...user,
      name: patch.full_name,
      phone: patch.phone,
      avatarUrl: avatarUrl !== undefined ? avatarUrl : user?.avatarUrl,
    };
    setUser(localUser);
    setManagedUsers((prev) => prev.map((item) => item.email === user?.email ? { ...item, fullName: localUser.name, phone: localUser.phone, avatarUrl: localUser.avatarUrl } : item));
    if (!isSupabaseConfigured) return { ok: true, message: 'Perfil actualizado en pantalla. Configura Supabase para guardar en producción.' };
    try {
      const saved = await updateOwnProfile(patch);
      setUser((prev) => ({
        ...prev,
        name: saved.fullName,
        phone: saved.phone,
        avatarUrl: saved.avatarUrl || (avatarUrl !== undefined ? avatarUrl : prev?.avatarUrl),
      }));
      return { ok: true, message: saved.avatarUrl || avatarUrl === undefined ? 'Perfil actualizado correctamente.' : 'Perfil actualizado. La foto queda visible en pantalla; para guardarla permanentemente agrega la columna avatar_url en Supabase.' };
    } catch (error) {
      return { ok: false, message: `Perfil actualizado en pantalla, pendiente de Supabase: ${error.message}` };
    }
  };

  const logout = () => {
    if (isSupabaseConfigured) signOutCurrent().catch(() => null);
    setUser(null);
    setView('home');
  };

  const addRequest = async (service, selectedSubservices) => {
    const localRequest = buildNewRequest(service, selectedSubservices);
    setRequests((prev) => [localRequest, ...prev]);
    if (isSupabaseConfigured) {
      try {
        const saved = await createServiceRequest({ service, subservices: selectedSubservices, user });
        setRequests((prev) => prev.map((request) => request.id === localRequest.id ? saved : request));
      } catch (error) {
        setSystemNote(`Solicitud creada localmente, pero no se guardó en Supabase: ${error.message}`);
      }
    }
  };

  const deleteRequest = async (requestId) => {
    const found = requests.find((request) => request.id === requestId);
    setRequests((prev) => prev.filter((request) => request.id !== requestId));
    if (isSupabaseConfigured && found?.dbId) {
      try { await deleteServiceRequest(found.dbId); }
      catch (error) { setSystemNote(`La solicitud se quitó de pantalla, pero no se eliminó de Supabase: ${error.message}`); }
    }
  };

  const editRequestSubservices = async (requestId, nextSubservices) => {
    const found = requests.find((request) => request.id === requestId);
    setRequests((prev) => prev.map((request) => request.id === requestId ? { ...request, subservices: nextSubservices, updatedAt: new Date().toLocaleString('es-BO') } : request));
    if (isSupabaseConfigured && found?.dbId) {
      try {
        const saved = await updateServiceRequest(found.dbId, { subservices: nextSubservices, dbId: found.dbId });
        setRequests((prev) => prev.map((request) => request.id === requestId ? saved : request));
      } catch (error) {
        setSystemNote(`No se pudo actualizar subservicios en Supabase: ${error.message}`);
      }
    }
  };

  const isInternal = user?.role === 'admin' || user?.role === 'lawyer';

  if (isInternal) {
    return <AdminPanel user={user} requests={requests} setRequests={setRequests} services={services} setServices={setServices} portals={digitalPortals} setPortals={setDigitalPortals} ticTools={ticTools} setTicTools={setTicTools} managedUsers={managedUsers} setManagedUsers={setManagedUsers} whatsappNumber={whatsappNumber} setWhatsappNumber={setWhatsappNumber} logout={logout} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header view={view} activeNav={activeNav} setView={setView} user={user} logout={logout} goToSection={goToSection} openServicesGroup={openServicesGroup} transparent={view === 'home' && headerOnHero} />
      {view !== 'home' && <div className="h-[78px]" />}
      {view === 'home' && <Home goToSection={goToSection} openServicesGroup={openServicesGroup} setView={setView} services={services} user={user} portals={digitalPortals} ticTools={ticTools} addRequest={addRequest} whatsappNumber={whatsappNumber} />}
      {view === 'firdi' && <Home goToSection={goToSection} openServicesGroup={openServicesGroup} setView={setView} services={services} user={user} portals={digitalPortals} ticTools={ticTools} addRequest={addRequest} whatsappNumber={whatsappNumber} />}
      {view === 'agenda' && <Home goToSection={goToSection} openServicesGroup={openServicesGroup} setView={setView} services={services} user={user} portals={digitalPortals} ticTools={ticTools} addRequest={addRequest} whatsappNumber={whatsappNumber} />}
      {view === 'contact' && <Home goToSection={goToSection} openServicesGroup={openServicesGroup} setView={setView} services={services} user={user} portals={digitalPortals} ticTools={ticTools} addRequest={addRequest} whatsappNumber={whatsappNumber} />}
      {view === 'services' && <ServicesPage user={user} setView={setView} addRequest={addRequest} services={services} whatsappNumber={whatsappNumber} initialFilter={serviceViewFilter} />}
      {(view === 'register' || view === 'login') && <AuthPage type={view} loginWithGoogle={loginWithGoogle} setView={setView} />}
      {view === 'resetPassword' && <ResetPasswordPage setView={setView} />}
      {view === 'myRequests' && <MyRequests requests={requests} services={services} setView={setView} deleteRequest={deleteRequest} editRequestSubservices={editRequestSubservices} user={user} updateProfile={updateProfile} />}
    </div>
  );
}
