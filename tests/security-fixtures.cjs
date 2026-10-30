// Shared cases exercise the published package, including consumer routing roots.
module.exports = function navigationCases(React, lib, Link) {
  const h = React.createElement
  const cssPayload = 'x);position:fixed;inset:0;z-index:999999;/*'
  const custom = (to, children) => ({ RootComponent: Link, to, children })
  return [
    ['Tag.href', url => h(lib.Tag, { link: true, href: url, avatar: cssPayload }, 'Open')],
    ['Tag.to', url => h(lib.Tag, custom(url, 'Open'))],
    ['Tag.AddOn.href', url => h(lib.Tag.AddOn, { link: true, href: url }, 'Open')],
    ['Tag.AddOn.to', url => h(lib.Tag.AddOn, custom(url, 'Open'))],
    ['Alert.Link', url => h(lib.Alert.Link, { href: url }, 'Open')],
    ['Nav.Link.native', url => h(lib.Nav.Link, { to: url }, 'Open')],
    ['Nav.Link.custom', url => h(lib.Nav.Link, custom(url, 'Open'))],
    ['Nav.SubmenuItem.custom', url => h(lib.Nav.SubmenuItem, custom(url, 'Open'))],
    ['Button.native', url => h(lib.Button, { RootComponent: 'a', href: url }, 'Open')],
    ['Button.custom', url => h(lib.Button, custom(url, 'Open'))],
    ['List.GroupItem.native', url => h(lib.List.GroupItem, { to: url }, 'Open')],
    ['List.GroupItem.custom', url => h(lib.List.GroupItem, custom(url, 'Open'))],
    ['PricingCard.Button.native', url => h(lib.PricingCard.Button, { href: url }, 'Open')],
    ['PricingCard.Button.custom', url => h(lib.PricingCard.Button, { ...custom(url, 'Open'), href: url })],
    ['GalleryCard.Image.native', url => h(lib.GalleryCard.Image, { href: url, src: '/pixel.svg', alt: 'Open' })],
    ['GalleryCard.Image.custom', url => h(lib.GalleryCard.Image, { ...custom(url), src: '/pixel.svg', alt: 'Open' })],
    ['GalleryCard.IconItem.native', url => h(lib.GalleryCard.IconItem, { href: url, name: 'heart', label: 'Open' })],
    ['GalleryCard.IconItem.custom', url => h(lib.GalleryCard.IconItem, { ...custom(url), name: 'heart', label: 'Open' })],
    ['Dropdown.Item.native', url => h(lib.Dropdown.Item, { to: url }, 'Open')],
    ['Dropdown.Item.custom', url => h(lib.Dropdown.Item, custom(url, 'Open'))],
    ['Site.Logo', url => h(lib.Site.Logo, { href: url, alt: 'Open' })],
    ['Site.Header', url => h(lib.Site.Header, { href: url, alt: 'Open' })],
    ['SocialNetworksList', url => h(lib.SocialNetworksList, { itemsObjects: [{ name: 'github', to: url }] })],
    ...[false, true].map(aside => ['BlogCard.' + aside, url => h(lib.BlogCard, { aside, postHref: url, profileHref: url, iconHref: url, title: 'Open', authorName: 'Author', imgSrc: aside ? cssPayload : '/pixel.svg', avatarImgSrc: cssPayload })]),
    ...[false, true].map(LinkComponent => ['NavBarMenu.' + LinkComponent, url => h(lib.NavBarMenu, { items: [{ value: 'Open', to: url, LinkComponent }] })]),
  ]
}
