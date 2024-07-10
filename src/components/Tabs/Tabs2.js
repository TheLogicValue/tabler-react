// @flow
import React, { useState } from "react"
import TabbedContainer from "./TabbedContainer.react"
import TabbedHeader from "./TabbedHeader.react"
import cn from "classnames"
import "./Tabs.css"

export default function Tabs2() {

    const [selectedTitle, setTitle] = useState(null)
    const Tabss = ({ children, options, className, modal, initialTab }) => {
        const classes = cn("card", className)

        return (
            <div className={classes}>
                <TabbedHeader
                    selectedTitle={selectedTitle ?? initialTab}
                    modal={modal}
                    stateCallback={newTitle => setTitle(newTitle)}
                    options={options}
                >
                    {children}
                </TabbedHeader>
                <TabbedContainer selectedTitle={selectedTitle ?? initialTab}>
                    {children}
                </TabbedContainer>
            </div>
        )
    }
    return { Tabss, selectedTitle }
}
