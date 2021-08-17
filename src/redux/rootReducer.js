import {combineReducers} from 'redux'
import movieReducer from './movie/movieReducer'
import headerReducer from './header/headerReducer'

const rootReducer = combineReducers({
    movies: movieReducer,
    header: headerReducer
})

export default rootReducer