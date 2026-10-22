import React from "react"
import { NavLink } from "react-router-dom"
import cn from "classnames"
import Dropdown from "../Dropdown"

// Dropdown.Item's legacy `exact` property must not reach a DOM anchor in
// React Router 7. Keep the active link styling used by NavBarItem.
function MenuLink({ to, className, children, onClick }) {
    return <NavLink to={to} end onClick={onClick}
        className={({ isActive }) => cn("nav-link", className, { active: isActive })}>
        {children}
    </NavLink>
}

export default function NavBarDropDown({ value, submenus, icon }) {
    return <Dropdown isNavLink icon={icon} triggerContent={value} toggle
        position="bottom-start" arrow itemsObject={submenus.map(item => ({
            value: item.value,
            to: item.to,
            onClick: item.onClick,
            RootComponent: item.LinkComponent ? MenuLink : undefined,
        }))} />
}
