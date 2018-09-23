import axios from 'axios';
import config from '../utils/config';

let bookSearchCancelTokenSource = axios.CancelToken.source();
let bookAggregatedSearchCancelTokenSource = axios.CancelToken.source();

export function bookSearchStart(searchTerm) {
    // Cancel all still ongoing requests
    bookSearchCancelTokenSource.cancel('another_request');
    // Generate a new cancel token for the new request
    bookSearchCancelTokenSource = axios.CancelToken.source();

    
    return function(dispatch) {
        dispatch(bookSearchIsLoading());
        return axios.get(config.searchUrl, {
            params: {q: searchTerm},
            cancelToken: bookSearchCancelTokenSource.token,
        })
        .then(result => dispatch(bookSearchSuccess(result.data, searchTerm)))
        .catch(err => {
            if (err.message !== 'another_request')
                dispatch(bookSearchError(err));
        });
    };
}

export function bookAggregatedSearchStart(searchTerm) {
    bookAggregatedSearchCancelTokenSource.cancel('another_request');
    bookAggregatedSearchCancelTokenSource = axios.CancelToken.source();

    return function(dispatch) {
        dispatch(bookSearchIsLoading());
        return axios.get(config.aggregatedSearchUrl, {
            params: {q: searchTerm},
            cancelToken: bookAggregatedSearchCancelTokenSource.token,
        })
        .then(result => dispatch(bookSearchSuccess(result.data, searchTerm)))
        .catch(err => {
            if (err.message !== 'another_request')
                dispatch(bookSearchError(err));
        });
    }
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

export function bookSearchSuccess(books, searchTerm) {
    return {
        type: 'BOOK_SEARCH_SUCCESS',
        books,
        searchTerm,
    }
}