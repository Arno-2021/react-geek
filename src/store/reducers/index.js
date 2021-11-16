import { combineReducers } from 'redux'
import login from './login.jsx'
import user from './user'
import article from './article'
export default combineReducers({
    login,
    user,
    article,
})
