// @flow
import React, { forwardRef, useImperativeHandle, useState } from "react"
import TabbedContainer from "./TabbedContainer.react"
import TabbedHeader from "./TabbedHeader.react"
import cn from "classnames"

import "./Tabs.css"

const Tabs = forwardRef(({ children, options, className, modal, initialTab = 1 }, ref) => {
  const [selectedTab, setTab] = useState(initialTab)
  const classes = cn("card", className)

  useImperativeHandle(ref, () => {
    return {
      activeTab: selectedTab,
    }
  })

  return (
    <div className={classes}>
      <TabbedHeader
        selectedTab={selectedTab}
        modal={modal}
        stateCallback={id => setTab(id)}
        options={options}
      >
        {children}
      </TabbedHeader>
      <TabbedContainer selectedTab={selectedTab}>
        {children}
      </TabbedContainer>
    </div>
  )
})

export default Tabs;
