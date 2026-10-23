import * as React from "react";
import cn from "classnames";
import { useDismiss, useFocus, useHover, useInteractions, useMergeRefs, useRole } from "@floating-ui/react";
import { getElementRef, usePositioning } from "../../helpers/Floating.react";
import type { Placement } from "../../helpers/Floating.react";
import "./Tooltip.css";

export type TooltipTriggerProps = React.HTMLAttributes<HTMLElement> & {
  readonly ref?: React.Ref<HTMLElement>;
  readonly rootRef?: React.Ref<HTMLElement>;
};

export type TooltipProps = {
  readonly children?: React.ReactElement<TooltipTriggerProps>;
  readonly className?: string;
  readonly content: string;
  readonly placement?: Placement;
  readonly type?: "link";
};

function Tooltip({ children, className, content, placement = "bottom" }: TooltipProps): React.ReactElement {
  const [isShown, setIsShown] = React.useState(false);
  const [reference, setReference] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(null);
  const floating = usePositioning({ reference, open: isShown, placement, arrowElement, onOpenChange: setIsShown });
  const hover = useHover(floating.context, { move: false });
  const focus = useFocus(floating.context);
  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);
  // React 19 puts ref in props; React 18 stores it on the element. Avoid
  // reading either version's deprecated getter and keep the consumer's ref.
  const childRef = children && getElementRef(children);
  const ref = useMergeRefs<HTMLElement>([setReference, childRef, children && children.props.rootRef]);
  const side = floating.placement.split("-")[0];
  const arrowData = floating.middlewareData.arrow;
  return <>
    {children && React.cloneElement(children, {
      ...getReferenceProps(children.props),
      ...(typeof children.type === "string" || ("$$typeof" in children.type && children.type.$$typeof)
        ? { ref } : { rootRef: ref }),
    })}
    {isShown && <div {...getFloatingProps()} ref={floating.refs.setFloating}
      className={cn("tooltip", "bs-tooltip-" + side, "show", className)}
      data-placement={floating.placement} style={floating.floatingStyles}>
      <div ref={setArrowElement} className={cn("arrow", side === "top" || side === "bottom"
        ? "tbr-arrow-vertical" : "tbr-arrow-horizontal")}
        style={{ left: arrowData?.x, top: arrowData?.y }} />
      <div className="tooltip-inner">{content}</div>
    </div>}
  </>;
}

export default Tooltip;
