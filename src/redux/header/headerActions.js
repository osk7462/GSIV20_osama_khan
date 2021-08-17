import {
    DISPLAY_SEARCH
} from './headerType'


export const displaySearch = (displaySearch) => {
    return {
        type: DISPLAY_SEARCH,
        payload: displaySearch
    }
}