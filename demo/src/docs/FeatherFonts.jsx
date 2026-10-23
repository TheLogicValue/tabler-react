import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'tabler-react'
import { Scenario } from '../shared.jsx'
import { CodeBlock } from './Markdown.jsx'

const examples = ['activity', 'alert-circle', 'arrow-left', 'calendar', 'check', 'download', 'edit-3', 'home', 'search', 'settings', 'upload', 'x']
const fontFiles = ['woff', 'ttf', 'eot', 'svg']
const usage = `import { Button, Icon } from "tabler-react";
import "tabler-react/style.css";

// Nombre sin el prefijo fe-.
<Button type="button" color="secondary">
  <span aria-hidden="true"><Icon name="download" /></span> Descargar
</Button>

// Para una acción que solo muestra el icono, etiqueta el botón.
<Button type="button" aria-label="Buscar">
  <span aria-hidden="true"><Icon name="search" /></span>
</Button>`

export default function FeatherFonts() {
  return <div className="component-documentation">
    <div className="docs-navigation"><Link to="/documentacion">← Toda la documentación</Link><Link to="/documentacion/Icon">API de Icon</Link></div>
    <Scenario title="Fuentes Feather" description="Los iconos Feather de esta biblioteca se dibujan con una fuente local. La tipografía del texto de la interfaz se configura por separado." components={['Icon']}>
      <p>Importa <code>tabler-react/style.css</code> una vez en la aplicación consumidora. Ese CSS incluye la regla <code>@font-face</code>, la familia <code>feather</code> y las clases de los iconos. No necesitas instalar otro paquete de Feather ni cargar una fuente desde un CDN.</p>
      <CodeBlock language="js" code={'import "tabler-react/style.css";'} />
      <p>Se utiliza la colección de archivos incluida en esta versión de Tabler. No hay una dependencia Feather con versión propia declarada en <code>package.json</code>; la disponibilidad de un icono depende de las clases del CSS publicado.</p>
    </Scenario>
    <Scenario title="Usar los iconos" description="Icon utiliza el prefijo fe por defecto. Pasa solo el nombre; por ejemplo, download genera las clases fe fe-download." components={['Icon', 'Button']}>
      <CodeBlock code={usage} />
      <p>Estos ejemplos utilizan la fuente cargada por la demo. Los nombres también sirven para las propiedades de otros componentes que reciben un icono Feather.</p>
      <ul className="docs-feather-examples" aria-label="Ejemplos de iconos Feather">{examples.map(name => <li key={name}><span aria-hidden="true"><Icon name={name} /></span><code>{name}</code></li>)}</ul>
      <p>Para usarlos directamente en HTML, combina las clases <code>fe</code> y <code>fe-nombre</code>:</p>
      <CodeBlock language="html" code={'<span><i class="fe fe-download" aria-hidden="true"></i> Descargar</span>'} />
      <p>El tamaño y el color pueden ajustarse con una clase CSS propia mediante <code>className</code>, usando <code>font-size</code> y <code>color</code>. Un prefijo personalizado necesita su propio CSS y sus recursos; <code>prefix</code> no descarga fuentes ni iconos.</p>
      <p>Da un nombre accesible a cada acción mediante texto visible o <code>aria-label</code> en el botón o enlace. Para ocultar un icono decorativo, usa un contenedor con <code>aria-hidden=&quot;true&quot;</code>, como en los ejemplos. Consulta los límites de <code>isAriaHidden</code> y <code>link</code> en la <Link to="/documentacion/Icon">ficha de Icon</Link>.</p>
    </Scenario>
    <Scenario title="Archivos y distribución" description="La compilación publica cuatro formatos de fuente y conserva las referencias relativas desde dist/style.css." components={[]}>
      <ul>{fontFiles.map(format => <li key={format}><code>dist/fonts/feather/feather-webfont.{format}</code></li>)}</ul>
      <p>Al importar el CSS, Vite procesa las URL y publica los archivos necesarios en los assets del consumidor. La demo utiliza ese mismo mecanismo. Si sirves la biblioteca como archivos estáticos, conserva <code>dist/style.css</code> y el directorio <code>dist/fonts/feather/</code> en su posición relativa.</p>
      <p>El navegador elige un formato compatible; no necesita descargar los cuatro. No apuntes a <code>src/fonts/</code> desde una aplicación consumidora: las fuentes del paquete se distribuyen dentro de <code>dist/</code>.</p>
    </Scenario>
    <Scenario title="Si un icono no aparece" description="Un cuadrado vacío suele indicar un problema con la fuente o un nombre que no existe en esta colección." components={[]}>
      <ol className="docs-behavior">
        <li>Comprueba que la aplicación importa <code>tabler-react/style.css</code> y que el navegador puede cargarlo.</li>
        <li>En la pestaña Red del navegador, filtra por fuentes y revisa la petición a <code>feather-webfont</code>: debe devolver el archivo de fuente, no una página HTML ni un error 404.</li>
        <li>Inspecciona el elemento: debe tener <code>fe fe-nombre</code>, utilizar la familia <code>feather</code> y tener un <code>::before</code> con contenido definido por el CSS. No todos los nombres de otras colecciones de iconos existen en esta fuente.</li>
        <li>Revisa los estilos del consumidor si han cambiado <code>font-family</code>, <code>display</code>, <code>font-size</code>, <code>color</code> o el contenido del pseudoelemento.</li>
        <li>Si alojas los recursos en otra ruta o dominio, comprueba la ruta pública de despliegue y que el servidor permite cargar las fuentes desde ese origen.</li>
      </ol>
      <p>La comprobación <code>npm test</code> de la biblioteca verifica que existen los cuatro archivos referenciados por el CSS publicado. La carga en el navegador también depende de cómo se despliegue la aplicación consumidora.</p>
    </Scenario>
  </div>
}
