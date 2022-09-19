import NavBarItem from "./NavBarItem"

const NavBarDropDown = ({ submenus, dropdown, triggerEvent = () => null }) => {
    return (
        <ul className={`dropdown-menu dropdown-menu-left dropdown-menu-arrow ${dropdown ? "show" : ""}`} onClick={triggerEvent}>
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
    )
}
export default NavBarDropDown