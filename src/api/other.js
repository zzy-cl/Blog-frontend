import Axios from "./request";

export const updateTotalCount = () => {
    return Axios({
        method: 'get',
        url: '/other/updatetotalcount'
    })
}
