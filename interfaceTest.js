const axios = require('axios')

axios({
    url: 'http://localhost:4000/api',
    params: {
        target: 'icon',
        targetUrl: 'https://element.eleme.cn/#/zh-CN/component/installation'
    }
})
.then(res => {
    console.log(res.data);
})
