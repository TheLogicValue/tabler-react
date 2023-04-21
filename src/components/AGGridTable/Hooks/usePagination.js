import { useReducer } from "react"

const ACTIONS = {
    NEXT_PAGE: "next_page",
    PREVIOUS_PAGE: "previous_page",
    FIRST_PAGE: "first_page",
    LAST_PAGE: "last_page"
}

const ACTIONS_REDUCERS = {
    [ACTIONS.NEXT_PAGE]: (state, action) => {
        return {
            ...state,
            page: state.page + 1,
            numRows: state.numRows + action.pageSize
        }
    },
    [ACTIONS.PREVIOUS_PAGE]: (state, action) => {
        return {
            ...state,
            page: state.page - 1,
            numRows: state.numRows - action.pageSize
        }
    },
    [ACTIONS.FIRST_PAGE]: (state) => {
        return {
            ...state,
            page: 1,
            numRows: 0
        }
    },
    [ACTIONS.LAST_PAGE]: (state, action) => {
        return {
            ...state,
            page: action.lastPage,
            numRows: action.lastPage * action.pageSize
        }
    }
}

const reducer = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.type]
    return actionReducer ? actionReducer(state, action) : state
}

export default function usePagination({ initialPage = 1, initialNumRows = 0 } = {}) {
    const [state, dispatch] = useReducer(reducer, { page: initialPage, numRows: initialNumRows })

    return {
        nextPage: ({ pageSize }) => dispatch({ type: ACTIONS.NEXT_PAGE, pageSize: pageSize }),
        previousPage: ({ pageSize }) => dispatch({ type: ACTIONS.PREVIOUS_PAGE, pageSize: pageSize }),
        goToFirstPage: () => dispatch({type: ACTIONS.FIRST_PAGE}),
        goToLastPage:({pageSize, page}) => dispatch({ type: ACTIONS.LAST_PAGE, pageSize: pageSize, lastPage: page}),
        page: state.page,
        numRows: state.numRows
    }
}