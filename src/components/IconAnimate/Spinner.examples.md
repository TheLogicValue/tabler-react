# Spinner example
## Example how works spinner, when data is true spinner is showing.
```jsx

const [data, setData] = UseState(false)
<Button color="primary" onClick={onclick} className="button">
    {data ? <Spinner /> : "Button"
</Button>

```