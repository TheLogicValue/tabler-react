import * as React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../src/components/BlogCard";
import ContactCard, { type ContactDetail, type ContactCardProps } from "../../src/components/ContactCard";
import DoubleCard from "../../src/components/DoubleCard";
import ProgressCard from "../../src/components/ProgressCard";
import StampCard from "../../src/components/StampCard";
import StatsCard from "../../src/components/StatsCard";
import StoreCard from "../../src/components/StoreCard";
import TabbedCard from "../../src/components/TabbedCard";
import GalleryCard from "../../src/components/GalleryCard";
import PricingCard from "../../src/components/PricingCard";
import Timeline from "../../src/components/Timeline";
import { Tab } from "../../src/components/Tabs";

<BlogCard title="Publicación" imgSrc="/post.svg" avatarImgSrc="/avatar.svg" postHref="/noticias" profileHref="/perfil" iconHref="/favoritos" iconName="heart" aside />;
const details: ReadonlyArray<ContactDetail> = [{ title: "Correo", content: <a href="mailto:equipo@example.com">Equipo</a> }];
const contact: ContactCardProps = { name: "Equipo", address: { line1: "Oficina", line2: "Planta 2" }, details, description: { title: "Descripción", content: "Equipo de prueba" }, map: <div>Mapa del consumidor</div> };
<ContactCard {...contact} avatar objectURL="/avatar.svg">Información adicional</ContactCard>;
<ContactCard description="Texto simple" mapPlaceholder="/map.svg" />;
<DoubleCard title={<strong>Comparación</strong>} firstValue={94} firstlabel="Cartera" secondValue={<span>80%</span>} secondlabel="Referencia" classColorValue={null} />;
<ProgressCard header="Cobertura" content={<strong>65%</strong>} progressWidth={65} progressColor="green" />;
<StampCard icon="file" color="blue" header={12} footer={<span>Disponibles</span>}>Contenido</StampCard>;
<StatsCard movement={4.2} total="1.200" label="Registros" layout={2} chart={<svg />} />;
<StoreCard title="Producto" price="12 €" subtitle="Descripción" imgUrl="/product.svg" imgAlt="Producto" />;
const tabsRef = React.createRef<TabbedCard>();
<TabbedCard ref={tabsRef} initialTab="Uno"><Tab title="Uno">Primer panel</Tab>{false}{[<Tab key="dos" title="Dos">Segundo panel</Tab>, null]}</TabbedCard>;
tabsRef.current?.setState({ selectedTitle: "Dos" });

<GalleryCard><GalleryCard.Image src="/image.svg" alt="Imagen" RootComponent={Link} to="/imagen" rounded={false} />
  <GalleryCard.Footer><GalleryCard.Details avatarURL="/avatar.svg" fullName="Ana" dateString="Ahora" />
    <GalleryCard.IconGroup><GalleryCard.IconItem name="heart" label="Ver" href="/favoritos" right /></GalleryCard.IconGroup>
  </GalleryCard.Footer>
</GalleryCard>;
<GalleryCard.Details fullName={null} dateString={null}>Detalles manuales</GalleryCard.Details>;
<GalleryCard.IconItem RootComponent={Link} to="/imagen" name="eye" />;
<PricingCard category={<strong>Plan básico</strong>} active>
  <PricingCard.Category>Otra categoría</PricingCard.Category><PricingCard.Price>10 €</PricingCard.Price>
  <PricingCard.AttributeList><PricingCard.AttributeItem available hasIcon>Característica</PricingCard.AttributeItem></PricingCard.AttributeList>
  <PricingCard.Button active href="/planes" onClick={event => { event.preventDefault(); event.currentTarget.tagName.toLowerCase(); }}>Ver plan</PricingCard.Button>
  <PricingCard.Button RootComponent={Link} to="/planes">Enlace del consumidor</PricingCard.Button>
</PricingCard>;
<Timeline><Timeline.Item title="Informe creado" description="Disponible" badge badgeColor="green" active time="10:30" />
  <Timeline.Item><Timeline.ItemBadge color="blue" /><Timeline.ItemTitle active>Título manual</Timeline.ItemTitle>
    <Timeline.ItemDescription>Descripción manual</Timeline.ItemDescription><Timeline.ItemTime active>10:40</Timeline.ItemTime>
  </Timeline.Item>
</Timeline>;

// @ts-expect-error BlogCard retains string titles.
<BlogCard title={123} />;
// @ts-expect-error Contact details require their heading.
<ContactCard details={[{ content: "Sin título" }]} />;
// @ts-expect-error Description objects retain their string content.
<ContactCard description={{ title: "Descripción", content: <span>Texto</span> }} />;
// @ts-expect-error DoubleCard color is a string or null.
<DoubleCard classColorValue={123} />;
// @ts-expect-error Progress percentages are numeric.
<ProgressCard progressWidth="65%" />;
// @ts-expect-error Only two statistic layouts exist.
<StatsCard movement={0} total="0" label="Total" layout={3} />;
// @ts-expect-error StatsCard requires a numeric movement.
<StatsCard movement="4%" total="1.200" label="Total" />;
// @ts-expect-error StoreCard does not expose a purchase callback.
<StoreCard onClick={() => undefined} />;
// @ts-expect-error TabbedCard requires the initial tab title.
<TabbedCard><Tab title="Uno" /></TabbedCard>;
// @ts-expect-error TabbedCard receives Tab elements rather than text.
<TabbedCard initialTab="Uno">Texto</TabbedCard>;
// @ts-expect-error Gallery images require their source.
<GalleryCard.Image />;
// @ts-expect-error Gallery icon items require an icon name.
<GalleryCard.IconItem label="Ver" />;
// @ts-expect-error Footer only exposes children.
<GalleryCard.Footer className="ignored" />;
// @ts-expect-error Availability is boolean.
<PricingCard.AttributeItem available="true" />;
// @ts-expect-error Pricing actions receive an HTMLElement, not an input.
<PricingCard.Button onClick={event => event.currentTarget.checked} />;
// @ts-expect-error Pricing actions do not forward arbitrary props.
<PricingCard.Button type="button" />;
// @ts-expect-error Timeline time remains text.
<Timeline.Item time={123} />;
// @ts-expect-error Timeline title active is boolean.
<Timeline.ItemTitle active="true">Título</Timeline.ItemTitle>;
// @ts-expect-error Description only exposes children.
<Timeline.ItemDescription className="ignored">Texto</Timeline.ItemDescription>;
