import * as React from "react";
import Page, {
  type PageProps, type PageMainProps, type PageContentProps, type PageHeaderProps,
  type PageContentWithSidebarProps, type PageCardProps, type PageTitleProps,
  type PageMapHeaderProps, type PageSidebarProps, type PageSidebarHeaderProps,
  type PageBackProps, type PageOptionsProps, type PageSubTitleProps,
} from "../../src/components/Page";
import PageBack from "../../src/components/Page/PageBack.react";
import PageOptions from "../../src/components/Page/PageOptions.react";
import PageSubTitle from "../../src/components/Page/PageSubTitle.react";

const page: PageProps = { className: "consumer", children: "Página" };
const main: PageMainProps = { children: "Principal" };
const header: PageHeaderProps = { title: "Título", subTitle: "Subtítulo", back: <button type="button">Volver</button>, options: <button type="button">Guardar</button> };
const content: PageContentProps = { ...header, className: "consumer", children: "Contenido" };
const layout: PageContentWithSidebarProps = { header: <Page.Header {...header} />, sidebar: <nav>Lateral</nav>, children: "Contenido" };
const card: PageCardProps = { title: "Tarjeta", RootComponent: "article", header: <strong>Extra</strong>, footer: <small>Pie</small>, children: "Cuerpo" };
const title: PageTitleProps = { className: "consumer", children: "Título" };
const map: PageMapHeaderProps = { children: "Mapa" };
const logo: PageSidebarHeaderProps = { darkImageUrl: "/logo.svg", darkImageURL: "/ignored.svg", legacyOption: true };
const sidebar: PageSidebarProps = { headerProps: logo, nav: <nav>Navegación</nav> };
const back: PageBackProps = { className: "consumer", children: "Volver" };
const options: PageOptionsProps = { children: "Acciones" };
const subtitle: PageSubTitleProps = { children: "Subtítulo" };

<Page {...page}><Page.Main {...main} /><Page.Content {...content} /></Page>;
<Page.Header {...header}>Extra</Page.Header>;
<Page.ContentWithSidebar {...layout} />;
<Page.Card {...card} />;
<Page.Title {...title} />;
<Page.MapHeader {...map} />;
<Page.Sidebar {...sidebar} />;
<Page.Sidebar headerProps={{}} nav={null} />;
<PageBack {...back} />;
<PageOptions {...options} />;
<PageSubTitle {...subtitle} />;
function ConsumerRoot({ className, children }: { className: string; children?: React.ReactNode }) {
  return <section className={className}>{children}</section>;
}
<Page.Card RootComponent={ConsumerRoot}>Contenido</Page.Card>;
function RootWithRequiredProp({ destination }: { destination: string }) { return <a href={destination}>Destino</a>; }

// @ts-expect-error Page only accepts children and className.
<Page id="ignored" />;
// @ts-expect-error Page.Main does not forward className.
<Page.Main className="ignored" />;
// @ts-expect-error content titles keep their existing string contract.
<Page.Content title={123} />;
// @ts-expect-error subtitles keep their existing string contract.
<Page.Header subTitle={123} />;
// @ts-expect-error Page.Header does not forward DOM attributes.
<Page.Header className="ignored" />;
// @ts-expect-error sidebar layouts do not forward Page.Content's title prop.
<Page.ContentWithSidebar title="ignored" />;
// @ts-expect-error Page.Card's root only receives className and children.
<Page.Card RootComponent={RootWithRequiredProp} />;
// @ts-expect-error Page.Card does not forward DOM attributes.
<Page.Card id="ignored" />;
// @ts-expect-error Page.Title does not forward DOM event handlers.
<Page.Title onClick={() => undefined} />;
// @ts-expect-error map headers do not accept a URL prop.
<Page.MapHeader placeholder="ignored" />;
// @ts-expect-error the sidebar header configuration is required.
<Page.Sidebar nav={null} />;
// @ts-expect-error the sidebar navigation prop is required, though it may be null.
<Page.Sidebar headerProps={{}} />;
// @ts-expect-error the supported logo URL must be a string.
<Page.Sidebar nav={null} headerProps={{ darkImageUrl: 123 }} />;
// @ts-expect-error these helpers are not public static subcomponents of Page.
<Page.Back />;
// @ts-expect-error these helpers are not public static subcomponents of Page.
<Page.Options />;
// @ts-expect-error these helpers are not public static subcomponents of Page.
<Page.SubTitle />;
