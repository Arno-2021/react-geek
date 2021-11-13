import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getToken } from '@/utils/token'
const store = createStore(
    reducer,
    {
        login: {
            token: getToken(),
        },
    },
    composeWithDevTools(applyMiddleware(thunk))
)
export default store
