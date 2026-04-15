export function IconFilter(props) {
    const { value, selected } = props
    return (
        <span style={{ display: "flex", alignItems: "center" }}>
            <input
                type="checkbox"
                readOnly
                checked={selected}
                style={{ marginRight: "4px" }}
            />
            {value}
        </span>
    )
}