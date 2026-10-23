import React from "react"
import cn from "classnames"
import Form from "../Form"
import { Button } from "../Button"
import './SearchBar.css'

export type SearchBarProps = {
    readonly classes?: cn.Argument;
    readonly onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
    readonly onClick: () => void;
    readonly placeholder?: string;
};

export default function SearchBar({ classes, onKeyUp, onClick, placeholder = "Search for..." }: SearchBarProps): React.ReactElement {
    const className = cn("input-search-bar", classes)
    return (
        <Form.Group className={className}>
            <Form.Input placeholder={placeholder}
                onKeyUp={(e) => onKeyUp(e)}
            />
            <Button type="button" color="outline" icon="search" onClick={() => onClick()} />
        </Form.Group>
    )
}
