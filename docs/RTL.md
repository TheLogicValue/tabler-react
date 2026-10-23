# Estado de los estilos RTL

La compilación actual genera `dist/style.css` a partir de `src/Tabler.css`. No genera `dist/Tabler.RTL.css` y el mapa de `exports` no declara una entrada RTL. La antigua instrucción de importar `tabler-react/dist/Tabler.RTL.css` no es válida para este paquete.

`src/Tabler.RTL.css` se conserva como fuente heredada, fuera de la compilación y del paquete publicado. Publicar y comprobar una variante RTL requeriría un trabajo específico; esta revisión no certifica su compatibilidad con los componentes actuales.

Para utilizar los estilos publicados, importa `tabler-react/style.css`, como se indica en [Styles](./Styles.md).
