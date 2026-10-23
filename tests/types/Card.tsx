import * as React from "react";
import Card, {
  type CardProps, type CardHeaderProps, type CardTitleProps, type CardBodyProps,
  type CardOptionsProps, type CardOptionsItemProps, type CardStatusProps,
  type CardAlertProps, type CardFooterProps, type CardMapProps,
} from "../../src/components/Card";

const card: CardProps = { title: "Título", body: <p>Cuerpo</p>, footer: "Pie", statusColor: "blue", alert: <strong>Aviso</strong>, alertColor: "warning" };
const header: CardHeaderProps = { backgroundURL: "/header.svg", className: "consumer" };
const title: CardTitleProps = { RootComponent: "h2", children: "Título" };
const body: CardBodyProps = { children: "Cuerpo" };
const options: CardOptionsProps = { children: "Acciones" };
const action: CardOptionsItemProps = { type: "collapse", icon: "check", "aria-label": "Plegar", onClick: event => { event.currentTarget.disabled = true; } };
const status: CardStatusProps = { color: "custom-color", side: true };
const alert: CardAlertProps = { color: "warning", children: "Aviso" };
const footer: CardFooterProps = { children: <span>Pie</span> };
const map: CardMapProps = { placeholder: "/map.svg", children: "Mapa" };
<Card {...card} RootComponent="section" aside isCollapsible isCollapsed isClosable isClosed={false} isFullscreenable />;
<Card><Card.Header {...header}><Card.Title {...title} /><Card.Options {...options}><Card.OptionsItem {...action} /></Card.Options></Card.Header>
  <Card.Status {...status} /><Card.Alert {...alert} /><Card.Body {...body} /><Card.Footer {...footer} /><Card.Map {...map} />
</Card>;
<Card.OptionsItem onClick={() => undefined} />;
const ref = React.createRef<Card>();
<Card ref={ref} />;
ref.current?.handleCollapseOnClick();
ref.current?.handleCloseOnClick();
ref.current?.handleFullscreenOnClick();

function ConsumerRoot({ className, children }: { className: string; children?: React.ReactNode }) {
  return <article className={className}>{children}</article>;
}
<Card RootComponent={ConsumerRoot} />;
<Card.Title RootComponent={ConsumerRoot}>Título</Card.Title>;
function RootWithRequiredProp({ destination }: { destination: string }) { return <a href={destination}>Destino</a>; }

// @ts-expect-error Card does not forward arbitrary attributes to RootComponent.
<Card id="ignored" />;
// @ts-expect-error Card only supplies className and children to its root.
<Card RootComponent={RootWithRequiredProp} />;
// @ts-expect-error Card.Title does not supply extra required root props.
<Card.Title RootComponent={RootWithRequiredProp} />;
// @ts-expect-error closed and collapsed flags are booleans.
<Card isClosed="true" />;
// @ts-expect-error title keeps its existing string contract.
<Card title={123} />;
// @ts-expect-error header backgrounds use URL strings.
<Card.Header backgroundURL={123} />;
// @ts-expect-error body does not forward DOM handlers.
<Card.Body onClick={() => undefined} />;
// @ts-expect-error options do not forward DOM attributes.
<Card.Options id="ignored" />;
// @ts-expect-error only collapse, close and fullscreen action variants exist.
<Card.OptionsItem type="submit" />;
// @ts-expect-error action events target a button, not an anchor.
<Card.OptionsItem onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.currentTarget.href} />;
// @ts-expect-error status color is required.
<Card.Status />;
// @ts-expect-error alert color is required.
<Card.Alert />;
// @ts-expect-error status side is boolean.
<Card.Status color="blue" side="left" />;
// @ts-expect-error footer does not forward DOM attributes.
<Card.Footer id="ignored" />;
// @ts-expect-error map placeholders use URL strings.
<Card.Map placeholder={123} />;
