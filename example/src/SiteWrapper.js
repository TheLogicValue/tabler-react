import { Site, NavBarMenu, Grid, Button } from "tabler-react"
import Config from './Config.json'

const basename = process.env.REACT_APP_BASENAME
const baseimages = process.env.REACT_APP_BASE_IMAGES

const t = {
    "copyright": "All rights reserved",
    "logout": "Logout",
    "logoutText": "This a logout button"
}

const pages = [
    { value: "Login", to: "/login", type: "link", LinkComponent: true },
    { value: "Forgot password", to: "/forgot-password", type: "link", LinkComponent: true },
    { value: "Profile", to: "/profile", type: "link", LinkComponent: true },
    { value: "Register", to: "/register", type: "link", LinkComponent: true },
    { value: "Error 400", to: "/400", type: "link", LinkComponent: true },
    { value: "Error 401", to: "/401", type: "link", LinkComponent: true },
    { value: "Error 403", to: "/403", type: "link", LinkComponent: true },
    { value: "Error 404", to: "/404", type: "link", LinkComponent: true },
    { value: "Error 500", to: "/500", type: "link", LinkComponent: true },
    { value: "Error 503", to: "/503", type: "link", LinkComponent: true },
    { value: "Empty", to: "/empty", type: "link", LinkComponent: true },
]

const comoponents = [
    { value: "Button", to: "/button", type: "link", LinkComponent: true },
    { value: "DataTables", to: "/dataTables", type: "link", LinkComponent: true },
    { value: "Icon", to: "/icon", type: "link", LinkComponent: true },
    { value: "Loaders", to: "/loaders", type: "link", LinkComponent: true },
    { value: "Modal", to: "/modal", type: "link", LinkComponent: true },
    { value: "Tabs", to: "/tabs", type: "link", LinkComponent: true },
]

const interfaces = [
    { value: "Cards", to: "/cards", type: "link", LinkComponent: true },
    // { value: "Condensed Nav", to: "/condensed-nav", type: "link", LinkComponent: true },
    { value: "Pricing Cards", to: "/pricing-cards", type: "link", LinkComponent: true },
    { value: "Vertical Nav", to: "/vertical-nav", type: "link", LinkComponent: true },
]

const menu = [
    { value: "Home", icon: "home", to: "/", type: "link", LinkComponent: true },
    { value: "Interface", icon: "box", subItems: interfaces },
    { value: "Components", icon: "calendar", subItems: comoponents },
    { value: "Pages", icon: "file", subItems: pages }
]

const settings = {
    "userName": "John Doe",
    "role": "User",
    "avatarURL": baseimages + "faces/male/16.jpg"
}

// const notificationsObjects = [
//     {
//         unread: true,
//         avatarURL: baseimages+"faces/male/41.jpg",
//         message: <><strong>Santi</strong> updated tabler</>,
//         time: "10 minutes ago",
//     },
//     {
//         unread: true,
//         avatarURL: "demo/faces/female/1.jpg",
//         message: <><strong>Alice</strong> started new task: Tabler UI design.</>,
//         time: "1 hour ago",
//     },
//     {
//         unread: false,
//         avatarURL: baseimages+"faces/female/18.jpg",
//         message: <><b>Rose</b> deployed new version of NodeJS REST Api // V3</>,
//         time: "2 hours ago",
//     },
// ]

const footerNav = <>
    {/* <Grid.Col auto={true}>
        <List className="list-inline list-inline-dots mb-0">
            <List.Item className="list-inline-item">
                <a href="./docs/index.html">Documentation</a>
            </List.Item>
            <List.Item className="list-inline-item">
                <a href="./faq.html">FAQ</a>
            </List.Item>
        </List>
    </Grid.Col> */}
    <Grid.Col auto={true}>
        <Button
            href="https://github.com/thelogicvalue/tabler-react"
            size="sm"
            outline
            color="primary"
            RootComponent="a"
        >
            Source code
        </Button>
    </Grid.Col>
</>

export default function SiteWrapper({ children, condensed = false, vertical = false }) {
    // const [notification, setNotification] = useState(notificationsObjects || [])
    // const unreadCount = notification.reduce((a, v) => a || v.unread, false)
    // const markAllAsRead = () => {
    //     let not = notification.map(v => ({ ...v, unread: false }))
    //     console.log(not)
    //     setTimeout(() => {
    //         let not =notification.map(v => ({ ...v, unread: true }))
    //         console.log(not)
    //     }, 5000)
    // }

    const items = menu
    const copyright = <>
        {Config.appName} {process.env.REACT_APP_VERSION} © {new Date().getFullYear()}  {t.copyright}.
    </>

    const links = [
        <a href="!#">First Link</a>,
        <a href="!#">Second Link</a>,
        <a href="!#">Third Link</a>,
        <a href="!#">Fourth Link</a>,
        <a href="!#">Five Link</a>,
        <a href="!#">Sixth Link</a>,
        <a href="!#">Seventh Link</a>,
        <a href="!#">Eigth Link</a>,
    ]

    const note = "Premium and Open Source dashboard template with responsive and high quality UI. For Free!"

    const accountDropdownProps = {
        name: settings?.userName,
        description: settings?.role,
        avatarURL: settings?.avatarURL ?? Config.avatarURL,
        options: [
            { icon: "user", value: "Profile" },
            { icon: "settings", value: "Settings" },
            { icon: "mail", value: "Inbox", badge: "6" },
            { icon: "send", value: "Message" },
            { isDivider: true },
            { icon: "help-circle", value: "Need help?" },
            { icon: "log-out", value: t.logout, onClick: () => alert(t.logoutText) }
        ]
    }

    return (
        <Site.Wrapper
            condensed={condensed}
            vertical={vertical}
            // notificationsTray={{
            //     notificationsObjects: notification,
            //     markAllAsRead: () => markAllAsRead(),
            //     unread: unreadCount
            // }}
            headerProps={{
                href: basename,
                alt: "Tabler React",
                imageURL: baseimages + "brand/tabler.svg",
                darkImageUrl: baseimages + "brand/tabler-white.svg",
                accountDropdown: accountDropdownProps,
                navItems: { itemsObjects: items },
            }}
            navProps={{
                items: <NavBarMenu items={items} />,
                stickyTop: true
            }}
            footerProps={{ copyright: copyright, nav: footerNav, links: links, note: note }}
        >
            {children}
        </Site.Wrapper >
    )
}