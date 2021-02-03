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
    let {protocol, host, port, targetUrl} = obj
    port = port ? `:${port}` : ''
    let linkList = s.match(/<link.*?>/g) // 所有link标签
    let length = linkList ? linkList.length : 0

    for(let i = 0; i < length; i++) {
        let link = linkList[i]
        // console.log(link);
        let rel, href
        const attrLists = link.split(' ')

        attrLists.forEach(v => {
            if(/=/.test(v)) {
                const attr = v.split('=')
                if(attr[0] == 'rel') rel = attr[1].toLowerCase();
                if(attr[0] == 'href') href = attr[1];      
            }
        })

        // 处理一些特殊情况
        if(href == '') continue;
        rel = rel.replace(/"/g, '')
        href = href.replace(/"/g, '')
        href = href.replace(/>/g, '')
        href = href.charAt(href.length - 1) == '/' ? href.slice(0, href.length - 1) : href
        
        /** 判断多种icon格式
         * 1. 'shortcut icon'
         * 2. 'SHORTCUT ICON'
         * 3. 'apple-touch-icon'
         * 4. 'icon'
         * 5. 没有icon
         *  */ 
        
        if(rel == 'shortcut' || rel == 'icon' || rel == 'apple-touch-icon' || /apple-touch-icon/.test(rel)) {
            // console.log(href);
            /** 判断多种href格式
             *  1. https://example.com:4000/icon.png
             *  2. //example.com:4000/icon.png
             *  3. /icon.png
             *  4. ./icon.png
             */
            if(/http/.test(href)) return href;
            else if(/^\/\//.test(href))  return protocol + href;
            else if(/^\//.test(href)) return protocol + '//' + host + port + href;
            else if(/^\.\//.test(href)) return targetUrl + href.slice(1);
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
        if(target === 'icon') value = getIcon(response, {protocol, host, port, targetUrl});
        else if(target === 'name') value = getTitle(response);

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