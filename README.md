# nav-url（网址导航栏）
A nav web for urls, which based Vue3
通过Vue3框架实现的一个网址导航栏网站

# Original intention of design（设计初衷）

There are many social networking sites and tool websites on the Internet now. If I think the website is not bad, I will collect it. However, the favorite of the browser is too messy and very small, so it is very inconvenient to use. At the same time, because I love to organize things, I always want to have a website navigation bar similar to Figure 1. To sum up the above reasons, and because Vue3 has just been released in recent months, we have made such a project with `Vue3`

现在的互联网上有很多社交网站、工具网站，如果觉得网站还不错，我会把它收藏起来，但是浏览器的收藏夹实在太杂乱了，而且特别小，所以用起来特别得不方便，同时因为我爱整理东西，所以一直想有个类似 **图1** 的网站导航栏。综合上述原因，再加上Vue3近几个月刚发布，就用 `Vue3` 做了这样一个项目

图1：
![图1: 设想图](https://github.com/Lpyexplore/myImgs/blob/master/nav-url/origin.png)


该图是我该项目当前的预览图

![图2: 当前展示图](https://gitee.com/lpyexplore/my-images/blob/master/nav-url/current1.jpg)

以下两张图是该项目一些基本操作

![图3：基本功能预览](https://gitee.com/lpyexplore/my-images/blob/master/nav-url/gif1.gif)

![图4：配置导入导出预览](https://gitee.com/lpyexplore/my-images/blob/master/nav-url/gif2.gif)

# Characteristics（特色）

### 中文

1. 通过最新的 `Vue3` 框架实现，同时也用到了 `Vuex4` 进行数据的状态管理
2. 无需远程服务器储存，依靠 `localstorage` 作为本地数据库
3. 支持**一键保存导出数据** 、**一键导入数据**
4. 页面简单大方
5. 内部嵌入了独立接口用于自动获取目标网站的 `icon` 图标
6. 项目中用 `Vue3 API` 封装了 `button` 、`input` 、`dialog` 、 `popover` 、 `message` 组件 
7. 支持URL搜索功能
8. 页面滚动动画

### English
1. Implemented by the latest `Vue3` and `Vuex4`
2. Rely on `localstorage` as a local database,  without remote server storage
3. Support **saving export data with one key** and **importing data with one key**
4. The page is simple and generous
5. An independent interface is embedded inside to automatically acquire the `icon` icon of the target website
6. In the project, `button`, `input`, `dialog`, `popover` and `message` components are encapsulated with `vue3 API`
7. Support URL search function
8. Page scrolling animation


# Schedule（进度）

### 中文

还有一些未完善的功能，会陆续完成：
1. 页面账号信息存储
2. URL的拖拽
3. 更多的常用网站图标供用户选择
4. ……更多

### English
There are still some imperfect functions that will be completed one after another:

1. Page account information storage
2. Drag and drop of URL
3. More common website icons for users to choose
4. ……more

# Use（使用）

### 中文

1. 可以访问这个地址：[http://lpyexplore.gitee.io/nav-infos/](http://lpyexplore.gitee.io/nav-infos/)
2. 将该网址设置成浏览器每次打开默认的地址

### English

1. You can access this address: [http://lpyexplore.gitee.io/nav-infos/](http://lpyexplore.gitee.io/nav-infos/)
2. Set the URL as the default address for every browser opening

# The end（最后）

Welcome everyone to give me more advice
欢迎大家给我多提提意见