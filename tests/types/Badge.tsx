import * as React from "react";
import Badge, { type BadgeProps } from "../../src/components/Badge";

// The migrated family keeps the same three public props and string color API.
const props: BadgeProps = { color: "custom-color", className: "consumer-badge" };
<Badge />;
<Badge {...props}>Pendiente</Badge>;
<Badge><strong>Estado</strong></Badge>;
<Badge>{0}</Badge>;

// @ts-expect-error color is a string, not a numeric status code.
<Badge color={123} />;
// @ts-expect-error className is a CSS string.
<Badge className={{ active: true }} />;
// @ts-expect-error Badge doesn't forward arbitrary DOM event props.
<Badge onClick={() => undefined} />;
// @ts-expect-error arbitrary objects cannot be rendered as children.
<Badge>{{ status: "Pendiente" }}</Badge>;
