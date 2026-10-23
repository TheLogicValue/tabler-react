import * as React from "react";
import { Link } from "react-router-dom";
import Header, { type HeaderProps, type H1Props } from "../../src/components/Header";
import Avatar, { type AvatarProps, type AvatarListProps } from "../../src/components/Avatar";
import { Button, ButtonModal, type ButtonProps, type ButtonDropdownProps } from "../../src/components/Button";
import Dropdown, { type DropdownProps, type DropdownItemObject, type DropdownMenuProps } from "../../src/components/Dropdown";
import Spinner, { type SpinnerProps } from "../../src/components/IconAnimate/Spinner";
import { FloatingProvider, FloatingReference, FloatingSurface, usePositioning, type Placement } from "../../src/helpers/Floating.react";

const heading: HeaderProps = { size: 3, RootComponent: "h2", children: "Título" };
const h1: H1Props = { className: "consumer", children: "Título" };
const avatar: AvatarProps = { imageURL: "/photo.svg", style: { width: 32 }, size: "", status: "green", color: "blue" };
const avatars: AvatarListProps = { stacked: true, children: <Avatar {...avatar} /> };
<Header {...heading} />;
<><Header.H1 {...h1} /><Header.H2 /><Header.H3 /><Header.H4 /><Header.H5 /><Header.H6 /></>;
<Avatar.List {...avatars} />;
<Avatar icon="user" onClick={event => event.currentTarget.focus()} onPointerEnter={event => event.pointerType} />;
const buttonRef = React.createRef<HTMLButtonElement>();
const inputRef = React.createRef<HTMLInputElement>();
const anchorRef = React.createRef<HTMLAnchorElement>();
<Button type="button" rootRef={buttonRef} onClick={event => { event.currentTarget.disabled = true; }} color="primary">Guardar</Button>;
<Button RootComponent="input" type="button" value="Guardar" rootRef={inputRef} onClick={event => event.currentTarget.value} />;
<Button RootComponent="a" href="/details" target="_blank" rel="noopener" rootRef={anchorRef} onClick={event => event.currentTarget.href}>Detalle</Button>;
<Button RootComponent={Link} to="/details">Navegar</Button>;
const native: ButtonProps = { type: "reset", outline: true, loading: true, "aria-haspopup": "menu" };
<Button {...native} />;
<Button.List id="actions" style={{ gap: 8 }} align="right" onClick={event => event.currentTarget.focus()} />;
const action: DropdownItemObject = { value: "Detalle", to: "/details", RootComponent: Link, onClick: event => event.preventDefault() };
const menu: DropdownMenuProps = { show: true, position: "auto-end", rootRef: React.createRef<HTMLDivElement>(), style: { zIndex: 42 } };
const dropdown: DropdownProps = { triggerContent: "Menú", itemsObject: [action, { isDivider: true }], arrow: true, flex: "md" };
const buttonDropdown: ButtonDropdownProps = { value: "Abrir", dropdownProps: menu, rootRef: buttonRef };
<Button.Dropdown {...buttonDropdown}><Dropdown.Item to="/details">Detalle</Dropdown.Item></Button.Dropdown>;
<Dropdown {...dropdown} />;
<Dropdown trigger={<button type="button" ref={buttonRef}>Propio</button>} itemsObject={[action]} />;
<Dropdown><Dropdown.Trigger rootRef={buttonRef} /><Dropdown.Menu {...menu}><Dropdown.Item RootComponent={Link} to="/details" useExact /><Dropdown.ItemDivider /></Dropdown.Menu></Dropdown>;
const spinner: SpinnerProps = { width: "2rem", height: 32 };
<Spinner {...spinner} />;
<ButtonModal text="Guardar" onClick={event => { event.currentTarget.disabled = true; }} spin={false} width="2rem" />;
<FloatingProvider open onDismiss={() => undefined}><FloatingReference rootRef={buttonRef}>{({ ref }) => <button ref={ref} type="button" />}</FloatingReference><FloatingSurface open placement="right-end" style={{ zIndex: 42 }} /></FloatingProvider>;
function PositioningFixture() {
  const placement: Placement = "auto-start";
  const floating = usePositioning({ reference: null, placement, open: false });
  return <div ref={floating.refs.setFloating} style={floating.floatingStyles} />;
}
<PositioningFixture />;

// @ts-expect-error header sizes are numeric levels 1 through 6.
<Header size={7} />;
// @ts-expect-error H1 fixes its element and heading level.
<Header.H1 size={2} />;
// @ts-expect-error Avatar does not forward arbitrary DOM attributes.
<Avatar id="ignored" />;
// @ts-expect-error Avatar styles must be CSS properties.
<Avatar style={{ width: {} }} />;
// @ts-expect-error avatar status colors retain their existing variants.
<Avatar status="blue" />;
// @ts-expect-error button href requires the anchor variant.
<Button href="/details" />;
// @ts-expect-error native root references must match the element.
<Button rootRef={anchorRef} />;
// @ts-expect-error an input root cannot use a button element reference.
<Button RootComponent="input" rootRef={buttonRef} />;
// @ts-expect-error native button callbacks cannot be typed as anchor callbacks.
<Button onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.currentTarget.href} />;
// @ts-expect-error input variants keep the existing button/submit/reset contract.
<Button RootComponent="input" type="text" />;
// @ts-expect-error Button only forwards its declared native attributes.
<Button id="ignored" />;
// @ts-expect-error native DOM attributes in Button.List retain their types.
<Button.List style="display: flex" />;
// @ts-expect-error placements include only the supported named positions.
<Dropdown position="diagonal" />;
// @ts-expect-error the trigger has link and button appearance variants.
<Dropdown.Trigger type="submit" />;
// @ts-expect-error menu styles use CSS properties, not CSS strings.
<Dropdown.Menu style="top: 0" />;
// @ts-expect-error item click callbacks receive mouse events.
<Dropdown.Item onClick={(event: React.KeyboardEvent) => event.key} />;
// @ts-expect-error modal spinner dimensions are SVG lengths.
<ButtonModal spin height={{}} />;
