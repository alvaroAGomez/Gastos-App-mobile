export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/auth/profile',
    // social auth (pendiente de implementación en backend):
    social: {
      google: '/auth/social/google',
      facebook: '/auth/social/facebook',
      apple: '/auth/social/apple',
      twitter: '/auth/social/twitter',
    },
  },

  gastos: {
    base: '/gastos',
    dashboard: '/gastos/dashboard',
    // byId no existe en el backend actual (pendiente):
    // byId: '/gastos/:id',
    materializarDebito: '/gastos/materializar-debito/:debitoConfigId',
  },

  tarjetas: {
    // Tarjeta Crédito (backend: /tarjetas-credito)
    credito: '/tarjetas-credito',
    creditoById: '/tarjetas-credito/:id',
    detalleDashboard: '/tarjetas-credito/:id/detalle-dashboard',
    cuotasPendientes: '/tarjetas-credito/:id/cuotas-pendientes',
    proyeccion12Meses: '/tarjetas-credito/:id/proyeccion-12-meses',
    // Débito (pendiente de implementación en backend):
    debito: '/tarjetas-debito',
    debitoById: '/tarjetas-debito/:id',
  },

  categorias: {
    // backend prefix: /categoria (singular)
    base: '/categoria',
    usuario: '/categoria/usuario',
    globales: '/categoria/globales',
    byId: '/categoria/:id',
  },

  bancos: {
    base: '/bancos',
    byId: '/bancos/:id',
  },

  dashboard: {
    resumenFinanciero: '/dashboard/resumen-financiero',
    tarjetas: '/dashboard/tarjetas',
  },

  reportes: {
    gastoPorCategoria: '/reportes/gasto-por-categoria',
    actualVsFuturo: '/reportes/actual-vs-futuro',
    evolucionGastos: '/reportes/evolucion-gastos',
    gastoPorTarjeta: '/reportes/gasto-por-tarjeta',
  },

  debitosAutomaticos: {
    base: '/debitos-automaticos',
    byId: '/debitos-automaticos/:id',
    desactivar: '/debitos-automaticos/:id/desactivar',
  },
};
