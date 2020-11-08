import axios from 'axios'

function request(config) {
    let instance = axios.create({
        timeout: 10000
    })

    return instance(config)
}

export default request

