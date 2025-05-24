import axios from 'axios';

const instance = axios.create({})

export const apiConnector = async (method, url, body, header, params) => {

    return instance({
        method: method ? method : 'GET',
        url: url ? url : '',
        data: body ? body: null,
        headers: {
            ...header,
        },
        params: params ? params : null,
    })
}