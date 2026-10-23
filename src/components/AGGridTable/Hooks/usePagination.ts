import { useReducer } from "react";

type PaginationState = { page: number; numRows: number };
type PaginationAction =
  | { type: "next_page" | "previous_page"; pageSize: number }
  | { type: "first_page" }
  | { type: "last_page"; pageSize: number; lastPage: number };

function reducer(state: PaginationState, action: PaginationAction): PaginationState {
  switch (action.type) {
    case "next_page": return { page: state.page + 1, numRows: state.numRows + action.pageSize };
    case "previous_page": return { page: state.page - 1, numRows: state.numRows - action.pageSize };
    case "first_page": return { page: 1, numRows: 0 };
    case "last_page": return { page: action.lastPage, numRows: (action.lastPage - 1) * action.pageSize };
  }
}

export type UsePaginationOptions = { readonly initialPage?: number; readonly initialNumRows?: number };

export default function usePagination({ initialPage = 1, initialNumRows = 0 }: UsePaginationOptions = {}) {
  const [state, dispatch] = useReducer(reducer, { page: initialPage, numRows: initialNumRows });
  return {
    nextPage: ({ pageSize }: { pageSize: number }) => dispatch({ type: "next_page", pageSize }),
    previousPage: ({ pageSize }: { pageSize: number }) => dispatch({ type: "previous_page", pageSize }),
    goToFirstPage: () => dispatch({ type: "first_page" }),
    goToLastPage: ({ pageSize, page }: { pageSize: number; page: number }) => dispatch({ type: "last_page", pageSize, lastPage: page }),
    page: state.page,
    numRows: state.numRows,
  };
}
