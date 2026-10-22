// @flow

import * as React from "react";
import {
  autoPlacement, autoUpdate, flip, limitShift, shift, arrow,
  useDismiss, useFloating, useInteractions, useMergeRefs,
} from "@floating-ui/react";

// Keep the placements accepted by the public API, including Popper's auto variants.
export type Placement =
  | "auto" | "auto-start" | "auto-end"
  | "top" | "top-start" | "top-end"
  | "right" | "right-start" | "right-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end";

const FloatingReferenceContext = React.createContext(null);

export function getElementRef(element) {
  return Object.getOwnPropertyDescriptor(element.props, "ref")?.value
    || Object.getOwnPropertyDescriptor(element, "ref")?.value;
}

export function FloatingProvider({ children, onDismiss, outsidePress = false, open }) {
  const [reference, setReference] = React.useState(null);
  const value = React.useMemo(() => ({ reference, setReference, onDismiss, outsidePress, open }),
    [reference, onDismiss, outsidePress, open]);
  return <FloatingReferenceContext.Provider value={value}>{children}</FloatingReferenceContext.Provider>;
}

export function FloatingReference({ children, rootRef }) {
  const context = React.useContext(FloatingReferenceContext);
  const setReference = context && context.setReference;
  const ref = useMergeRefs([setReference, rootRef]);
  return children({ ref, open: context && context.open });
}

export function usePositioning({ reference, open, placement = "bottom", arrowElement, onOpenChange }) {
  const automatic = placement.startsWith("auto");
  return useFloating({
    open,
    onOpenChange,
    placement: automatic ? "bottom" : placement,
    elements: { reference },
    // Surfaces are conditionally mounted; Floating UI cleans up on unmount.
    whileElementsMounted: autoUpdate,
    middleware: [
      automatic ? autoPlacement({ alignment: placement.split("-")[1] }) : flip(),
      shift({ padding: 4, limiter: limitShift() }),
      arrowElement && arrow({ element: arrowElement, padding: 4 }),
    ],
  });
}

export function FloatingSurface({ children, placement, open, rootRef, style, className }) {
  const context = React.useContext(FloatingReferenceContext);
  const floating = usePositioning({
    reference: context && context.reference,
    open,
    placement,
    onOpenChange: nextOpen => {
      if (!nextOpen && context && context.onDismiss) context.onDismiss();
    },
  });
  const dismiss = useDismiss(floating.context, { outsidePress: !!(context && context.outsidePress) });
  const { getFloatingProps } = useInteractions([dismiss]);
  const setFloating = floating.refs.setFloating;
  const ref = useMergeRefs([setFloating, rootRef]);
  if (!open) return null;
  return <div {...getFloatingProps()} className={className} ref={ref}
    data-placement={floating.placement} style={{ right: "auto", bottom: "auto", ...floating.floatingStyles, ...style }}>
    {children}
  </div>;
}
