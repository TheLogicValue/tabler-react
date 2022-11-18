import React from "react"
import cn from "classnames"
import Form from "../Form"
import { Button } from "../Button"
import './SearchBar.css'

export default function Search({ classes, onKeyUp, onClick, placeholder = "Search for..." }) {
    const className = cn("input-search-bar", classes)
    return (
        <Form.Group className={className}>
            <Form.Input placeholder={placeholder}
                onKeyUp={(e) => onKeyUp(e)}
            />
            <Button color="outline" icon="search" onClick={() => onClick()} />
        </Form.Group>
    )
}