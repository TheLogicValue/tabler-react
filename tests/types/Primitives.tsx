import * as React from "react";
import Icon, { type IconProps } from "../../src/components/Icon";
import Container, { type ContainerProps } from "../../src/components/Container.react";
import Text, { type TextProps, type TextSmallProps } from "../../src/components/Text";

const icon: IconProps = { name: "check", title: "Listo", prefix: "custom", color: "primary", size: "big" };
const container: ContainerProps = { className: "consumer", children: "Contenido" };
const small: TextSmallProps = { color: "muted", wrap: true, children: "Nota" };
const link: TextProps<"a"> = { RootComponent: "a", href: "/details", align: "center" };
<Icon {...icon} />;
<Icon name="check" link payment flag isAriaHidden onClick={event => event.currentTarget.focus()}
  onMouseEnter={event => event.clientX} onMouseLeave={event => event.relatedTarget}
  onPointerEnter={event => event.pointerType} onPointerLeave={event => event.pointerId}
  onFocus={event => event.relatedTarget} onBlur={event => event.currentTarget.blur()} />;
<Container {...container} />;
<Text {...link}>Detalles</Text>;
<Text id="intro" aria-live="polite" align="right" transform="capitalize" tracking="wide" leading="loose" />;
<Text RootComponent="button" type="button" onClick={event => { event.currentTarget.disabled = true; }}>Acción</Text>;
<Text left center right justify lowercase uppercase capitalize trackingTight trackingNormal trackingWide
  leadingNone leadingTight leadingNormal leadingLoose wrap muted size="custom-size" color="custom-color" />;
<Text.Small {...small} />;

function ConsumerLink({ destination, className, children }: { destination: string; className?: string; children?: React.ReactNode }) {
  return <a href={destination} className={className}>{children}</a>;
}
<Text RootComponent={ConsumerLink} destination="/details">Enlace del consumidor</Text>;

// @ts-expect-error the icon name is required.
<Icon />;
// @ts-expect-error title is a string.
<Icon name="check" title={123} />;
// @ts-expect-error pointer callbacks receive React pointer events.
<Icon name="check" onPointerEnter={(event: React.KeyboardEvent<HTMLElement>) => event.key} />;
// @ts-expect-error Icon does not forward href, even when link is enabled.
<Icon name="check" link href="/details" />;
// @ts-expect-error Container only accepts children and className.
<Container id="not-forwarded" />;
// @ts-expect-error href requires an anchor or another supporting RootComponent.
<Text href="/details" />;
// @ts-expect-error native button event targets must not be typed as anchors.
<Text RootComponent="button" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.currentTarget.href} />;
// @ts-expect-error the custom root's required destination must be supplied.
<Text RootComponent={ConsumerLink}>Falta destino</Text>;
// @ts-expect-error custom root properties retain their declared type.
<Text RootComponent={ConsumerLink} destination={123} />;
// @ts-expect-error alignment is restricted to the existing variants.
<Text align="diagonal" />;
// @ts-expect-error transformations are restricted to the existing variants.
<Text transform="reverse" />;
// @ts-expect-error tracking is restricted to the existing variants.
<Text tracking="huge" />;
// @ts-expect-error leading is restricted to the existing variants.
<Text leading="huge" />;
// @ts-expect-error Text.Small fixes its root to small.
<Text.Small RootComponent="a" />;
// @ts-expect-error Text.Small does not forward native attributes or handlers.
<Text.Small onClick={() => undefined} />;
// @ts-expect-error no consistent public ref contract exists across React 18 and 19.
<Text ref={React.createRef<HTMLDivElement>()} />;
