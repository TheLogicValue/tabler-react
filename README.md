# Tabler React

Última actualización: **23/10/2026**. Versión de la biblioteca: **2.0.0**, según el campo `version` de [package.json](./package.json).

> React implementation of the [Tabler Dashboard UI Kit](https://github.com/tabler/tabler)

[![Versión de package.json](https://img.shields.io/badge/version-2.0.0-blue)](./package.json) ![Tipos en las fuentes](https://img.shields.io/badge/source%20types-Flow%20%2B%20TypeScript-green.svg)

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

Para desarrollar, compilar y ejecutar las comprobaciones de la biblioteca y la demo:

- **Node.js:** `^20.19.0 || ^22.13.0 || >=24.0.0`, según los requisitos combinados de Vite y ESLint. Se recomienda Node 24.x; la revisión actual se ha ejecutado con 24.22.1.
- **npm recomendado:** 11.x. El campo `packageManager` indica 11.19.0 como versión de referencia; se admiten otras versiones 11.x, incluida 11.17.0, utilizada en esta revisión.

Ambos `package.json` declaran estos requisitos en `devEngines`. npm los comprueba al instalar o ejecutar scripts desde cada proyecto: una versión incompatible de Node detiene la operación y otra versión de npm genera un aviso, sin bloquearla únicamente por ese motivo. Los requisitos se aplican al trabajo sobre las fuentes, incluidas las instalaciones desde Git que ejecutan `prepare`. El paquete ya compilado no añade una restricción `engines` a los consumidores; cada aplicación mantiene los requisitos de sus propias herramientas y dependencias.

```sh
# Comprueba las herramientas antes de instalar.
node --version
npm --version

# Instala exactamente las dependencias del lock y compila la biblioteca.
# npm ci ejecuta prepare, que también genera dist/.
npm ci

# Recompila después de modificar las fuentes.
npm run build

# O mantén la compilación en modo watch.
npm start
```

Usa `npm install` para añadir o actualizar dependencias y guarda el `package-lock.json` correspondiente. La biblioteca y la demo mantienen instalaciones y locks independientes.

El `.npmrc` de la raíz activa `legacy-peer-deps` porque los plugins de ESLint todavía declaran compatibilidad hasta ESLint 9. Esta excepción se conserva para el desarrollo de la biblioteca; los consumidores mantienen su configuración de npm y la demo se instala sin esa excepción.

The build uses Vite in library mode with `src/index.js` as its only entry point.
Babel compiles JavaScript/JSX with Flow and the migrated TypeScript/TSX files. The parser is selected by file extension; each file uses one type syntax.

La configuración de Babel utilizada por la compilación está en `vite.config.mjs`; se ha retirado el antiguo `.babelrc` y el script de copia de fuentes Flow. Badge y la familia Grid están en TypeScript; se conservan `@babel/preset-flow`, Hermes y `flow-typed` para las familias pendientes. El helper opcional `scripts/runflow` requiere una instalación de Flow y no forma parte del build ni de `npm test`; no se utiliza como verificación del árbol mixto. La compilación no publica todavía declaraciones `.js.flow` ni `.d.ts`. El alcance de esta transición se explica en «Migración gradual de Flow a TypeScript».

Los scripts y configuraciones conservados tienen estas funciones:

- `vite.config.mjs`: compila la biblioteca, elimina las anotaciones Flow o TypeScript según la extensión y genera los formatos ESM y CommonJS, el CSS y las fuentes.
- `tsconfig.json`: comprueba estrictamente las fuentes `.ts`/`.tsx` migradas y los contratos de `tests/types/`, sin emitir archivos.
- `demo/vite.config.mjs`: compila y sirve únicamente la demo; incluye el presupuesto de bundles de `demo/scripts/bundle-budget.mjs`.
- `eslint.config.mjs`: configura el lint de la biblioteca, la demo, las pruebas y los scripts JavaScript.
- `scripts/test-react18.mjs`: empaqueta la biblioteca y ejecuta las pruebas en un consumidor temporal con React 18; se invoca con `npm run test:react18`.
- `demo/scripts/scan-usage.mjs`: regenera manualmente el inventario de componentes a partir de un consumidor; su comando se muestra en la sección de la demo.
- `demo/scripts/scan-exports.mjs`: genera el catálogo completo de exports públicos de la biblioteca para la cobertura de la demo; `--check` comprueba que está actualizado. Comparte con la documentación el parser y la resolución de `.js`, `.jsx`, `.ts` y `.tsx` de `demo/scripts/source-parser.mjs`.
- `demo/scripts/generate-docs.mjs` y `demo/scripts/docs-source.mjs`: generan y comprueban las fichas de documentación a partir de las guías y la API de las fuentes.
- `scripts/runflow` y `.flowconfig`: soporte opcional de Flow, separado de las comprobaciones habituales. No se considera una validación automática de tipos.
- `.editorconfig` y `.gitignore`: formato de archivos y exclusiones del repositorio. El `.npmrc` de desarrollo se mantiene versionado deliberadamente.

Se han retirado los scripts Python `generateindex.py`, `propscheck.py` y su helper `repoutils.py`, que no tenían llamadas desde los comandos ni la documentación actuales y conservaban lógica del antiguo árbol `example/`. También se ha retirado `src/styles.css`, una hoja de prueba que no se importaba. La biblioteca no necesita Python ni Yarn para instalarse, compilarse o probarse.

The published package keeps these entry points:

- `dist/index.js`: CommonJS (`require('tabler-react')`).
- `dist/index.es.js`: ES modules (`import { Card } from 'tabler-react'`).
- `dist/style.css`: styles (`import 'tabler-react/style.css'`).
- `dist/fonts/feather/`: font assets referenced by the stylesheet.

Se conserva `jsnext:main` como alias heredado de la misma entrada ESM indicada por `module` y `exports`; retirarlo no es necesario para utilizar Vite. `src/Tabler.RTL.css` se conserva como fuente heredada, pero la compilación actual no la publica ni ofrece una entrada RTL; consulta [el estado de RTL](./docs/RTL.md).

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
- **Menú principal:** NavBarMenu muestra «Resumen», el desplegable «Componentes» y los enlaces directos «Gráficos y estados», «Documentación» y «Cobertura de componentes». Abre «Componentes» con ratón, Intro o Espacio; selecciona una página y comprueba el enlace activo, Escape y clic fuera. El submenú utiliza el mismo posicionamiento de Floating UI que Dropdown.
- **Tablas y datos:** AGGridTable con Community: búsqueda, filtros, ordenación, paginación, selección y CSV; comparación con Table. Activa y desactiva «Mostrar ayuda en las cabeceras» y pasa el ratón por un título para comprobar los tooltips sin recargar la tabla. En «Cartera editable y fila de totales», edita los pesos con doble clic e Intro y comprueba el total fijado, las columnas agrupadas, la ordenación opcional y la consulta mediante referencia. Las dos tarjetas de selección permiten buscar y seleccionar varios fondos de forma independiente: limpiar una tabla debe conservar el filtro y la selección de la otra. Prueba también el botón externo con el interno oculto; los envíos del formulario deben permanecer a cero.
- **Formularios y fechas:** Form, react-select, DatePicker, referencia de fecha, validación y restablecimiento. En «Fecha inicial y días anteriores», cambia el desplazamiento y pulsa «Restablecer fecha»: por defecto muestra 14/10/2026, con 0 días muestra 15/10/2026 y con 3 días muestra 12/10/2026.
- **Interacciones:** Modal/useModal, Tabs/Tab/useTabs, Dropdown, Accordion y ProtectedRoute con Outlet y redirección. En «Controles de tarjeta y cabecera», prueba plegar, maximizar, cerrar y restaurar la tarjeta; abre el desplegable con Intro o Espacio. Por debajo de 992 px aparece el botón de navegación de Site.Header. Comprueba que todos estos controles mantienen a cero los envíos del formulario.
- **Posicionamiento, dentro de Interacciones:** Dropdown, Button.Dropdown, disparador personalizado, Nav horizontal/vertical y Tooltip. Cambia entre las quince posiciones, incluidas `auto`, `auto-start` y `auto-end`; comprueba Escape, clic fuera, scroll y redimensionado. Las ayudas se abren con ratón y foco, conservan `aria-describedby` y orientan la flecha según la posición final.
- **Documentación y pantalla de carga, dentro de Interacciones:** ModalDoc permite abrir una guía con dos pestañas o una sola sección, confirmar la lectura y cerrar con X o Escape. ModalSplash muestra una imagen local y su animación; prueba el cierre manual, Escape y el cierre automático a los tres segundos. El resultado de cada acción aparece en la página.
- **Gráficos y estados:** LineChart, BarChart, PieChart y RadarChart. Cambia el periodo para actualizar el perfil de cinco dimensiones y los valores comparados de DoubleCard; prueba las leyendas y tooltips. El estado «Cargando» incluye TableLoader, PieChartLoader, LoaderZone y Spinner; también hay ejemplos de vacío y reintento de error simulado.
- **Documentación:** fichas de uso y API para los 90 exports públicos, con búsqueda por nombre, código copiable y acceso a los ejemplos visuales disponibles. Consulta el detalle en la sección siguiente.
- **Cobertura de componentes:** el catálogo incluye todos los exports públicos de la biblioteca: componentes, plantillas, proveedor, hooks y utilidades. Cada entrada indica «Con ejemplo» o «Sin cubrir» y, por separado, si tiene guía y API; puedes buscar por nombre y filtrar por ambos estados. «Ver ficha» abre la documentación, mientras que «Ver ejemplo» aparece únicamente cuando existe una demostración. Los subcomponentes, como Card.Header o Grid.Col, se agrupan bajo el componente principal; su presencia no certifica todas las variantes.

El inventario `demo/src/usage.json` cuenta archivos de producción que importan cada componente en un consumidor de referencia, excluyendo tests; no mide ejecuciones ni frecuencia real de uso. Para regenerarlo desde cualquier consumidor local:

```sh
node demo/scripts/scan-usage.mjs <ruta-al-src-del-consumidor>
```

Ese inventario de uso es una muestra independiente del catálogo completo. `demo/src/library-exports.json` se genera recorriendo las exportaciones de valor de `src/index.js` y sus barrels; excluye los tipos Flow y TypeScript, que no existen en el paquete JavaScript. Para actualizarlo después de añadir o retirar un export público:

```sh
npm run demo:inventory

# Comprueba el catálogo sin modificarlo; también se ejecuta en npm run check.
npm run demo:inventory:check
```

Los enlaces de ejemplo se mantienen en `demo/src/data.js` únicamente cuando existe una demostración. Añadir un nombre al catálogo no lo marca como cubierto. La columna de archivos de referencia tampoco determina su cobertura.

La cobertura de un componente en la demo no certifica todas sus variantes ni sustituye las pruebas funcionales del consumidor. Los errores reales de renderizado se muestran en pantalla; el error de carga de la vista de gráficos es intencional.

La demo configura un motor modular de ECharts para los componentes LineChart, BarChart, PieChart, DoughnutChart y RadarChart. Esta configuración pertenece al consumidor de ejemplo; la biblioteca publicada conserva su dependencia normal de `echarts-for-react`.

La compilación separa React, ECharts y su renderer para permitir su caché independiente. AG Grid 32 se distribuye como un módulo generado grande: queda aislado en `vendor-ag-grid` y se carga al entrar en «Tablas y datos». `demo/scripts/bundle-budget.mjs` hace fallar la compilación si cualquier archivo JavaScript supera 500 kB, con una excepción explícita de 1 MB para ese único vendor. El umbral general de aviso de Vite se ajusta a esa excepción; el resto de archivos sigue sujeto al presupuesto más estricto. La demo descarta únicamente el aviso de directiva `use client` de React Router, que no se aplica a esta SPA de cliente.

El CSS publicado ya no contiene el hack antiguo `*display`. Las rutas de imágenes heredadas de la hoja principal están desactivadas y las fuentes locales se comprueban después de compilar mediante `npm test`.

## Fichas de documentación de componentes

Con la demo arrancada, abre **Documentación** en el menú principal o entra en `http://127.0.0.1:5174/#/documentacion`. También puedes pulsar **Ver ficha** en cualquier fila de «Cobertura de componentes». Cada ficha tiene su propia dirección; por ejemplo, `http://127.0.0.1:5174/#/documentacion/DatePicker`.

Documentación y Cobertura muestran su fecha de última actualización arriba a la derecha. Las fechas de revisión se mantienen por separado en `demo/docs/metadata.json`; actualiza la correspondiente cuando revises las guías o la cobertura. No se utiliza la fecha de apertura de la página ni la del análisis del consumidor de referencia.

Las fichas explican cómo funciona cada componente, hook o utilidad y cómo integrarlo:

- Guía de comportamiento y fragmento de uso con botón para copiar el código.
- Propiedades, tipos declarados, valores predeterminados y API de los subcomponentes, extraídos de la implementación actual.
- Explicación de callbacks, referencias y valores devueltos cuando corresponda.
- Versiones de AG Grid y ECharts en sus fichas: rango declarado por la biblioteca, versión de su lock y versión del lock de la demo. Se distingue el motor aportado por el consumidor y el peer opcional de AG Grid Enterprise, que no se instala en la demo.
- Código fuente desplegable para consultar cómo se aplican las opciones.
- Enlace al ejemplo visual, cuando existe. Button, Tooltip y DatePicker incluyen además controles interactivos para modificar algunas propiedades y ver el código resultante.

Actualmente hay **90 fichas con guía y API**. La demostración visual sigue siendo un estado independiente: **36 exports tienen ejemplo y 54 están sin cubrir**. Documentar un componente no lo marca automáticamente como probado ni certifica todas sus variantes. Los fragmentos de integración se comprueban por sintaxis y por existencia de los subcomponentes utilizados; los valores, handlers e imports auxiliares corresponden a la aplicación consumidora.

Se conservan los **73 archivos Markdown heredados** de las familias de componentes como material de consulta, identificados en un apartado separado. Pueden contener propiedades antiguas o ejemplos incompletos; el archivo marcado como `broken` muestra una advertencia adicional. Estos ejemplos se presentan como texto y código, sin ejecutarse. Para integrar un componente, utiliza la guía y contrástala con la API actual. Las anotaciones Flow o TypeScript mostradas son declaraciones de las fuentes y no constituyen archivos de tipos publicados ni una garantía de validación en tiempo de ejecución.

Para mantener esta documentación:

```sh
# Regenera el catálogo público y todas las fichas después de cambiar la API,
# los ejemplos Markdown, las guías de uso o los locks de las integraciones.
npm run demo:docs

# Comprueba que las fichas coinciden con las fuentes, sin modificarlas.
# También forma parte de npm run check.
npm run demo:docs:check
```

Las explicaciones revisadas se mantienen en `demo/docs/guides.json`: cada export tiene `summary`, `behavior` y `example`, y puede añadir descripciones de `props`, una firma en `parameters` o variantes en `examples` con `title`, `description` y `code`. La API se extrae del código de la biblioteca; los comentarios y las descripciones de la guía completan la referencia. No edites a mano `demo/src/component-docs-index.json` ni `demo/src/docs/generated/`: regénéralos y guarda los cambios junto con las fuentes y las guías.

AGGridTable incluye selección múltiple, fila de totales, consulta por referencia y búsqueda controlada. Las fichas de gráficos explican el formato de datos y las firmas de los callbacks; BarChart añade ejemplos horizontal y apilado. NavBarMenu muestra una navegación con rutas y submenús y detalla el alcance de `rootIndex`. Las limitaciones heredadas se identifican expresamente; estos fragmentos de documentación no añaden cobertura visual por sí mismos.

Las fichas se cargan por separado al abrirlas. Toda esta documentación pertenece a `demo/`, utiliza sus dependencias existentes y queda fuera de la compilación y del paquete publicado de la biblioteca.

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

## AGGridTable como wrapper

El consumidor aporta `AgGridReact`, los datos, las definiciones de columna y la lógica de negocio. La biblioteca no registra módulos Enterprise ni calcula totales: la demo utiliza únicamente Community y genera sus filas fijadas y actualizaciones desde React.

Las opciones nativas, como `pinnedTopRowData`, `rowHeight`, `onPaginationChanged`, `postSortRows` y `overlayLoadingTemplate`, se entregan a AG Grid. `onGridReady`, `onRowClicked` y `onCellClicked` se conservan junto con los alias del wrapper; `onRowClick` recibe los datos de la fila y `onCellClick` recibe el evento completo. El alias `onGrid` recibe el evento de tabla preparada. Si se proporcionan un alias y su callback nativo, se ejecutan ambos.

`sortable`, `resizable` y `suppressMovable` se aplican como valores predeterminados de columna cuando se proporcionan. Las opciones explícitas de `defaultColDef` tienen prioridad sobre esos valores y las propiedades de cada columna tienen la prioridad final. La selección predeterminada utiliza `mode: 'singleRow'`; para selección múltiple se utiliza `'multiRow'`.

Cada tabla mantiene su propio buscador y la limpieza funciona también sin buscador. Se conservan los identificadores heredados `searcher` y `clearDataTables` por compatibilidad con consumidores existentes; el wrapper no los utiliza para localizar controles globalmente. Para nuevos estilos utiliza `.ag-grid-search`; si necesitas pulsar el botón oculto desde fuera, limita la consulta al contenedor de la tabla correspondiente. Los consumidores que consulten los identificadores globalmente todavía deben revisar su integración cuando muestran varias tablas.

`onHandleChangeFilter` permite sustituir la búsqueda interna por la lógica del consumidor, conservando su comportamiento anterior. Si se proporciona `quickFilterText`, el consumidor controla el filtro y debe actualizar esa propiedad para cambiarlo o restablecerlo. La referencia pública mantiene `getDisplayedRowAtIndex()`, `flashCells()` y un acceso a la API vigente mediante `ref.current.api`.

## Migración gradual de Flow a TypeScript

La migración comienza con `src/components/Badge/Badge.react.tsx` y su barrel `index.ts`. Conserva las propiedades `children`, `className` y `color`, el color predeterminado y la salida HTML. `BadgeProps` describe esas propiedades en las fuentes. La entrada pública de JavaScript sigue siendo `import { Badge } from 'tabler-react'`.

La familia Grid también está migrada: `Grid`, `Grid.Row`, `Grid.Col` y su barrel utilizan `.tsx`/`.ts`. Exporta en las fuentes `GridProps`, `GridRowProps` y `GridColProps`, sin añadir exports de valor al paquete. Se conservan todos los anchos, offsets, clases y valores predeterminados. Los flags `xl2Auto`, `xl3Auto`, `xl4Auto`, `xl6Auto` y `xl8Auto` admiten booleanos y los números heredados; `gutters` admite la cadena vacía que ya utiliza el valor predeterminado. No se cambian las reglas CSS ni se añaden atributos DOM que antes no se reenviaban.

`Icon`, `Container`, `Text` y `Text.Small` utilizan también TypeScript. Sus fuentes exportan `IconProps`, `ContainerProps`, `TextProps` y `TextSmallProps`. Se mantienen el HTML, las clases, las familias de iconos y los siete callbacks que Icon ya reenviaba a su elemento raíz. `TextProps` adapta los atributos y eventos al `RootComponent`: permite, por ejemplo, `href` en una raíz `a` y exige las propiedades requeridas por una raíz personalizada. `Container` y `Text.Small` conservan sus propiedades limitadas, sin añadir reenvío de atributos. La declaración de módulos CSS permite comprobar el import de estilos de Container, sin cambiar su compilación.

Las fichas de Icon, Container y Text muestran sus fuentes y tipos actualizados, incluida la API de `Text.Small`. Documentan también dos comportamientos heredados: `isAriaHidden` solo se aplica al contenedor de Icon con `link`, y Text sigue reenviando las opciones de formato a su raíz. Los flags booleanos de Text pueden generar avisos de React en elementos HTML; se recomiendan las variantes de cadena como `align="center"`. Esta etapa mantiene esos comportamientos para no mezclar la migración de tipos con cambios de ejecución.

La familia Card también utiliza TypeScript: `Card`, `Card.Header`, `Card.Title`, `Card.Body`, `Card.Options`, `Card.OptionsItem`, `Card.Status`, `Card.Alert`, `Card.Footer` y `Card.Map`. El barrel exporta sus diez tipos de propiedades únicamente para las fuentes. Se mantienen la composición, las clases, los controles, la referencia a la instancia y su estado interno; `isClosed` e `isCollapsed` solo establecen el estado inicial. Card y Card.Title suministran `className` y `children` a su `RootComponent`. Los eventos de Card.OptionsItem reciben un evento de botón de React y se conservan sus etiquetas y atributos `data-toggle` heredados.

Los estilos opcionales de Card.Header y Card.Map se omiten cuando no hay URL. Esto corrige además el fallo de Card.Map con `placeholder=""`, que antes enviaba una cadena al atributo `style`. Las fichas recogen las APIs TypeScript de los nueve subcomponentes y las pruebas verifican la composición y los controles con React 18 y 19.

Page, sus ocho subcomponentes públicos y los tres auxiliares internos de cabecera están migrados a TypeScript. Se conservan `Page.Main`, `Page.Content`, `Page.Header`, `Page.ContentWithSidebar`, `Page.Card`, `Page.Title`, `Page.MapHeader` y `Page.Sidebar`, además de su HTML, clases y distribución. `Page.Card` reutiliza el contrato de `RootComponent` de Card. Las dependencias con Container, Grid y Card apuntan a sus fuentes migradas, sin incorporar el barrel Flow a la comprobación de tipos. Los tipos de los auxiliares también se exportan desde las fuentes; no se añaden subcomponentes de valor a Page.

`PageSidebarHeaderProps` describe la configuración que realmente consume la barra lateral y sustituye una importación Flow que apuntaba a un archivo inexistente. Conserva `darkImageUrl` como URL opcional del logo y acepta otros campos de configuración heredados sin utilizarlos. No se cambia por `darkImageURL`. Los atributos Bootstrap del botón de la barra lateral se mantienen; la gestión del colapso corresponde al consumidor. La ficha de Page muestra los ocho subcomponentes, sus contratos y ejemplos de composición. Las pruebas verifican el paquete con React 18 y 19.

Header y sus variantes H1–H6, Avatar y Avatar.List utilizan TypeScript. Header conserva su raíz div y el nivel visual predeterminado; las variantes H1–H6 mantienen sus etiquetas y márgenes. Avatar conserva los cinco callbacks reenviados al span, las variantes de tamaño y estado y la prioridad del objeto style sobre el fondo de imageURL. Los barrels exportan los tipos de propiedades desde las fuentes.

Button y Dropdown también están migrados, incluidos Button.List, Button.Dropdown, ButtonModal, Dropdown.Trigger, Dropdown.Menu, Dropdown.Item y Dropdown.ItemDivider. Spinner, Floating y ClickOutside se han tipado como dependencias de este bloque. Button distingue las raíces button, input, a y las personalizadas; los contratos de tipos verifican los eventos y referencias correspondientes. rootRef se conecta a las tres raíces nativas; la raíz personalizada conserva el reenvío de to y las propiedades comunes, sin reenviar rootRef ni atributos arbitrarios. Button.List conserva el reenvío de atributos del div. ButtonModal mantiene su alternancia entre botón y Spinner.

Se conservan las quince posiciones, el ajuste a bordes, las referencias de React 18/19, el cierre por Escape/clic fuera y la composición de los menús. Dropdown.Menu utiliza React.CSSProperties y acepta referencias de objeto o callback; no exige top, left y position cuando no se proporcionan. Las fichas documentan las variantes y las limitaciones heredadas, incluida la clase literal d-{flex}-flex de los valores xs/sm/lg/xl. La migración no modifica esa regla CSS. El extractor de documentación combina los tipos alternativos de las uniones de TypeScript para mostrar correctamente la API de Button.

Alert, Nav, NavBarMenu y Site están migrados junto con Notification, AccountDropdown, List y el adaptador RouterContextProvider. Sus subcomponentes y tipos se exportan desde los barrels de las fuentes. Se mantienen las entradas públicas de JavaScript, las clases y la composición. Las fichas describen los callbacks, la prioridad de los hijos y las limitaciones heredadas, incluida la opción `seperated` de List y las opciones de búsqueda de Site.Nav que no tienen efecto.

Este bloque corrige además tres comportamientos: cerrar una alerta dentro de un formulario ya no lo envía, Site.Wrapper registra su listener de resize al montar y lo elimina al desmontar, y RouterContextProvider notifica los cambios de pathname para actualizar la navegación activa. Button reenvía `aria-label` para identificar el control de cierre. NavBarMenu admite entradas sin URL o icono e índices de ruta inexistentes sin producir errores.

Site.Wrapper conserva la consulta inicial de `window.innerWidth`, por lo que requiere un navegador. Con `vertical`, la barra lateral se activa desde 992 px; la cabecera horizontal se utiliza por debajo. Las pruebas verifican la alternancia, la limpieza de listeners, las notificaciones, el menú de cuenta y los cambios de ruta con React 18 y 19. Las pruebas y las fichas no añaden cobertura visual a componentes que aún no tienen un ejemplo interactivo en la demo.

Form y sus 28 subcomponentes, FormCard, FormTextInput y FormCheckboxInput también utilizan TypeScript. Los eventos describen el elemento real de cada campo. Form.SelectReact reutiliza los contratos genéricos de react-select para conservar el tipo de las opciones; Form.SelectMultiple recibe arrays de opciones y un callback con sus metadatos. Form.Ratio distingue el uso controlado del uso con defaultValue. Se mantienen las propiedades, las clases y las limitaciones documentadas, incluido maxlength de Form.Textarea.

DatePicker expone en las fuentes DatePickerProps y DatePickerHandle para su referencia value/reset, sin cambiar las restricciones, las fechas locales ni el foco del calendario. El antiguo Form.DatePicker continúa siendo otro componente: utiliza tres selectores y conserva sus lecturas UTC y cambios locales de Date. Se ha trasladado selected a los valores de los selects para eliminar los avisos de React. Form usa autoComplete="off" por defecto también con React 19, FileInput admite una selección vacía y la referencia de Form.Switch funciona con React 18 y 19.

Los modales públicos Modal, ModalDoc, ModalSplash y useModal, la familia de pestañas Tab/Tabs/TabbedHeader/TabbedContainer/useTabs y los iconos Error/Success están migrados. Se conservan los estados, acciones y callbacks; ModalDoc admite también una lista vacía tras filtrar sus secciones. La visibilidad, el foco y Escape de los modales siguen correspondiendo a la integración consumidora, como en los ejemplos de la demo. Las fichas y las pruebas incluyen los contratos de este bloque; el extractor reconoce además los valores predeterminados estáticos de las clases.

AGGridTable, AGGridPagination, Table y sus cinco subcomponentes, los cinco gráficos de ECharts y los tres esqueletos de tablas/gráficos también utilizan TypeScript. AGGridTableProps, AGGridColumn y AGGridTableHandle conservan el tipo de fila del consumidor en las opciones nativas, rutas de campo, eventos y API. Los imports de AG Grid son solo de tipos: el consumidor sigue aportando AgGridReact, módulos, datos, totales y lógica de negocio. Se mantienen las prioridades de las columnas y los callbacks nativos junto con los alias del wrapper.

AGGridPagination evita accesos a una API o unos tamaños todavía ausentes, permite alcanzar lastPage y corrige el desplazamiento de filas al ir a la última página. Sus controles son botones nativos que no envían formularios. El consumidor sigue sincronizando el paginador con sus filtros y datos. Table mantiene sus atributos HTML y deja de enviar headeritems/bodyitems al DOM como atributos.

Los gráficos comprueban la opción generada contra EChartsOption y reutilizan los tipos de sus series y callbacks. BarChart conserva el contrato heredado de apilado, LineChart recibe un array en el tooltip y RadarChart recibe los valores del perfil. Las propiedades públicas conservan su alcance: no se añade reenvío de opciones que el wrapper no utilizaba. Las pruebas comprueban la frontera con ReactECharts y representan las cinco variantes en SVG con el motor real de ECharts. `src/echarts-react-jsx.d.ts` aporta únicamente el alias JSX.Element que aún referencia echarts-for-react 3 durante la comprobación con los tipos de React 19; no añade código de ejecución y mantiene skipLibCheck=false.

colors, Tooltip, Tag con List/AddOn, Stamp, Progress con Bar, Loader/LoaderZone/LoaderNoData y Dimmer con Content también utilizan TypeScript. Los eventos y referencias de Tag describen la raíz real; Tooltip conserva las referencias y los eventos del disparador con React 18 y 19. Se mantienen las 97 entradas de la paleta y su mutabilidad.

En este bloque se corrige Tag para renderizar el RootComponent recibido en vez de la clase base React.Component. LoaderZone admite alturas numéricas y fraccionarias sin fallar ni alterar sus unidades; mantiene el ajuste heredado de 0.313 y pasa expresiones CSS sin interpretarlas. Las pruebas cubren las variantes de Tag, sus referencias y retirada interna o delegada, los loaders y la composición de Progress/Dimmer. Las fichas muestran las APIs migradas, sin ampliar artificialmente la cobertura visual.

Accordion, Breadcrumb, SearchBar, useSearchBar y ProtectedRoute están migrados a TypeScript. Breadcrumb conserva el tipo del path y entrega su valor al callback sin gestionar la navegación. SearchBar tipa el evento de teclado del input; el hook conserva string | undefined, el setter funcional y los eventos heredados con target.value. ProtectedRoute utiliza el tipo To de React Router, conserva children/Outlet y la opción replace del historial. Los botones de Breadcrumb y SearchBar son de tipo button para evitar envíos accidentales de formularios. Las pruebas incluyen apertura del acordeón, navegación, historial, eventos y normalización del filtro con React 18 y 19; la documentación sigue separada de la cobertura visual.

Media y sus seis subcomponentes, SocialNetworksList, Profile/Profile.Image, Comment/List/Reply y CommentsCard utilizan TypeScript. Se mantienen las clases, la composición y las prioridades de las listas sociales, que admiten arrays readonly. Las importaciones internas apuntan a las familias migradas, sin arrastrar el barrel Flow. Las fichas distinguen las propiedades utilizadas de las limitaciones heredadas: destinos y ayudas fijas de Media.BodySocial, twitterURL sin efecto en Profile y children no representado por Comment/CommentsCard.

Los auxiliares internos FormWithSingleInputAndButton y withTouchedErrors también están migrados. El formulario reutiliza los contratos de Form, Form.Input y Button y conserva su envío nativo. El HOC mantiene las demás propiedades del componente envuelto y filtra los errores por campos visitados sin mutar los mapas recibidos. Los errores de campos visitados que no aparecen en el mapa pueden ser undefined; los demás se sustituyen por una cadena vacía. Las pruebas verifican estos contratos a través de las plantillas públicas RegisterPage y ForgotPasswordPage con React 18 y 19. Los auxiliares siguen siendo internos.

```sh
# Comprueba las familias ya migradas, sin generar JavaScript ni declaraciones.
npm run typecheck
```

`tsconfig.json` activa `strict`, `isolatedModules` y `noEmit`. Solo incluye fuentes TypeScript y los ejemplos de contrato en `tests/types/`; no habilita `allowJs` ni intenta interpretar Flow. Incluye las declaraciones ES2016.Array.Include y ES2022.String para los usos existentes de Array.includes y String.at, y ES2020.Intl para las declaraciones de date-fns, sin cambiar el target ES2015 ni añadir código de ejecución. Las pruebas de tipos aceptan los usos públicos válidos de las familias migradas y exigen errores para propiedades incorrectas, incluidos los eventos, referencias y raíces de los controles. El código TypeScript nuevo debe mantener sus dependencias dentro de la parte migrada o resolver expresamente la frontera con las fuentes antiguas; añadir `any` o ignorar errores no sustituye esa revisión.

Se utiliza TypeScript 6.0.3 porque el parser `@typescript-eslint` 8.72.0 declara soporte para TypeScript menor que 6.1 y para ESLint 10. El build de Vite transpila con Babel; la comprobación semántica la realiza `typecheck`, que también forma parte de `npm run check`. Los archivos Flow pendientes siguen teniendo lint, compilación y pruebas, pero no una comprobación semántica de tipos dentro de ese comando.

El catálogo y las fichas reconocen ambos formatos, incluidos los tipos de propiedades y las APIs de los subcomponentes ya migrados. Las pruebas de ejecución comprueban su salida a través del paquete compilado con React 19 y del consumidor aislado con React 18, incluidos los eventos de Icon y el reenvío de propiedades de Text. La demo continúa siendo JavaScript y consume el bundle ESM de la biblioteca.

Las familias restantes se migrarán por grupos de dependencias, manteniendo su API. La publicación de declaraciones `.d.ts` y la configuración de `types`/`exports` se abordarán al disponer de una superficie pública coherente; esta etapa no anuncia tipos completos para los otros componentes. Las herramientas de Flow se retirarán cuando ya no tengan usos.

## Lint

`npm run lint` analiza la biblioteca, las pruebas, los scripts `.mjs` y sus configuraciones; `npm run lint:demo` analiza la demo. ESLint 10 usa `eslint.config.mjs` en formato plano; Hermes analiza el código Flow y `@typescript-eslint` analiza las fuentes y contratos TypeScript. Sus reglas recomendadas se aplican únicamente a los archivos TypeScript.
Los plugins de React y accesibilidad utilizan el adaptador oficial `@eslint/compat`, ya que todavía no declaran soporte nativo para ESLint 10. Las reglas de hooks comprueban su uso y las dependencias de los efectos.

Para compilar y ejecutar las pruebas de regresión de componentes, posicionamiento, foco y assets, usa `npm test` desde la raíz.

## Comprobaciones locales

Después de instalar las dependencias de la raíz y de la demo como se indica en Setup, puedes ejecutar todas las comprobaciones desde una terminal en la raíz:

```sh
# Comprobación habitual: tipos migrados, catálogo y fichas actualizados, lint de biblioteca y demo,
# compilación de la biblioteca, pruebas con React 19 y compilación de la demo.
npm run check

# Comprobación completa: lo anterior y pruebas de integración con React 18
# en un consumidor temporal que instala el paquete compilado.
npm run check:all
```

Los pasos se ejecutan en orden y se detienen en el primero que falle. En estos comandos, cualquier aviso de lint también hace fallar la comprobación. `check:all` reutiliza la compilación de `check` para el consumidor de React 18, sin compilar la biblioteca una segunda vez.

`check` utiliza las dependencias ya instaladas. `check:all` necesita acceso al registro npm para preparar el consumidor temporal de React 18, sin cambiar los `package.json` ni los locks de la biblioteca o la demo. Ambos comandos regeneran los directorios de compilación correspondientes y terminan al completar las comprobaciones.

Puedes utilizarlos antes de un commit o de actualizar la biblioteca en un consumidor. Se ejecutan a petición desde la terminal; no se añaden hooks de Git, acciones de GitHub ni pasos de publicación. Las pruebas visuales y los flujos propios de cada consumidor siguen requiriendo su revisión.

## Deploy

The `prepare` script builds the library before packaging. Run `npm run build` to generate the artifacts locally. Both the library and demo use npm with independent `package-lock.json` files.


## License

MIT © [thelogicvalue](https://github.com/thelogicvalue), [jonthomp](https://github.com/jonthomp), [AaronCoplan](https://github.com/AaronCoplan) and [the contributors](https://github.com/tabler/tabler-react/graphs/contributors).
