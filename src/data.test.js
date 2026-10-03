import { describe, expect, it } from 'vitest';
import { applyRequestPatch, baseRequests, buildEnumeratedServiceOptions, buildNewRequest, firdiSteps, getRoleFromEmail, portals, serviceGroups, services, validatePreviewData } from './data.js';

describe('Legal TIC web app data', () => {
  it('conserva los 6 pasos de FiRDi', () => {
    expect(firdiSteps).toHaveLength(6);
  });

  it('incluye servicios clave con imágenes reales', () => {
    expect(services.some((service) => service.name === 'HERENCIA Y TESTAMENTOS')).toBe(true);
    expect(services.some((service) => service.name.includes('FIRMA DIGITAL'))).toBe(true);
    expect(services.every((service) => service.image.startsWith('/assets/services/'))).toBe(true);
  });

  it('detecta roles por correo y redirige conceptualmente al destino correcto', () => {
    expect(getRoleFromEmail('admin@legaltic.bo')).toBe('admin');
    expect(getRoleFromEmail('abogado@legaltic.bo')).toBe('lawyer');
    expect(getRoleFromEmail('cliente@correo.com')).toBe('client');
  });

  it('mantiene la regla: solo administrador aprueba pago', () => {
    const adminCanApprove = getRoleFromEmail('admin@legaltic.bo') === 'admin';
    const lawyerCanApprove = getRoleFromEmail('abogado@legaltic.bo') === 'admin';
    expect(adminCanApprove).toBe(true);
    expect(lawyerCanApprove).toBe(false);
  });

  it('contempla solicitudes con pago, documentos y documento final', () => {
    expect(baseRequests[0].paymentReceipt).toBeTruthy();
    expect(baseRequests[0].requiredUploads).toContain('Carnet de identidad');
    expect(baseRequests.some((request) => request.finalDocument)).toBe(true);
  });

  it('crea nuevas solicitudes con documentos requeridos', () => {
    const request = buildNewRequest(services[0], ['Curso de uso de plataforma']);
    expect(request.state).toBe('Solicitud');
    expect(request.payment).toBe('Pendiente de comprobación');
    expect(request.requiredUploads).toContain('Comprobante de pago');
  });

  it('conserva exactamente los subservicios seleccionados por el cliente', () => {
    const selected = ['Aceptación de herencia', 'Certificado de defunción'];
    const service = services.find((item) => item.name === 'HERENCIA Y TESTAMENTOS');
    const request = buildNewRequest(service, selected);
    expect(request.subservices).toEqual(selected);
  });


  it('mantiene los grupos de acceso al catálogo público sin mostrarlo completo de entrada', () => {
    expect(serviceGroups.map((group) => group.id)).toEqual(['todos', 'personas', 'empresas', 'firdi']);
    expect(services.some((service) => service.group === 'personas')).toBe(true);
    expect(services.some((service) => service.group === 'empresas')).toBe(true);
    expect(services.some((service) => service.group === 'firdi')).toBe(true);
  });

  it('mantiene portales de Gobierno Electrónico con imágenes', () => {
    expect(portals.some((portal) => portal.title === 'CIUDADANÍA DIGITAL')).toBe(true);
    expect(portals.every((portal) => portal.image.startsWith('/assets/gov/'))).toBe(true);
    expect(portals.every((portal) => Object.prototype.hasOwnProperty.call(portal, 'url'))).toBe(true);
  });


  it('elimina el campo categoría visible de los servicios ofertados', () => {
    expect(services.every((service) => !Object.prototype.hasOwnProperty.call(service, 'category'))).toBe(true);
  });

  it('mantiene subservicios solicitables en todos los servicios editables', () => {
    expect(services.every((service) => Array.isArray(service.subservices))).toBe(true);
    expect(services.every((service) => service.subservices.length > 0)).toBe(true);
  });


  it('aplica acciones administrativas sobre la solicitud correcta', () => {
    const updated = applyRequestPatch(baseRequests, 'LT-002', { state: 'Concluido', finalDocument: 'documento-final.pdf' }, 'ahora');
    const target = updated.find((request) => request.id === 'LT-002');
    const untouched = updated.find((request) => request.id === 'LT-001');
    expect(target.state).toBe('Concluido');
    expect(target.finalDocument).toBe('documento-final.pdf');
    expect(target.updatedAt).toBe('ahora');
    expect(untouched.state).toBe('Solicitud');
  });


  it('enumera los servicios en el selector de contacto', () => {
    const options = buildEnumeratedServiceOptions(services.slice(0, 3));
    expect(options[0].label).toBe(`1. ${services[0].name}`);
    expect(options[1].label).toBe(`2. ${services[1].name}`);
    expect(options[2].value).toBe(services[2].name);
  });

  it('valida la integridad mínima del prototipo', () => {
    expect(validatePreviewData()).toBe(true);
  });
});
