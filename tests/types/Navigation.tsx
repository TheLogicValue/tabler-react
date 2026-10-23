import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Alert, { type AlertProps } from "../../src/components/Alert";
import Nav, { type NavProps, type NavItemObject, type NavRouterContextProps } from "../../src/components/Nav";
import NavBarMenu, { type NavBarMenuProps } from "../../src/components/NavBar";
import Site, { type SiteHeaderProps, type SiteNavProps, type SiteFooterProps, type SiteWrapperProps } from "../../src/components/Site";
import Notification, { type NotificationProps, type NotificationTrayProps } from "../../src/components/Notification";
import AccountDropdown, { type AccountDropdownProps } from "../../src/components/AccountDropdown";
import List, { type ListProps } from "../../src/components/List";
import RouterContextProvider from "../../src/helpers/RouterContextProvider.react";
import { Button } from "../../src/components/Button";

const alert: AlertProps = { type: "warning", icon: "bell", avatar: "/avatar.svg", isDismissible: true, onDismissClick: () => undefined, onClick: event => event.currentTarget.focus() };
<Alert {...alert}><Alert.Link href="/details">Detalle</Alert.Link></Alert>;
const items: ReadonlyArray<NavItemObject> = [{ value: "Inicio", to: "/" }, { value: "Más", subItems: [{ value: "Detalle", to: "/details", LinkComponent: Link, onClick: event => event.preventDefault() }] }];
function RouteContext({ callback }: NavRouterContextProps) {
  const location = useLocation();
  return <RouterContextProvider callback={callback} location={location} />;
}
const nav: NavProps = { itemsObjects: items, routerContextComponentType: RouteContext, vertical: true };
<Nav {...nav} />;
<Nav.Item value="Acción" type="div" position="auto-end" onClick={() => undefined} />;
<Nav.SubItem to="/details" LinkComponent={Link} onClick={event => event.preventDefault()} />;
<Nav.Link RootComponent={Link} to="/details" rootRef={React.createRef<HTMLAnchorElement>()} />;
<Nav.Submenu><Nav.SubmenuItem RootComponent={Link} to="/details">Detalle</Nav.SubmenuItem></Nav.Submenu>;
const menu: NavBarMenuProps = { rootIndex: 0, items: [{ value: "Inicio", to: "/", LinkComponent: true }, { value: "Etiqueta sin destino" }, { value: "Más", icon: "layers", subItems: [{ value: "Detalle", to: "/details", LinkComponent: true }] }] };
<NavBarMenu {...menu} />;
const notification: NotificationProps = { message: <strong>Aviso</strong>, time: "Ahora", unread: true };
const tray: NotificationTrayProps = { notificationsObjects: [notification], unread: true, markAllAsRead: () => undefined };
<Notification {...notification} />;
<Notification.Tray {...tray} />;
const account: AccountDropdownProps = { avatarImage: <span>AB</span>, name: "Ana", options: ["profile", "divider", { value: "Acción", onClick: event => event.preventDefault() }], optionsRootComponent: Link };
<AccountDropdown {...account} />;
const header: SiteHeaderProps = { imageURL: "/logo.svg", darkImageUrl: "/dark.svg", notificationsTray: tray, accountDropdown: account };
const siteNav: SiteNavProps = { itemsObjects: items, stickyTop: true, vertical: true, navOption: <button type="button">Acción</button>, routerContextComponentType: RouteContext };
const footer: SiteFooterProps = { links: [<a key="a" href="/">Inicio</a>], note: "Nota", copyright: <small>Copyright</small> };
const wrapper: SiteWrapperProps = { headerProps: header, navProps: siteNav, footerProps: footer, vertical: true, children: "Contenido" };
<Site><Site.Header {...header} /><Site.Nav {...siteNav} /><Site.Footer {...footer} /><Site.Logo href="/" src="/logo.svg" alt="Logo" /></Site>;
<Site.Wrapper {...wrapper} />;
const list: ListProps = { unstyled: true, seperated: true, inline: true };
<List {...list}><List.Item inline>Uno</List.Item></List>;
<List.Group transparent isCardBody><List.GroupItem RootComponent={Link} to="/details" action active icon="check">Detalle</List.GroupItem></List.Group>;
<Button type="button" aria-label="Cerrar" />;

// @ts-expect-error alert type is required and limited to the existing variants.
<Alert type="unknown" />;
// @ts-expect-error Alert does not forward arbitrary native DOM attributes.
<Alert type="info" id="ignored" />;
// @ts-expect-error Nav.Item callbacks receive no arguments.
<Nav.Item onClick={(event: React.MouseEvent) => event.preventDefault()} />;
// @ts-expect-error subitems contain a required string label.
<Nav itemsObjects={[{ value: "Más", subItems: [{ to: "/details" }] }]} />;
// @ts-expect-error Nav.Link's native reference targets an anchor.
<Nav.Link rootRef={React.createRef<HTMLButtonElement>()} />;
// @ts-expect-error navbar items must be an array.
<NavBarMenu items="invalid" />;
// @ts-expect-error notification messages are required.
<Notification />;
// @ts-expect-error notification time is text.
<Notification message="Aviso" time={123} />;
// @ts-expect-error account preset names are restricted to the existing options.
<AccountDropdown options={["unknown"]} />;
// @ts-expect-error the wrapper configuration requires its header, nav and footer.
<Site.Wrapper>Contenido</Site.Wrapper>;
// @ts-expect-error vertical mode is boolean.
<Site.Nav vertical="true" />;
// @ts-expect-error footer notes retain their string contract.
<Site.Footer note={123} />;
// @ts-expect-error list options retain boolean values.
<List seperated="true" />;
// @ts-expect-error router locations need a pathname.
<RouterContextProvider location={{ search: "?q=1" }} callback={() => undefined} />;
