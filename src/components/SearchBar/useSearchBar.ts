import { useCallback, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// React key events expose the input through currentTarget. Keep accepting the
// original target.value shape for change events and consumer-created events.
export type SearchBarFilterEvent =
    | { readonly target: { readonly value: string } }
    | { readonly currentTarget: HTMLInputElement };

export type UseSearchBarResult = {
    readonly filter: string | undefined;
    readonly setFilter: Dispatch<SetStateAction<string | undefined>>;
    readonly handleChangeFilter: (event: SearchBarFilterEvent) => void;
};

export default function useSearchBar(): UseSearchBarResult {
    const [filter, setFilter] = useState<string | undefined>(undefined)

    const handleChangeFilter = useCallback((event: SearchBarFilterEvent) => {
        const value = ("currentTarget" in event ? event.currentTarget.value : event.target.value).trim()
        setFilter(value.length > 0 ? value : undefined)
    }, [setFilter])

    return {
        filter,
        setFilter,
        handleChangeFilter
    }
}
