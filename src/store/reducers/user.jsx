import { GET_USER_INFO } from '../constant'
const reducer = (state = {}, action) => {
    if (action.type === GET_USER_INFO) {
        return action.payload
    }
    return state
}
export default reducer
