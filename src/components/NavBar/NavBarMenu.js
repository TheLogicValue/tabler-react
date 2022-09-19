import { useState, useEffect, useRef } from "react"
import Icon from "../Icon"
import NavBarItem from "./NavBarItem"
import NavBarDropDown from "./NavBarDropDown"
import cn from "classnames"

export default function NavBarMenu ({ item }) {
    const [dropdown, setDropdown] = useState(false)
    const classes = cn("nav-item", { "show": dropdown }, item.className)
    const ref = useRef()

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

    return (
        <li className={classes} ref={ref}>
            {item.subItems ? (
                <>
                    <div
                        aria-haspopup="menu"
                        className="nav-link-item"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        <Icon name={item.icon} />
                        <span className="nav-link-title">
                            {item.value}
                        </span>
                        <Icon name="chevron-down" className="text-right" />
                    </div>
                    <NavBarDropDown submenus={item.subItems} dropdown={dropdown} triggerEvent={() => setDropdown(false)} />
                </>
            ) : (
                <NavBarItem
                    LinkComponent={item.LinkComponent}
                    className={item.className}
                    to={item.to}
                    menuItem={true}
                    onClick={item.onClick}
                >
                    <Icon name={item.icon} />{item.value}
                </NavBarItem>)}
        </li>
    )
}