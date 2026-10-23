import * as React from "react"
import Button, { type ButtonNativeProps } from "./Button.react"
import Spinner, { type SpinnerProps } from "../IconAnimate/Spinner"

export type ButtonModalProps = {
    readonly text?: React.ReactNode;
    readonly onClick?: ButtonNativeProps["onClick"];
    readonly color?: string;
    readonly spin?: boolean;
    readonly width?: SpinnerProps["width"];
    readonly height?: SpinnerProps["height"];
};

const ButtonModal = ({ text, onClick, color, spin = false, width, height }: ButtonModalProps): React.ReactElement => {
    return spin ? <Spinner height={height} width={width} /> : <Button type="button" onClick={onClick} square size="lg" color={color}>
        {text}
    </Button>
}

export default ButtonModal
