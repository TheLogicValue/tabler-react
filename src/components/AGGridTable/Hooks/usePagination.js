import { useReducer } from "react"

const ACTIONS = {
    NEXT_PAGE: "next_page",
    PREVIOUS_PAGE: "previous_page",
    FIRST_PAGE: "first_page",
    LAST_PAGE: "last_page"
}

const ACTIONS_REDUCERS = {
    [ACTIONS.NEXT_PAGE]: (state, action) => {
        const rows = state.numRows + action.pageSize
        return {
            ...state,
            page: state.page + 1,
            numRows: rows,
            numRowsOf: (rows - 1) + action.pageSize
        }
    },
    [ACTIONS.PREVIOUS_PAGE]: (state, action) => {
        const rows = state.numRows - action.pageSize
        return {
            ...state,
            page: state.page - 1,
            numRows: rows,
            numRowsOf: (rows - 1) + action.pageSize
        }
    },
    [ACTIONS.FIRST_PAGE]: (state, action) => {
        let rows = action.pageSize
        if (action.totalElements < action.pageSize) rows = action.totalElements
        return {
            ...state,
            page: 1,
            numRows: 1,
            numRowsOf: rows
        }
    },
    [ACTIONS.LAST_PAGE]: (state, action) => {
        const visibleRows = action.totalElements - ((action.lastPage - 1) * action.pageSize)
        return {
            ...state,
            page: action.lastPage,
            numRows: action.totalElements - visibleRows + 1,
            numRowsOf: action.totalElements
        }
    }
}

const reducer = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.type]
    return actionReducer ? actionReducer(state, action) : state
}

export default function usePagination({ initialPage = 1, initialNumRows = 1, initialNumRowsOf } = {}) {
    const [state, dispatch] = useReducer(reducer, {
        page: initialPage,
        numRows: initialNumRows,
        numRowsOf: initialNumRowsOf
    })

    return {
        nextPage: ({ pageSize }) => dispatch({ type: ACTIONS.NEXT_PAGE, pageSize: pageSize }),
        previousPage: ({ pageSize }) => dispatch({ type: ACTIONS.PREVIOUS_PAGE, pageSize: pageSize }),
        goToFirstPage: ({ totalElements, pageSize }) => dispatch({ type: ACTIONS.FIRST_PAGE, totalElements, pageSize }),
        goToLastPage: ({ page, totalElements, pageSize }) =>
            dispatch({ type: ACTIONS.LAST_PAGE, lastPage: page, totalElements, pageSize }),
        page: state.page,
        numRows: state.numRows,
        numRowsOf: state.numRowsOf
    }
}