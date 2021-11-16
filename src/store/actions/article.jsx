import axios from '@/utils/request'
import { GET_ARTICLES, GET_CHANNELS } from '../constant'
export const getChannels = () => {
    return async dispatch => {
        const res = await axios({
            url: 'channels',
        })
        dispatch({
            type: GET_CHANNELS,
            payload: res.data.channels,
        })
    }
}
export const getArticles = params => {
    return async dispatch => {
        const res = await axios({
            url: 'mp/articles',
            params,
        })
        dispatch({
            type: GET_ARTICLES,
            payload: res.data,
        })
    }
}
export const delArticle = id => {
    return async () => {
        await axios.delete(`mp/articles/${id}`)
    }
}
