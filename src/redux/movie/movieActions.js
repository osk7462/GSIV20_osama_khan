import {
    FETCH_MOVIE_REQUEST,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_FAILED,
    QUERY,
    SET_PAGE,
    NEXT_PAGE
} from './movieType'
import axios from 'axios'


export const fetchMovieRequest = (query) => {
    return {
        type: FETCH_MOVIE_REQUEST,
        payload: query
    }
}


export const fetchMovieSuccess = (movies) => {
    return {
        type: FETCH_MOVIE_SUCCESS,
        payload: movies
    }
}

export const fetchMovieFailed = (error) => {
    return {
        type: FETCH_MOVIE_FAILED,
        payload: error
    }
}

export const setQuery = (query) => {
    return {
        type: QUERY,
        payload: query,
    }
}

export const setPage = () => {
    return {
        type: SET_PAGE
    }
}

export const nextPage = () => {
    return { 
        type: NEXT_PAGE
    }
}


const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY

export const fetchMoviesList = (page=1, query="") => {
    let url = ''
    if (!query) {
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    } else {    
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`
    }    
    return (dispatch) => {
        dispatch(fetchMovieRequest(query))
        axios.get(url)
        .then(response => {
            dispatch(fetchMovieSuccess(response.data.results))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchMovieFailed(errorMsg))
        })
    }
}

