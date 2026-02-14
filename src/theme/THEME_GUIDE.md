# Tema Tailwind - Aplicación de Gastos

Este documento describe el tema personalizado de Tailwind CSS para la aplicación de control de gastos de tarjetas de crédito.

## 🎨 Paleta de Colores

### Navy Blue (Azul Marino) - Color Principal
Perfecto para fondos, headers, y elementos corporativos.

```html
<!-- Ejemplos de uso -->
<div class="bg-navy-500 text-white">Botón Principal</div>
<div class="bg-navy-600 hover:bg-navy-700">Header</div>
<div class="text-navy-900 dark:text-navy-100">Texto</div>
```

**Escala completa:** `navy-50` a `navy-950`

### Emerald (Verde Esmeralda) - Ingresos/Positivos
Usado para mostrar ingresos, saldos positivos, confirmaciones.

```html
<!-- Ejemplos de uso -->
<div class="text-emerald-600">+$1,500.00</div>
<div class="bg-emerald-50 dark:bg-emerald-950 border-emerald-200">
  Pago recibido
</div>
```

**Escala completa:** `emerald-50` a `emerald-950`

### Amber (Naranja Ámbar) - Gastos/Advertencias
Para mostrar gastos normales y advertencias moderadas.

```html
<!-- Ejemplos de uso -->
<div class="text-amber-600">-$250.00</div>
<div class="bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
  Pago pendiente
</div>
```

**Escala completa:** `amber-50` a `amber-950`

### Crimson (Rojo Carmesí) - Deudas/Alertas
Para deudas, límites excedidos, y alertas críticas.

```html
<!-- Ejemplos de uso -->
<div class="text-crimson-600">Límite excedido</div>
<div class="bg-crimson-50 dark:bg-crimson-950 border-crimson-200">
  ¡Alerta de pago vencido!
</div>
```

**Escala completa:** `crimson-50` a `crimson-950`

### Neutral (Grises) - Elementos UI
Para textos, bordes, fondos secundarios.

```html
<!-- Ejemplos de uso -->
<div class="bg-neutral-100 dark:bg-neutral-900">Card</div>
<div class="text-neutral-600 dark:text-neutral-400">Texto secundario</div>
<div class="border-neutral-200 dark:border-neutral-800">Borde</div>
```

**Escala completa:** `neutral-50` a `neutral-950`

## 🎯 Colores Semánticos

### Backgrounds y Surfaces
```html
<div class="bg-background">Fondo principal</div>
<div class="bg-surface">Superficie (cards)</div>
<div class="bg-surface-variant">Superficie alternativa</div>
```

### Textos
```html
<h1 class="text-text-primary">Título principal</h1>
<p class="text-text-secondary">Texto secundario</p>
<span class="text-text-tertiary">Texto terciario</span>
```

### Bordes
```html
<div class="border border-border">Borde normal</div>
<div class="border border-border-variant">Borde alternativo</div>
```

## 🌓 Dark Mode

El tema se activa automáticamente agregando la clase `dark` al elemento raíz (html o body).

```typescript
// En tu app component o servicio de temas
toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

```html
<!-- Ionic dark mode integration -->
<ion-toggle (ionChange)="toggleDarkMode()">Modo Oscuro</ion-toggle>
```

## 📐 Tipografía

```html
<!-- Font families -->
<div class="font-sans">Inter (default)</div>
<div class="font-mono">JetBrains Mono (números/código)</div>

