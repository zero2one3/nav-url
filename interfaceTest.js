const axios = require('axios')

axios({
    url: 'http://localhost:4000/api',
    params: {
        target: 'icon',
        targetUrl: 'https://segmentfault.com/'
    }
})
.then(res => {
    console.log(res.data);
})

// https://apidingtest.hexiaoxiang.com/./favicon-32x32.png
// https://apidingtest.hexiaoxiang.com/dingcardtask/swagger/index.html/favicon-32x32.png