import { combineReducers } from 'redux'
import login from './login.jsx'
import user from './user'
export default combineReducers({
    login,
    user,
})
