export default function searchReducer(state = {
    bookSearchLoading: false,
    bookSearchError: null,
    bookSearchResult: null,
}, action) {
    switch(action.type) {
        case 'BOOK_SEARCH_IS_LOADING':
            return {
                ...state,
                bookSearchLoading: true,
                bookSearchError: false,
            };

        case 'BOOK_SEARCH_ERROR':
            return {
                ...state,
                bookSearchLoading: false,
                bookSearchError: action.error,
                bookSearchResult: null,
            };

        case 'BOOK_SEARCH_SUCCESS':
            return {
                ...state,
                bookSearchLoading: false,
                bookSearchError: false,
                bookSearchResult: action.books,
            };

        default:
            return state;
    }
}