import * as React from "react";
import { Link } from "react-router-dom";
import Tooltip, { type TooltipProps } from "../../src/components/Tooltip";
import Tag, { type TagProps } from "../../src/components/Tag";
import Stamp from "../../src/components/Stamp";
import Progress from "../../src/components/Progress";
import { Loader, LoaderZone, LoaderNoData } from "../../src/components/Loader";
import Dimmer from "../../src/components/Dimmer";
import Button from "../../src/components/Button/Button.react";
import colors, { type TablerColors } from "../../src/colors";

const spanRef = React.createRef<HTMLSpanElement>();
const anchorRef = React.createRef<HTMLAnchorElement>();
const props: TagProps = { children: "Etiqueta", color: colors.blue, rootRef: spanRef };
<Tag {...props} onPointerEnter={event => event.currentTarget.dataset.active} />;
<Tag link href="/fondo" rootRef={anchorRef} onClick={event => event.currentTarget.href} />;
<Tag RootComponent={Link} to="/fondo" rootRef={anchorRef} remove onRemoveClick={event => event.preventDefault()} />;
<Tag.List><Tag rounded avatar="/avatar.png" addOn={2} addOnIcon="check" onAddOnClick={event => event.currentTarget.tagName}>Nombre</Tag></Tag.List>;
<Tag.AddOn link icon="x" onClick={event => event.preventDefault()} />;
<Tag.AddOn RootComponent={Link} to="/fondo">Ver</Tag.AddOn>;
const tooltip: TooltipProps = { content: "Ayuda", placement: "auto-end", type: "link" };
<Tooltip {...tooltip}><button ref={React.createRef<HTMLButtonElement>()}>Acción</button></Tooltip>;
<Tooltip content="Ayuda"><Button type="button" rootRef={React.createRef<HTMLButtonElement>()}>Acción</Button></Tooltip>;
<Tooltip content="Ayuda"><Tag rootRef={spanRef}>Etiqueta</Tag></Tooltip>;
<Tooltip content="Sin disparador" />;
<Stamp icon="check" size="sm" color="green">7</Stamp>;
<Progress size="sm"><Progress.Bar width={125} color="blue" /></Progress>;
<Loader className="custom">Cargando</Loader>;
<LoaderZone width="100%" height="3.5rem" />;
<LoaderZone width={600} height={240} speed={2} title="Cargando" />;
<LoaderNoData height={240} title={<strong>Sin datos</strong>} />;
<Dimmer loader active><Dimmer.Content className="custom">Contenido</Dimmer.Content></Dimmer>;
const palette: TablerColors = colors;
palette["consumer-color"] = "#123456";

// @ts-expect-error A link Tag requires its destination.
<Tag link>Destino ausente</Tag>;
// @ts-expect-error The span variant does not forward href.
<Tag href="/ignored">Etiqueta</Tag>;
// @ts-expect-error A custom root requires to.
<Tag RootComponent={Link}>Destino ausente</Tag>;
// @ts-expect-error Anchor callbacks expose an anchor rather than an input.
<Tag link href="/fondo" onClick={event => event.currentTarget.checked} />;
// @ts-expect-error Custom AddOn roots require to.
<Tag.AddOn RootComponent={Link} />;
// @ts-expect-error Tooltip needs an element that it can clone, rather than text.
<Tooltip content="Ayuda">Texto</Tooltip>;
// @ts-expect-error Tooltip accepts one trigger element.
<Tooltip content="Ayuda"><button>A</button><button>B</button></Tooltip>;
// @ts-expect-error Position names follow the existing Floating UI contract.
<Tooltip content="Ayuda" placement="center" />;
// @ts-expect-error Tooltip content is text.
<Tooltip content={<strong>Ayuda</strong>} />;
// @ts-expect-error Stamp keeps its two existing sizes.
<Stamp size="lg" />;
// @ts-expect-error Progress.Bar receives a numeric percentage.
<Progress.Bar width="50%" />;
// @ts-expect-error Loader does not forward native DOM attributes.
<Loader id="ignored" />;
// @ts-expect-error LoaderZone requires the height used by its SVG rectangle.
<LoaderZone width={600} />;
// @ts-expect-error Height is a CSS/SVG length, rather than a boolean.
<LoaderZone height={true} />;
// @ts-expect-error LoaderZone only exposes the options it actually forwards.
<LoaderZone height={240} animate={false} />;
// @ts-expect-error Dimmer active is boolean.
<Dimmer active="true" />;
// @ts-expect-error Palette values remain strings.
palette.blue = 123;
