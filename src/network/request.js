import axios from 'axios'

function request(config) {
    const instance = axios.create({
        baseURL: 'http://106.54.233.135:4000/api',
        timeout: 10000
    })

    return instance(config)
}

export default request
