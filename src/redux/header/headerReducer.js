
import {
    DISPLAY_SEARCH
} from './headerType'

const initialState = {
    displaySearch: true
}

export default function headerReducer(state=initialState, action) {
    switch (action.type) {
        case DISPLAY_SEARCH:
            return {
                ...state,
                displaySearch: action.payload
            }
        default:
            return state
    }
}