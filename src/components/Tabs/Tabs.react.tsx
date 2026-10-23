import React, { forwardRef, useImperativeHandle, useState } from "react";
import TabbedContainer from "./TabbedContainer.react";
import TabbedHeader from "./TabbedHeader.react";
import cn from "classnames";
import "./Tabs.css";
import type { TabChildren } from "./Tab.react";
export type TabsProps = {
  readonly children: TabChildren;
  readonly options?: React.ReactNode;
  readonly className?: string;
  readonly modal?: boolean;
  readonly initialTab?: string;
};
export type TabsHandle = {
  readonly activeTab: string | undefined;
};
const Tabs = forwardRef<TabsHandle, TabsProps>(({
  children,
  options,
  className,
  modal,
  initialTab
}: TabsProps, ref) => {
  const [selectedTitle, setTitle] = useState(initialTab);
  const classes = cn("card", className);
  useImperativeHandle(ref, () => {
    return {
      activeTab: selectedTitle
    };
  });
  return <div className={classes}>
      <TabbedHeader selectedTitle={selectedTitle} modal={modal} stateCallback={newTitle => setTitle(newTitle)} options={options}>
        {children}
      </TabbedHeader>
      <TabbedContainer selectedTitle={selectedTitle}>
        {children}
      </TabbedContainer>
    </div>;
});
Tabs.displayName = "Tabs";
export default Tabs;
