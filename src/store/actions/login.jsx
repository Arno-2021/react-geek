import axios from '@/utils/request'
import { LOGIN } from '../constant'
import { setToken } from '@/utils/token'
export const login = data => {
    return async dispatch => {
        const res = await axios({
            method: 'post',
            url: 'authorizations',
            data,
        })
        const token = res.data.token
        setToken(token)
        dispatch({
            type: LOGIN,
            payload: token,
        })
    }
}
