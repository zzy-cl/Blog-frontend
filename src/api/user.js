import Axios from "./request";

export const loginApi = (data) => {
    return Axios({
        method: 'post',
        url: '/api/login',
        data
    })
}
