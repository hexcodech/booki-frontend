import axios from 'axios';
import config from '../utils/config';

export function bookSearchStart(searchTerm) {
    return function(dispatch) {
        dispatch(bookSearchIsLoading());
        return axios.get(config.searchUrl, {
            params: {q: searchTerm},
        })
        .then(result => dispatch(bookSearchSuccess(result.data)))
        .catch(err => dispatch(bookSearchError(err)));
    };
}

export function bookSearchIsLoading() {
    return {
        type: 'BOOK_SEARCH_IS_LOADING',
    };
}

export function bookSearchError(error) {
    return {
        type: 'BOOK_SEARCH_ERROR',
        error
    }
}

export function bookSearchSuccess(books) {
    return {
        type: 'BOOK_SEARCH_SUCCESS',
        books
    }
}