"""
Helper script to generate Ionic page boilerplate code for feature modules.
This script generates the page.ts, page.html, page.scss, page.module.ts, and page-routing.module.ts files.
"""

import os

# Configuración base
BASE_PATH = r"f:\Desarrollos\mobile\GastosAppMobile\src\app\features"

# Definición de páginas a crear
PAGES_TO_CREATE = [
    # Reportes module pages
    {
        "module": "reportes",
        "page_name": "reporte-gastos-mensuales",
        "component_name": "ReporteGastosMensualesPage",
        "title": "Gastos Mensuales",
        "description": "Reporte de gastos mensuales con gráfico de barras"
    },
    {
        "module": "reportes",
        "page_name": "reporte-por-categoria",
        "component_name": "ReportePorCategoriaPage",
        "title": "Reporte por Categoría",
        "description": "Distribución de gastos por categoría"
    },
    {
        "module": "reportes",
        "page_name": "reporte-por-tarjeta",
        "component_name": "ReportePorTarjetaPage",
        "title": "Reporte por Tarjeta",
        "description": "Distribución de gastos por tarjeta"
    },
    # Gastos module pages
    {
        "module": "gastos",
        "page_name": "gastos-listado",
        "component_name": "GastosListadoPage",
        "title": "Gastos",
        "description": "Listado de gastos con filtros"
    },
    {
        "module": "gastos",
        "page_name": "gasto-form",
        "component_name": "GastoFormPage",
        "title": "Gasto",
        "description": "Formulario para crear/editar gasto"
    },
    {
        "module": "gastos",
        "page_name": "gasto-detalle",
        "component_name": "GastoDetallePage",
        "title": "Detalle de Gasto",
        "description": "Detalle completo del gasto"
    },
    # Tarjetas module pages
    {
        "module": "tarjetas",
        "page_name": "tarjetas-home",
        "component_name": "TarjetasHomePage",
        "title": "Tarjetas",
        "description": "Gestión de tarjetas de crédito y débito"
    },
    {
        "module": "tarjetas",
        "page_name": "tarjeta-credito-form",
        "component_name": "TarjetaCreditoFormPage",
        "title": "Tarjeta de Crédito",
        "description": "Formulario de tarjeta de crédito"
    },
    {
        "module": "tarjetas",
        "page_name": "tarjeta-debito-form",
        "component_name": "TarjetaDebitoFormPage",
        "title": "Tarjeta de Débito",
        "description": "Formulario de tarjeta de débito"
    },
    {
        "module": "tarjetas",
        "page_name": "tarjeta-credito-detalle",
        "component_name": "TarjetaCreditoDetallePage",
        "title": "Detalle de Tarjeta",
        "description": "Detalle de tarjeta de crédito"
    },
]

def create_page_ts(component_name, title):
    return f"""import {{ Component, OnInit }} from '@angular/core';

@Component({{
  selector: 'app-{component_name.lower().replace("page", "")}',
  templateUrl: './{component_name.lower().replace("page", "")}.page.html',
  styleUrls: ['./{component_name.lower().replace("page", "")}.page.scss']
}})
export class {component_name} implements OnInit {{
  constructor() {{}}

  ngOnInit() {{
    // TODO: Implement
  }}
}}
"""

SCRIPT_INFO = f"""
Este script fue creado para ayudar a generar el boilerplate de las páginas.
Total de páginas a crear: {len(PAGES_TO_CREATE)}

Módulos:
- reportes: 3 páginas
- gastos: 3 páginas
- tarjetas: 4 páginas
- cuotas: 2 páginas (no incluidas aquí)
- categorias: 2 páginas (no incluidas aquí)
- bancos: 1 página (no incluida aquí)
- perfil: 1 página (no incluida aquí)

Este es un archivo de referencia. Las páginas se crean manualmente usando write_to_file.
"""

print(SCRIPT_INFO)
