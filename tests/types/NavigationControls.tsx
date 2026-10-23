import * as React from "react";
import Accordion, { type AccordionProps } from "../../src/components/Accordion";
import Breadcrumb, { type BreadcrumbCrumb, type BreadcrumbProps } from "../../src/components/Breadcrumb";
import { SearchBar, useSearchBar, type SearchBarFilterEvent, type UseSearchBarResult } from "../../src/components/SearchBar";
import ProtectedRoute, { type ProtectedRouteProps } from "../../src/components/ProtectedRoute";

const accordion: AccordionProps = { accordionButton: <strong>Detalles</strong>, collapseDefault: false };
<Accordion {...accordion}><p>Contenido</p></Accordion>;
const crumbs: ReadonlyArray<BreadcrumbCrumb> = [{ name: "Inicio", path: "/" }, { name: <strong>Datos</strong>, path: "/datos" }];
const breadcrumb: BreadcrumbProps = { crumbs, selected: path => path.toUpperCase() };
<Breadcrumb {...breadcrumb} />;
<Breadcrumb crumbs={[{ name: "Nivel", path: 1 }]} selected={path => path.toFixed()} />;
<Breadcrumb crumbs={[{ name: "Datos", path: { pathname: "/datos", search: "?q=atlas" } }]} selected={path => path.search.toUpperCase()} />;
const route: ProtectedRouteProps = { isAllowed: true, redirectTo: { pathname: "/login", search: "?return=datos", hash: "#form" }, replace: false };
<ProtectedRoute {...route}><p>Permitido</p></ProtectedRoute>;
<ProtectedRoute isAllowed={false} />;

function SearchExample() {
  const search: UseSearchBarResult = useSearchBar();
  const change: React.ChangeEventHandler<HTMLInputElement> = search.handleChangeFilter;
  const keyUp: React.KeyboardEventHandler<HTMLInputElement> = search.handleChangeFilter;
  const event: SearchBarFilterEvent = { target: { value: "  Atlas  " } };
  search.handleChangeFilter(event);
  search.setFilter(undefined);
  search.setFilter("Atlas");
  search.setFilter(previous => previous?.toUpperCase());
  return <>
    <input onChange={change} onKeyUp={keyUp} />
    <SearchBar classes={["consumer", { active: true }]} onKeyUp={search.handleChangeFilter} onClick={() => search.filter?.toUpperCase()} />
    <SearchBar onKeyUp={event => { event.currentTarget.value.trim(); event.key.toUpperCase(); }} onClick={() => undefined} placeholder="Buscar" />
  </>;
}
<SearchExample />;

// @ts-expect-error The initial collapsed state is boolean.
<Accordion collapseDefault="false" />;
// @ts-expect-error Accordion does not forward native attributes.
<Accordion id="ignored" />;
// @ts-expect-error Breadcrumb requires its items and selection callback.
<Breadcrumb />;
// @ts-expect-error Crumbs require a path.
<Breadcrumb crumbs={[{ name: "Inicio" }]} selected={() => undefined} />;
// @ts-expect-error The callback receives the same path type as the items.
<Breadcrumb<number> crumbs={[{ name: "Nivel", path: 1 }]} selected={(path: string) => path.toUpperCase()} />;
// @ts-expect-error Both SearchBar callbacks are required because they are invoked directly.
<SearchBar />;
// @ts-expect-error SearchBar calls onClick without an event argument.
<SearchBar onKeyUp={() => undefined} onClick={(event: React.MouseEvent) => event.preventDefault()} />;
// @ts-expect-error SearchBar has no controlled value prop.
<SearchBar onKeyUp={() => undefined} onClick={() => undefined} value="ignored" />;
// @ts-expect-error ProtectedRoute requires an explicit access decision.
<ProtectedRoute />;
// @ts-expect-error Access is a boolean, rather than a session object.
<ProtectedRoute isAllowed={{ token: "test" }} />;
// @ts-expect-error Redirect destinations follow React Router's To contract.
<ProtectedRoute isAllowed={false} redirectTo={123} />;
// @ts-expect-error Replacement is boolean.
<ProtectedRoute isAllowed={false} replace="false" />;

function InvalidSearchExample() {
  const search = useSearchBar();
  // @ts-expect-error The filter is text or undefined.
  search.setFilter(123);
  // @ts-expect-error Events must expose an input value.
  search.handleChangeFilter({ target: { value: 123 } });
  // @ts-expect-error A button cannot provide the input currentTarget contract.
  search.handleChangeFilter({ currentTarget: document.createElement("button") });
  return null;
}
<InvalidSearchExample />;
