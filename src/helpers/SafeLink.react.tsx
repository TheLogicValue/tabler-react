import * as React from "react";

const allowedProtocols = new Set(["http:", "https:", "mailto:", "tel:"]);

/** Keep the consumer's relative URL intact, but classify it with browser URL rules. */
export function safeNavigationUrl(value: string | undefined): string | undefined {
  if (typeof value !== "string") return undefined;
  if (Array.from(value).some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)) return undefined;
  try {
    return allowedProtocols.has(new URL(value, "https://tabler.invalid/").protocol) ? value : undefined;
  } catch {
    return undefined;
  }
}

type SafeLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  readonly RootComponent?: React.ElementType;
  readonly href?: string;
  readonly to?: string;
  readonly children?: React.ReactNode;
  readonly className?: string | ((props: { isActive: boolean }) => string);
  readonly exact?: boolean;
  readonly end?: boolean;
  readonly replace?: boolean;
  readonly state?: unknown;
  readonly disabled?: boolean;
};

/** Validate before crossing the boundary into a consumer-supplied routing root. */
const SafeLink = React.forwardRef<HTMLElement, SafeLinkProps>(function SafeLink(
  { RootComponent = "a", ...rest }, ref
) {
  const { href, to } = rest;
  const safeHref = safeNavigationUrl(href);
  const safeTo = safeNavigationUrl(to);
  const blocked = (href !== undefined && safeHref === undefined) || (to !== undefined && safeTo === undefined);
  if (blocked) {
    // Omitting `to` on a router Link can navigate to the current route. Render an
    // inert anchor instead and keep router-only props away from the DOM.
    const anchorProps = { ...rest };
    for (const key of ["href", "to", "exact", "end", "replace", "state"] as const) delete anchorProps[key];
    return <a {...anchorProps} className={typeof rest.className === "string" ? rest.className : undefined}
      aria-disabled="true" ref={ref as React.Ref<HTMLAnchorElement>} />;
  }
  const Component = RootComponent;
  return <Component {...rest} ref={ref} />;
});

export default SafeLink;
