import axios from '@/utils/request'
import { LOGIN, LOGOUT } from '../constant'
import { removeToken, setToken } from '@/utils/token'
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
export const logout = () => {
    removeToken()
    return dispatch => {
        dispatch({
            type: LOGOUT,
        })
    }
}
