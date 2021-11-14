import { LOGIN, LOGOUT } from '../constant/index'
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
    if (action.type === LOGOUT) {
        return {
            ...state,
            token: '',
        }
    }
    return state
}
export default reducer
