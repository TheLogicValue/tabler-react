import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import cn from "classnames"
import type { NavBarItemProps } from "./types"

const NavBarItem = ({
    className,
    to,
    LinkComponent,
    menuItem,
    value,
    rootIndex = 0,
    children,
    onClick = () => null
}: NavBarItemProps): React.ReactElement => {
    const route = to?.substring(1).split("/")
    const location = useLocation()
    const segment = route?.[rootIndex]
    const classes = cn("nav-link", { "nav-link-item": menuItem }, { 
        "active": !!(segment && location.pathname.includes(segment)) || (location.pathname.at(-1) == "/" && route?.[0] === "")
    }, className)

    if (LinkComponent) return <NavLink to={to ?? ""} className={classes} end>{value || children}</NavLink>
    else return <a className={classes} href={to} onClick={onClick}>{value || children}</a>
}
export default NavBarItem
