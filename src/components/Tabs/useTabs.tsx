import React, { useState, useCallback } from "react";
import TabbedContainer from "./TabbedContainer.react";
import TabbedHeader from "./TabbedHeader.react";
import cn from "classnames";
import "./Tabs.css";
import type { TabsProps } from "./Tabs.react";
export type UseTabsResult = {
  readonly Tabs: React.ComponentType<TabsProps>;
  readonly selectedTitle: string | null;
};
export default function useTabs(): UseTabsResult {
  const [selectedTitle, setTitle] = useState<string | null>(null);
  const Tabs = useCallback(({
    children,
    options,
    className,
    modal,
    initialTab
  }: TabsProps) => {
    const classes = cn("card", className);
    return <div className={classes}>
                <TabbedHeader selectedTitle={selectedTitle ?? initialTab} modal={modal} stateCallback={newTitle => setTitle(newTitle)} options={options}>
                    {children}
                </TabbedHeader>
                <TabbedContainer selectedTitle={selectedTitle ?? initialTab}>
                    {children}
                </TabbedContainer>
            </div>;
  }, [selectedTitle]);
  return {
    Tabs,
    selectedTitle
  };
}