<!-- Font sizes con line-height optimizado -->
<p class="text-xs">Extra pequeño</p>
<p class="text-sm">Pequeño</p>
<p class="text-base">Normal</p>
<p class="text-lg">Grande</p>
<p class="text-xl">Extra grande</p>
<p class="text-2xl">2XL</p>
<p class="text-3xl">3XL</p>
<p class="text-4xl">4XL</p>
```

## 🔲 Border Radius

```html
<div class="rounded-sm">0.375rem</div>
<div class="rounded-md">0.5rem</div>
<div class="rounded-lg">0.75rem</div>
<div class="rounded-xl">1rem</div>
<div class="rounded-2xl">1.5rem</div>
```

## 💫 Sombras

```html
<div class="shadow-sm">Sombra pequeña</div>
<div class="shadow-md">Sombra mediana</div>
<div class="shadow-lg">Sombra grande</div>
<div class="shadow-xl">Sombra extra grande</div>
```

## 💳 Ejemplos de Componentes

### Tarjeta de Crédito
```html
<div class="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-6 shadow-xl text-white">
  <div class="font-mono text-sm mb-4">**** **** **** 4532</div>
  <div class="flex justify-between items-end">
    <div>
      <p class="text-xs text-navy-200">Saldo disponible</p>
      <p class="text-2xl font-bold">$15,240.00</p>
    </div>
    <div class="text-right">
      <p class="text-xs text-navy-200">Límite</p>
      <p class="text-sm">$20,000.00</p>
    </div>
  </div>
</div>
```

### Transacción (Gasto)
```html
<div class="bg-surface p-4 rounded-lg border border-border">
  <div class="flex justify-between items-center">
    <div>
      <p class="text-text-primary font-medium">Supermercado</p>
      <p class="text-text-tertiary text-sm">14 Feb 2026</p>
    </div>
    <div class="text-amber-600 font-mono font-semibold">
      -$125.50
    </div>
  </div>
</div>
```

### Transacción (Ingreso/Pago)
```html
<div class="bg-surface p-4 rounded-lg border border-border">
  <div class="flex justify-between items-center">
    <div>
      <p class="text-text-primary font-medium">Pago recibido</p>
      <p class="text-text-tertiary text-sm">14 Feb 2026</p>
    </div>
    <div class="text-emerald-600 font-mono font-semibold">
      +$1,500.00
    </div>
  </div>
</div>
```

### Alerta de Límite
```html
<div class="bg-crimson-50 dark:bg-crimson-950 border-l-4 border-crimson-600 p-4 rounded">
  <div class="flex items-start">
    <ion-icon name="warning" class="text-crimson-600 text-xl mr-3"></ion-icon>
    <div>
      <p class="text-crimson-900 dark:text-crimson-100 font-semibold">
        Límite de crédito superado
      </p>
      <p class="text-crimson-700 dark:text-crimson-300 text-sm mt-1">
        Has excedido tu límite en $240.00
      </p>
    </div>
  </div>
</div>
```

### Resumen de Gastos
```html
<div class="bg-surface-variant p-6 rounded-xl">
  <h3 class="text-text-secondary text-sm font-medium mb-4">Resumen del mes</h3>
  
  <div class="space-y-3">
    <div class="flex justify-between items-center">
      <span class="text-text-tertiary">Ingresos</span>
      <span class="text-emerald-600 font-semibold">+$4,200.00</span>
    </div>
    
    <div class="flex justify-between items-center">
      <span class="text-text-tertiary">Gastos</span>
      <span class="text-amber-600 font-semibold">-$2,850.00</span>
    </div>
    
    <div class="border-t border-border pt-3">
      <div class="flex justify-between items-center">
        <span class="text-text-primary font-medium">Balance</span>
        <span class="text-emerald-600 text-xl font-bold">+$1,350.00</span>
      </div>
    </div>
  </div>
</div>
```

## 🚀 Mejores Prácticas

1. **Usa colores semánticos** cuando sea posible (`bg-background`, `text-text-primary`) para mejor soporte de dark mode
2. **Emerald para positivos**, **amber para gastos normales**, **crimson para alertas**
3. **Navy para branding** y elementos corporativos
4. **Neutral para UI** genérica (textos, bordes, fondos secundarios)
5. **Font-mono para números** financieros para mejor legibilidad
6. **Usa las escalas completas** (50-950) para variaciones sutiles

## 🎨 Generador de Gradientes

```html
<!-- Degradados profesionales -->
<div class="bg-gradient-to-r from-navy-600 to-navy-800">Navy</div>
<div class="bg-gradient-to-br from-emerald-500 to-emerald-700">Emerald</div>
<div class="bg-gradient-to-tr from-amber-400 to-amber-600">Amber</div>
```
