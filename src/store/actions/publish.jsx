import axios from '@/utils/request'
export const addArticle = (data, draft) => {
    return async () => {
        await axios({
            method: 'POST',
            url: `mp/articles?draft=${draft}`,
            data,
        })
    }
}
export const editArticle = (data, id) => {
    return async () => {
        await axios({
            method: 'put',
            url: `mp/articles/${id}`,
            data,
        })
    }
}
export const getArticleDetail = id => {
    return async () => {
        const res = await axios({
            url: `mp/articles/${id}`,
        })
        return res
    }
}
