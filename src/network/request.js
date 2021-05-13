import axios from 'axios'

function request(config) {
    const instance = axios.create({
        baseURL: 'http://47.117.1.239:4000/api',
        timeout: 10000
    })

    return instance(config)
}

export default request
