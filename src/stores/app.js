import {defineStore} from 'pinia'
import {loginApi} from "../api/user";

export const useStore = defineStore('main', {
    state: () => ({
        token: localStorage.getItem('token') || '',
    }),
    getters: {},
    actions: {
        login(userinfo) {
            loginApi(userinfo).then(res => {
                console.log(res)
                this.token = res.data.token
                localStorage.setItem('token', res.data.token)
            })
        }
    }
})
