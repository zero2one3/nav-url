# nav-url（网址导航栏）
A nav web for urls, which based Vue3
通过Vue3框架实现的一个网址导航栏网站

# Original intention of design（设计初衷）

There are many social networking sites and tool websites on the Internet now. If I think the website is not bad, I will collect it. However, the favorite of the browser is too messy and very small, so it is very inconvenient to use. At the same time, because I love to organize things, I always want to have a website navigation bar similar to Figure 1. To sum up the above reasons, and because Vue3 has just been released in recent months, we have made such a project with `Vue3`

现在的互联网上有很多社交网站、工具网站，如果觉得网站还不错，我会把它收藏起来，但是浏览器的收藏夹实在太杂乱了，而且特别小，所以用起来特别得不方便，同时因为我爱整理东西，所以一直想有个类似 **图1** 的网站导航栏。综合上述原因，再加上Vue3近几个月刚发布，就用 `Vue3` 做了这样一个项目

![图1: 设想效果图](https://github.com/Lpyexplore/myImgs/blob/master/nav-url/origin.png)


**图2**是我该项目当前的预览图

![图2: 当前效果图](https://github.com/Lpyexplore/myImgs/blob/master/nav-url/current.png)



过段时间等功能稍微完善了，我把 `gif` 动图放上来供大家观看，并提供使用方法

# Characteristics（特色）

### 中文

1. 通过最新的 `Vue3` 框架实现，同时也用到了 `Vuex4`
2. 无需远程服务器储存，依靠 `localstorage` 作为本地数据库
3. 支持**一键保存导出数据** 、**一键导入数据**
4. 页面简单大方
5. 内部嵌入了独立接口用于自动获取目标网站的 `icon` 图标
6. 项目中用 `Vue3 API` 封装了 `button` 、`input` 、`message` 组件 

### English
1. Implemented by the latest `Vue3` and `Vuex4`
2. Rely on `localstorage` as a local database,  without remote server storage
3. Support **saving export data with one key** and **importing data with one key**
4. The page is simple and generous
5. An independent interface is embedded inside to automatically acquire the `icon` icon of the target website
6. In the project, `button`, `input` and `message` components are encapsulated with `vue3 API`

# Schedule（进度）

### 中文

还有一些未完善的功能，会陆续完成：
1. 标签的**删除 、编辑**功能以及网址的**删除、编辑**功能（已初步完成，还需做更多的交互样式处理）
2. 搜索功能
3. 页面滚动的动画效果 
4. ……更多

### English
There are still some imperfect functions that will be completed one after another:
1. The **delete and edit functions of tags** and the **delete and edit functions of websites**
2. Search function
3. Animation effect of page scrolling
4. ……more


# The end（最后）

Welcome everyone to give me more advice
欢迎大家给我多提提意见