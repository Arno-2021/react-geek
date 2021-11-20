import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getToken } from '@/utils/token'
let middlewares
if (process.env.NODE_ENV === 'production') {
    // 生产环境，只启用 thunk 中间件
    middlewares = applyMiddleware(thunk)
} else {
    middlewares = composeWithDevTools(applyMiddleware(thunk))
}
const store = createStore(
    reducer,
    {
        login: {
            token: getToken(),
        },
    },
    middlewares
)
export default store
