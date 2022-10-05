import React, { useState, useEffect, useRef } from "react"
import Icon from "../Icon"
import NavBarItem from "./NavBarItem"
import cn from "classnames"

const NavBarDropDown = ({ value, submenus, icon }) => {
    const [dropdown, setDropdown] = useState(false)
    const ref = useRef()
    const classes = cn("nav-link-item", { "show": dropdown })

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target))
                setDropdown(false)
        }
        document.addEventListener("mousedown", handler)
        document.addEventListener("touchstart", handler)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler)
            document.removeEventListener("touchstart", handler)
        }
    }, [dropdown])

    return <div ref={ref} key={value}>
        <div
            aria-haspopup="menu"
            className={classes}
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}

        >
            <Icon name={icon} />
            <span className="nav-link-title">
                {value}
            </span>
            <Icon name="chevron-down" className="text-right" />
        </div>
        <ul className={`dropdown-menu dropdown-menu-left dropdown-menu-arrow ${dropdown ? "show" : ""}`} onClick={() => setDropdown(false)}>
            {submenus.map(item => (
                <NavBarItem
                    LinkComponent={item.LinkComponent}
                    className="dropdown-item"
                    to={item.to}
                    menuItem={false}
                    onClick={item.onClick}
                    key={item.value}
                >
                    {item.value}
                </NavBarItem>
            )
            )}
        </ul>
    </div>
}
export default NavBarDropDown