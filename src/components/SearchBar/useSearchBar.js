import { useCallback, useState } from 'react'

export default function useSearchBar() {
    const [filter, setFilter] = useState(undefined)

    const handleChangeFilter = useCallback((e) => {
        console.log(e)
        setFilter(e.target.value.trim().length > 0 ? e.target.value.trim() : undefined)
    }, [setFilter])

    return {
        filter,
        setFilter,
        handleChangeFilter
    }
} 