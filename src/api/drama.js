import Axios from "@/api/request";

export const getDramasListFe = (params) => {
    return Axios({
        method: 'get',
        url: '/drama/getdramaslistfe',
        params
    })
}
