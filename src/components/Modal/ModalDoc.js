import "./ModalDoc.css"
import * as React from "react"
import { Tab, Tabs } from "../Tabs"
import { Button, ButtonModal } from "../Button"
import cn from "classnames"

export default function ModalDoc({ 
    items, 
    initialTab, 
    className, 
    spin, 
    bodyHeight, 
    onClose, 
    onAccept, 
    show = true, 
    acceptText = "Ok",
    pathname, 
}) {
    const classnames = cn("modal modal-blur fade", { show }, className)
    const tabs = pathname == "/" ? items : items.filter(tab => tab.value != "features");

    return (
        <div className={classnames}>
            <div className={"modal-dialog modal-lg modal-dialog-centered"}>
                <div className="modal-content">
                    {tabs.length > 1 ? <Tabs
                        initialTab={initialTab}
                        modal={true}
                        options={<Button type="button" className="nodal-header-close" onClick={onClose}>X</Button>}
                    >
                        {tabs.map(item =>
                            <Tab key={item.title} title={item.title} style={{ padding: 0 }}>
                                <div className="modal-body" style={{ height: bodyHeight }}>
                                    {item.children}
                                </div>
                            </Tab>
                        )}
                    </Tabs> : <>
                        <div className="modal-header">
                            <h5 className="modal-title">{tabs[0].title}</h5>
                            <Button type="button" className="nodal-header-close" onClick={onClose}>X</Button>
                        </div>
                        <div className="modal-body" style={{ height: bodyHeight }}>
                            {tabs[0].children}
                        </div>
                    </>}
                    <div className="modal-footer">
                        <ButtonModal onClick={onAccept} color="primary" text={acceptText} spin={spin} />
                    </div>
                </div>
            </div>
        </div>
    )
}