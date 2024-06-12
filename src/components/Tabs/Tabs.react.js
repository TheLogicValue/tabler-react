// @flow
import { forwardRef, useImperativeHandle, useState } from "react"
import TabbedContainer from "./TabbedContainer.react"
import TabbedHeader from "./TabbedHeader.react"
import cn from "classnames"

import "./Tabs.css"

const Tabs = forwardRef(({ children, options, className, modal, initialTab }, ref) => {
  const [selectedTitle, setTitle] = useState(initialTab)
  const classes = cn("card", className)

  useImperativeHandle(ref, () => {
    return {
      activeTab: selectedTitle,
    }
  })

  return (
    <div className={classes}>
      <TabbedHeader
        selectedTitle={selectedTitle}
        modal={modal}
        stateCallback={newTitle => setTitle(newTitle)}
        options={options}
      >
        {children}
      </TabbedHeader>
      <TabbedContainer selectedTitle={selectedTitle}>
        {children}
      </TabbedContainer>
    </div>
  )
})

export default Tabs;
