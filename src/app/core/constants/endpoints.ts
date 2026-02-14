export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    social: {
      google: '/auth/social/google',
      twitter: '/auth/social/twitter',
      facebook: '/auth/social/facebook',
      apple: '/auth/social/apple'
    }
  },
  gastos: {
    base: '/gastos',
    paginated: '/gastos/paginados',
    byId: '/gastos/:id'
  },
  tarjetas: {
    credito: '/tarjetas/credito',
    debito: '/tarjetas/debito',
    creditoById: '/tarjetas/credito/:id',
    debitoById: '/tarjetas/debito/:id',
    resumenDashboard: '/tarjetas/credito/:id/resumen-dashboard'
  },
  cuotas: {
    pendientes: '/cuotas/pendientes',
    marcarPagada: '/cuotas/:id/pagar',
    resumenAnual: '/cuotas/resumen-anual',
    resumenMensual: '/cuotas/resumen-mensual'
  },
  categorias: {
    base: '/categorias',
    personalizadas: '/categorias/personalizadas',
    globales: '/categorias/globales',
    byId: '/categorias/:id'
  },
  bancos: {
    base: '/bancos'
  },
  reportes: {
    resumenMensual: '/reportes/resumen-mensual',
    resumenAnual: '/reportes/resumen-anual',
    totalesPorCategoria: '/reportes/totales-por-categoria',
    serieTemporal: '/reportes/serie-temporal'
  }
};
