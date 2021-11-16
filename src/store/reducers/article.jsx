import { GET_CHANNELS, GET_ARTICLES } from '../constant'
const initVal = {
    channels: [],
    articles: {},
}
const reducer = (state = initVal, action) => {
    if (action.type === GET_CHANNELS) {
        return {
            ...state,
            channels: action.payload,
        }
    }
    if (action.type === GET_ARTICLES) {
        return {
            ...state,
            articles: action.payload,
        }
    }
    return state
}
export default reducer
