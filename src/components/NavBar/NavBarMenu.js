import React from "react"
import Icon from "../Icon"
import NavBarItem from "./NavBarItem"
import NavBarDropDown from "./NavBarDropDown"
import cn from "classnames"

export default function NavBarMenu({ items, rootIndex = 0 }) {
    return (
        <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
            {items.map(item => {
                const classes = cn("nav-item", item.className)
                return (
                    <li className={classes} key={item.value}>
                        {item.subItems ? <NavBarDropDown submenus={item.subItems} value={item.value} icon={item.icon}/>
                            : <NavBarItem
                                rootIndex={rootIndex}
                                LinkComponent={item.LinkComponent}
                                className={item.className}
                                to={item.to}
                                menuItem={true}
                                onClick={item.onClick}
                            >
                                <Icon name={item.icon} />{item.value}
                            </NavBarItem>
                        }
                    </li>
                )
            })}
        </ul>
    )
}