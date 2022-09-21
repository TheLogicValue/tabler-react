import * as React from "react"
import { Button, Spinner } from "../"

const ButtonModal = ({ text, onClick, color, spin = false, width, height }) => {
    return spin ? <Spinner height={height} width={width} /> : <Button onClick={onClick} square size="lg" color={color}>
        {text}
    </Button>
}

export default ButtonModal