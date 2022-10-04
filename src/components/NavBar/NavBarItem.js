import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import cn from "classnames"

const NavBarItem = ({
    className,
    to,
    LinkComponent,
    menuItem,
    value,
    children,
    onClick = () => null
}) => {
    const route = to?.substring(1).split("/")
    const location = useLocation()
    const classes = cn("nav-link", { "nav-link-item": menuItem }, { "active": location.pathname.includes(route?.length > 1 && route[0]) }, className)

    if (LinkComponent) return <NavLink to={to} className={classes} end>{value || children}</NavLink>
    else return <a className={classes} href={to} onClick={onClick}>{value || children}</a>
}
export default NavBarItem