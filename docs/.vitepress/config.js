module.exports = {
  title: 'nonsense', //站点标题
  description: '一些学习笔记', //mate标签description，多用于搜索引擎抓取摘要
  lang: 'en-US',
  themeConfig: {
    siteTitle: 'nonsense',
    // logo: '/logo.png',
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    // lastUpdated: 'Last Updated', // string | boolean
    // 启动页面丝滑滚动
    smoothScroll: true,
    nav: [
      // { text: '笔记', link: '/html_css/scss中的写法' },
      { text: 'github', link: 'https://github.com/xiaoyan551/nonsense' },
      { text: '简书', link: 'https://www.jianshu.com/u/b5a09842e044' }
    ],
    sidebar: {
      '/': [
        {
          text: 'HTML&CSS',
          items: [{ text: 'Scss', link: '/html_css/scss中的写法' }],
          sidebarDepth: 3
        },
        {
          text: 'JS&TS',
          // collapsible: true,
          // collapsed: true,
          items: [
            { text: 'this指向', link: '/js_ts/this指向、闭包' },
            { text: '异步编程', link: '/js_ts/Promise' },
            { text: '原型&原型链', link: '/js_ts/原型链' },
            { text: 'ts', link: '/js_ts/ts' }
          ]
        },
        {
          text: 'vue',
          items: [{ text: 'key的作用', link: '/vue/key的作用和原理' }]
        },
        {
          text: '工具库',
          items: [
            { text: 'pinia', link: '/ecology/pinia入门使用' },
            { text: 'openlayers', link: '/ecology/openlayers使用笔记' },
            { text: 'webSocket', link: '/ecology/websocket及stomp.js' },
            { text: 'git', link: '/ecology/git使用笔记' },
            { text: 'nginx', link: '/ecology/nginx配置' }
          ]
        },
        {
          text: '项目开发',
          items: [
            { text: 'vite + ts 项目搭建', link: '/project/vue3项目搭建' },
            {
              text: '在vue项目中静态配置URL',
              link: '/project/在vue项目中静态配置URL'
            },
            {
              text: 'vite构建项目静态资源获取出现的问题',
              link: '/project/vite构建项目静态资源获取出现的问题'
            }
          ]
        },
        {
          text: 'electron',
          items: [
            { text: '开篇：Electron 带来的边界扩展', link: '/src/1-开篇：Electron 带来的边界扩展' },
            { text: '基础篇：Electron 的基础概念', link: '/src/2-基础篇：Electron 的基础概念' },
            { text: '基础篇：Electron 进程间的通信', link: '/src/3-基础篇：Electron 进程间的通信' },
            { text: '基础篇：Electron 的原生能力', link: '/src/4-基础篇：Electron 的原生能力' },
            { text: '基础篇：Electron 跨平台兼容性措施.', link: '/src/5-基础篇：Electron 跨平台兼容性措施.' },
            { text: '基础篇：Electron 菜单和托盘', link: '/src/6-基础篇：Electron 菜单和托盘' },
            { text: '实战篇：需求概述', link: '/src/7-实战篇：需求概述' },
            { text: '实战篇：开发环境搭建', link: '/src/8-实战篇：开发环境搭建' },
            { text: '实战篇：自定义窗口的拖拽和缩放', link: '/src/9-实战篇：自定义窗口的拖拽和缩放' },
            { text: '实战篇：实现应用快速检索', link: '/src/10-实战篇：实现应用快速检索' },
            { text: '实战篇：如何支持工具插件化', link: '/src/11-实战篇：如何支持工具插件化' },
            { text: '实战篇：插件的安装、发布、卸载', link: '/src/12-实战篇：插件的安装、发布、卸载' },
            { text: '实战篇：系统插件的加载和取色插件的开发', link: '/src/13-实战篇：系统插件的加载和取色插件的开发' },
            { text: '实战篇：Electron 实现屏幕截图', link: '/src/14-实战篇：Electron 实现屏幕截图' },
            { text: '实战：Electron 应用注入到系统右键菜单', link: '/src/15-实战：Electron 应用注入到系统右键菜单' },
            { text: '实战篇：实现超级面板', link: '/src/16-实战篇：实现超级面板' },
            { text: '实战篇：本地数据库和多端数据同步', link: '/src/17-实战篇：本地数据库和多端数据同步' },
            { text: '通用篇：使用 Rust 开发 Electron 原生扩展', link: '/src/18-通用篇：使用 Rust 开发 Electron 原生扩展' },
            { text: '通用篇：Electron 应用打包', link: '/src/19-通用篇：Electron 应用打包' },
            { text: '通用篇：Electron 应用更新', link: '/src/20-通用篇：Electron 应用更新' },
            { text: '通用篇：Electron 应用性能优化', link: '/src/21-通用篇：Electron 应用性能优化' },
            { text: '通用篇：Electron 应用安全性指南', link: '/src/22-通用篇：Electron 应用安全性指南' },
            { text: '通用篇：Electron 应用的自动化测试', link: '/src/23-通用篇：Electron 应用的自动化测试' },
            { text: '通用篇：Electron 的一些疑难杂症', link: '/src/24-通用篇：Electron 的一些疑难杂症' },
            { text: '结语', link: '/src/25-结语' },
          ]
        },
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022 xiaoyan'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
}
