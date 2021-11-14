import axios from '@/utils/request'
import { GET_USER_INFO } from '../constant'
export const getUserInfo = () => {
    return async dispatch => {
        const res = await axios.get('/user/profile')
        dispatch({
            type: GET_USER_INFO,
            payload: res.data,
        })
    }
}
