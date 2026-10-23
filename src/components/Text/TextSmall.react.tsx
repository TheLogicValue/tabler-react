import * as React from "react";
import Text from "./";

export type TextSmallProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly color?: string;
  readonly wrap?: boolean;
  readonly muted?: boolean;
};

const TextSmall = ({
  className,
  children,
  color = "",
  wrap,
  muted,
}: TextSmallProps): React.ReactElement => {
  return (
    <Text
      RootComponent="small"
      color={color}
      size="sm"
      wrap={wrap}
      className={className}
      muted={muted}
    >
      {children}
    </Text>
  );
};

TextSmall.displayName = "Text.Small";

export default TextSmall;
