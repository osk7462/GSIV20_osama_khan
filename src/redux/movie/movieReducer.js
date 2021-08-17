import {
    FETCH_MOVIE_REQUEST,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_FAILED,
    QUERY,
    SET_PAGE,
    NEXT_PAGE
} from './movieType'


const initialState = {
    loading: false,
    movies: [],
    query: '',
    page: 1,
    error: ''
}

const movieReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: [...state.movies, ...action.payload],
                error: ''
            }
        case FETCH_MOVIE_FAILED:
        return {
            ...state,
            loading: false,
            error: action.payload
        }

        case QUERY:
            return {
                ...state,
                movies: [],
                query: action.payload,
                page: 1,
            }
        case SET_PAGE:
            return {
                ...state,
                page: 1,
            }
        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }

        default:
            return {
                ...state
            }
    }
}

export default movieReducer