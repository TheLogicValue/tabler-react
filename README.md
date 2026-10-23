# Tabler React

Última actualización: **23/10/2026**. Versión de la biblioteca: **2.0.0**, según el campo `version` de [package.json](./package.json).

> React implementation of the [Tabler Dashboard UI Kit](https://github.com/tabler/tabler)

[![Versión de package.json](https://img.shields.io/badge/version-2.0.0-blue)](./package.json) ![Tipos en las fuentes](https://img.shields.io/badge/source%20types-Flow-green.svg)

## Install

There's no package of this Fork. If you want to try it type:
```npm install thelogicvalue/tabler-react```

## Example

```jsx
import React, { Component } from "react";

import "tabler-react/style.css";

import { Card, Button } from "tabler-react";

class MyCard extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Button color="primary">A Button</Button>
        </Card.Body>
      </Card>
    );
  }
}
```

For more examples and documentation see the [demo website](https://thelogicvalue.github.io/tabler-react)

## Setup

Use Node.js `^20.19.0 || ^22.13.0 || >=24` and npm 11.

1. Clone this repository.
2. Run `npm ci` in the root folder to install the versions in `package-lock.json`.
3. Run `npm run build` to compile the component library, or `npm start` to rebuild it when source files change.

Use `npm install` when intentionally adding or updating dependencies, and commit the updated `package-lock.json`.
The repository's `.npmrc` enables `legacy-peer-deps` because the ESLint plugins still declare ESLint up to 9. This setting applies to development in this repository; consuming projects keep their own npm configuration. The demo installs without this setting.

The build uses Vite in library mode with `src/index.js` as its only entry point.
Babel compiles the existing JavaScript, JSX and Flow annotations; this stage does not migrate the source to TypeScript.

La configuración de Babel utilizada por la compilación está en `vite.config.mjs`; se ha retirado el antiguo `.babelrc` y el script de copia de fuentes Flow. Se conservan las anotaciones de las fuentes, `@babel/preset-flow`, Hermes y las definiciones de `flow-typed`. El helper opcional `scripts/runflow` requiere una instalación de Flow y no forma parte del build ni de `npm test`. La compilación no publica declaraciones `.js.flow` ni `.d.ts`.

The published package keeps these entry points:

- `dist/index.js`: CommonJS (`require('tabler-react')`).
- `dist/index.es.js`: ES modules (`import { Card } from 'tabler-react'`).
- `dist/style.css`: styles (`import 'tabler-react/style.css'`).
- `dist/fonts/feather/`: font assets referenced by the stylesheet.

JavaScript source maps are generated. Vite's CSS extraction does not emit the previous `style.css.map` file.
React, React DOM and all other peer dependencies (including their subpaths) stay external and must be provided by the consuming project.
The `files` allowlist publishes only `dist`; the separate `demo/` app stays outside the library build and package.

La biblioteca mantiene `echarts-for-react` como dependencia externa del bundle: npm la instala junto con la biblioteca y el empaquetador del consumidor puede procesarla y dividirla. Las rutas públicas y los componentes de gráficos conservan su API.

## Laboratorio Tabler: demo de integración

Laboratorio Tabler (`demo/`) es un consumidor independiente con React 19, React Router 7, Vite 7 y AG Grid Community 32. Incluye ejemplos de los componentes más utilizados en un consumidor de referencia. No necesita una API, datos reales ni licencia de AG Grid Enterprise.

Desde la raíz, prepara la biblioteca y las dependencias de la demo:

```sh
# 1. Genera los archivos que consume la demo (dist/ de la biblioteca).
npm run build

# 2. Instala las dependencias propias de la demo; se hace la primera vez
#    y cuando cambie demo/package.json o demo/package-lock.json.
npm --prefix demo ci

# 3. Arranca la demo y mantén esta terminal abierta.
npm --prefix demo run dev
```

Abre `http://127.0.0.1:5174`. Para recompilar la biblioteca mientras editas componentes, ejecuta `npm start` en otra terminal. La demo importa `dist/index.es.js` y `dist/style.css` mediante sus nombres públicos; no importa el código Flow de `src`.

Para probar cambios en componentes, abre una segunda terminal en la raíz:

```sh
# Reconstruye la biblioteca cada vez que cambies sus fuentes.
# La demo abierta lee el nuevo dist/; si es necesario, recarga el navegador.
npm start
```

La demo mantiene su propio `package.json` y `package-lock.json`. Ya no necesita `.npmrc` ni `legacy-peer-deps`. Su compilación y previsualización son independientes:

```sh
# Genera solo demo/dist/. No modifica el dist/ de la biblioteca.
npm --prefix demo run build

# Sirve esa compilación en http://127.0.0.1:5174.
# Detén antes el servidor dev con Ctrl+C, porque utilizan el mismo puerto.
npm --prefix demo run preview
```

`npm run build` en la raíz sigue compilando únicamente la biblioteca. La demo no entra en el paquete publicado.

Las vistas de la demo permiten probar:

- **Resumen:** Page, Grid, Card, Text, Icon y navegación con NavBarMenu.
- **Menú principal:** NavBarMenu muestra «Resumen», el desplegable «Componentes» y los enlaces directos «Gráficos y estados» y «Cobertura de componentes». Abre «Componentes» con ratón, Intro o Espacio; selecciona una página y comprueba el enlace activo, Escape y clic fuera. El submenú utiliza el mismo posicionamiento de Floating UI que Dropdown.
- **Tablas y datos:** AGGridTable con Community: búsqueda, filtros, ordenación, paginación, selección y CSV; comparación con Table. Activa y desactiva «Mostrar ayuda en las cabeceras» y pasa el ratón por un título para comprobar los tooltips sin recargar la tabla.
- **Formularios y fechas:** Form, react-select, DatePicker, referencia de fecha, validación y restablecimiento. En «Fecha inicial y días anteriores», cambia el desplazamiento y pulsa «Restablecer fecha»: por defecto muestra 14/10/2026, con 0 días muestra 15/10/2026 y con 3 días muestra 12/10/2026.
- **Interacciones:** Modal/useModal, Tabs/Tab/useTabs, Dropdown, Accordion y ProtectedRoute con Outlet y redirección. En «Controles de tarjeta y cabecera», prueba plegar, maximizar, cerrar y restaurar la tarjeta; abre el desplegable con Intro o Espacio. Por debajo de 992 px aparece el botón de navegación de Site.Header. Comprueba que todos estos controles mantienen a cero los envíos del formulario.
- **Posicionamiento, dentro de Interacciones:** Dropdown, Button.Dropdown, disparador personalizado, Nav horizontal/vertical y Tooltip. Cambia entre las quince posiciones, incluidas `auto`, `auto-start` y `auto-end`; comprueba Escape, clic fuera, scroll y redimensionado. Las ayudas se abren con ratón y foco, conservan `aria-describedby` y orientan la flecha según la posición final.
- **Documentación y pantalla de carga, dentro de Interacciones:** ModalDoc permite abrir una guía con dos pestañas o una sola sección, confirmar la lectura y cerrar con X o Escape. ModalSplash muestra una imagen local y su animación; prueba el cierre manual, Escape y el cierre automático a los tres segundos. El resultado de cada acción aparece en la página.
- **Gráficos y estados:** LineChart, BarChart, PieChart y RadarChart. Cambia el periodo para actualizar el perfil de cinco dimensiones y los valores comparados de DoubleCard; prueba las leyendas y tooltips. El estado «Cargando» incluye TableLoader, PieChartLoader, LoaderZone y Spinner; también hay ejemplos de vacío y reintento de error simulado.
- **Cobertura de componentes:** los 32 componentes y hooks del inventario tienen ejemplos. La tabla incluye enlaces «Ver ejemplo» y un guion para repetir las comprobaciones; indica presencia en la demo, sin certificar todas las variantes de cada componente.

El inventario `demo/src/usage.json` cuenta archivos de producción que importan cada componente en un consumidor de referencia, excluyendo tests; no mide ejecuciones ni frecuencia real de uso. Para regenerarlo desde cualquier consumidor local:

```sh
node demo/scripts/scan-usage.mjs <ruta-al-src-del-consumidor>
```

La cobertura de un componente en la demo no certifica todas sus variantes ni sustituye las pruebas funcionales del consumidor. Los errores reales de renderizado se muestran en pantalla; el error de carga de la vista de gráficos es intencional.

La demo configura un motor modular de ECharts para los componentes LineChart, BarChart, PieChart, DoughnutChart y RadarChart. Esta configuración pertenece al consumidor de ejemplo; la biblioteca publicada conserva su dependencia normal de `echarts-for-react`.

La compilación separa React, ECharts y su renderer para permitir su caché independiente. AG Grid 32 se distribuye como un módulo generado grande: queda aislado en `vendor-ag-grid` y se carga al entrar en «Tablas y datos». `demo/scripts/bundle-budget.mjs` hace fallar la compilación si cualquier archivo JavaScript supera 500 kB, con una excepción explícita de 1 MB para ese único vendor. El umbral general de aviso de Vite se ajusta a esa excepción; el resto de archivos sigue sujeto al presupuesto más estricto. La demo descarta únicamente el aviso de directiva `use client` de React Router, que no se aplica a esta SPA de cliente.

El CSS publicado ya no contiene el hack antiguo `*display`. Las rutas de imágenes heredadas de la hoja principal están desactivadas y las fuentes locales se comprueban después de compilar mediante `npm test`.

## Migración de Popper a Floating UI

La biblioteca utiliza `@floating-ui/react` para el posicionamiento de Dropdown, Dropdown.Trigger, Dropdown.Menu, Button.Dropdown, Nav.Item, NavBarMenu, Tooltip y DatePicker. Se mantienen los componentes públicos, sus propiedades y la compatibilidad con React 18 y React 19. Floating UI es una dependencia interna; los consumidores no necesitan añadirla como peer ni instalar `react-popper` o `@popperjs/core` para usar estos componentes.

El plan se realiza por etapas:

1. Comprobar la compilación y el lint de partida.
2. Centralizar el posicionamiento en `src/helpers/Floating.react.js`, con referencias independientes, ajuste a bordes y actualización al hacer scroll o redimensionar. Las posiciones `auto` utilizan `autoPlacement` y las posiciones explícitas utilizan `flip`.
3. Adaptar juntos los desplegables y los submenús de navegación, conservando los menús verticales en el flujo de la página.
4. Adaptar Tooltip y DatePicker. Mantener la gestión de foco del calendario y orientar las flechas de la ayuda según la posición resuelta.
5. Retirar las dependencias de Popper y actualizar ambos locks. Retirar la excepción de instalación de la demo; la raíz la conserva por los conflictos de peers indicados en Setup.
6. Validar con las pruebas de interacción, la demo y un consumidor aislado con React 18. Antes de publicar, repetir los flujos propios de cada proyecto consumidor.

Para repetir las comprobaciones:

```sh
# Compila y ejecuta las pruebas de componentes, interacciones y assets con React 19.
npm test

# Comprueba biblioteca, pruebas, scripts y demo.
npm run lint
npm run lint:demo
npm --prefix demo run build

# Compila, empaqueta e instala en un consumidor temporal con React 18.3.1.
# Necesita acceso a npm; no cambia las dependencias de la raíz ni de la demo.
npm run test:react18
```

Las pruebas DOM verifican apertura, cierre, callbacks, referencias, las quince posiciones aceptadas y el foco del calendario en React 18 y 19. El entorno DOM simula los rectángulos para probar el foco; la geometría real, las flechas y el ajuste a bordes se comprueban en la demo del navegador. Esta migración no introduce navegación completa de menús con flechas ni portales: esas mejoras se pueden incorporar después mediante las utilidades de Floating UI, sin mezclar cambios de API con la sustitución del motor.

## Calendario y compatibilidad de fechas

DatePicker utiliza `react-day-picker` 10 y `date-fns` 4. Se conservan las propiedades `date`, `dateIni`, `today`, `previousDay`, `lastDate`, `isHistoric`, `disabled`, `fromMonth` y `toMonth`, además de la referencia pública `value`/`reset` y el formato de entrada `dd/MM/yyyy`.

El wrapper traduce `fromMonth`/`toMonth` a los límites de navegación nuevos y utiliza el foco automático de DayPicker 10. Las fechas se mantienen en la zona local, como en DayPicker 8; no se fuerza un desfase fijo de UTC. El restablecimiento actualiza el campo y la selección del calendario.

En modo histórico, el límite predeterminado es el día actual en la zona local, inclusive; `dateIni`, `today` y `previousDay` siguen controlando la fecha inicial, sin adelantar ese límite al día anterior. El límite se actualiza al pasar la medianoche con la página abierta. `lastDate` conserva su prioridad para establecer un límite explícito y el modo futuro mantiene su límite inferior. Los matchers `disabled` explícitos conservan su prioridad sobre el modo histórico/futuro.

El calendario, la escritura manual y la referencia pública validan las mismas fechas. Un texto no permitido se mantiene visible para poder corregirlo, muestra un mensaje accesible y activa la validación nativa del campo. En ese caso `ref.current.value` devuelve `Invalid Date`, igual que para una fecha inexistente; el consumidor puede comprobarlo con `Number.isNaN(value.getTime())`. `reset()` restablece la fecha inicial y vuelve a validarla con las restricciones vigentes.

En «Formularios y fechas», el ejemplo «Límites y días deshabilitados» permite probar histórico y futuro con límite inclusivo, fines de semana y todos los días deshabilitados. Las pruebas de interacción se ejecutan también con React 18 y una instalación del paquete sin ignorar los peers.

DayPicker 10 cambia su HTML, las clases internas `.rdp-*` y algunas propiedades avanzadas que antes se pasaban directamente al calendario. Los consumidores que personalicen esos detalles deben revisar la [guía de migración oficial](https://daypicker.dev/upgrading-v8-to-v10). Las propiedades propias de DatePicker indicadas arriba se mantienen.

## Lint

`npm run lint` analiza la biblioteca, las pruebas, los scripts `.mjs` y sus configuraciones; `npm run lint:demo` analiza la demo. ESLint 10 usa `eslint.config.mjs` en formato plano; Hermes analiza el código Flow sin cambiar Babel ni el formato publicado de los componentes.
Los plugins de React y accesibilidad utilizan el adaptador oficial `@eslint/compat`, ya que todavía no declaran soporte nativo para ESLint 10. Las reglas de hooks comprueban su uso y las dependencias de los efectos.

Para compilar y ejecutar las pruebas de regresión de componentes, posicionamiento, foco y assets, usa `npm test` desde la raíz.

## Deploy

The `prepare` script builds the library before packaging. Run `npm run build` to generate the artifacts locally. Both the library and demo use npm with independent `package-lock.json` files.


## License

MIT © [thelogicvalue](https://github.com/thelogicvalue), [jonthomp](https://github.com/jonthomp), [AaronCoplan](https://github.com/AaronCoplan) and [the contributors](https://github.com/tabler/tabler-react/graphs/contributors).
