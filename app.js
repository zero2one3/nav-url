const express = require('express')
const url = require('url')
const axios = require('axios')

const app = express()


// 允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

// 从文档中获取icon地址
function getIcon(s, obj) {
    let {protocol, host, port} = obj
    port = port ? `:${port}` : ''
    let linkList = s.match(/<link.*?>/g) // 所有link标签
    let length = linkList ? linkList.length : 0
    // console.log(linkList);
    for(let i = 0; i < length; i++) {
        let link = linkList[i]
        let relMatch = link.match(/rel="(.*)"/)
        let rel = relMatch ? relMatch[1].toLowerCase() : ''
        let hrefMatch = link.match(/href="(.*)"/)
        let href = hrefMatch ? hrefMatch[1] : ''
        /**判断多种icon格式
         * 1. 'shortcut icon'
         * 2. 'SHORTCUT ICON'
         * 3. 'apple-touch-icon'
         * 4. 'icon'
         * 5. 没有icon
         *  */ 
        rel = rel.split('"')[0]
        href = href.split('"')[0]
        // console.log(rel);
        // console.log(href);
        if(href == '') continue;
        if(rel == 'shortcut icon' || rel == 'icon shortcut' || rel == 'apple-touch-icon' || rel == 'icon' || /apple-touch-icon/.test(rel)) {
            /** 判断icon地址的格式
             * 1. 'https://…………'
             * 2. '/favico……'
             * 3. '//example.com/a…………'
             */
            if(/http/.test(href)) return href;
            else if(/^\/\//.test(href))  return protocol + href;
            else if(/^\//.test(href)) return protocol + '//' + host + port + href;
            else return protocol + '//' + host + port + '/' + href
        }
    }
    return null
}
// 从文档中获取标题
function getTitle(s) {
    let result = s.match(/<title>(.*)<\/title>/)
    return result ? result[1] : ''
}

app.get('/api', (req, res) => {
    let urlInfo = url.parse(req.query.targetUrl)   // 解析网址
    let target = req.query.target                 // 判断请求名称还是图标
    let targetUrl = urlInfo.href                   // 目标网址
    let protocol = urlInfo.protocol                // 协议
    let host = urlInfo.hostname                    // 主机名
    let port = urlInfo.port                        // 端口号
    axios({
        url: targetUrl,
        timeout: 10000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
        }
    })
    .then(data => {
        // console.log(data);
        let response = data.data
        let value;
        if(target === 'icon') value = getIcon(response, {protocol, host, port});
        else if(target === 'name') value = getTitle(response)
        res.send({
            status: 200,
            response: '成功获取',
            otherIcon: `${protocol}//${host}/favicon.ico`,
            data: value
        }) 
    })
    .catch(err => {
        // console.log(err);
        res.send({
            status: 500,
            txt: '无法请求到资源'
        })
    })
})

app.listen(4000, () => {
    console.log('localhost:4000');
})