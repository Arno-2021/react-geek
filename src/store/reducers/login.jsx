import { LOGIN } from '../constant/index'
const initVal = {
    token: '',
}
const reducer = (state = initVal, action) => {
    if (action.type === LOGIN) {
        return {
            ...state,
            token: action.payload,
        }
    }
    return state
}
export default reducer
