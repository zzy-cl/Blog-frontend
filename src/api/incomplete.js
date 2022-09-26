import Axios from "./request";

export const getIncompletesListFe = () => {
    return Axios({
        method: 'get',
        url: '/incomplete/getincompleteslistfe'
    })
}
