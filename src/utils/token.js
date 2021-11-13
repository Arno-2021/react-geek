const LOGIN_TOKEN = 'LOGIN_TOKEN'
export const setToken = data => localStorage.setItem(LOGIN_TOKEN, data)
export const getToken = () => localStorage.getItem(LOGIN_TOKEN)
export const removeToken = () => localStorage.removeItem(LOGIN_TOKEN)
export const isAut = () => !!getToken()
