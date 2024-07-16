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
            { text: '启动electron项目', link: '/electron/启动electron项目' },
            { text: '使用electron生成安装包', link: '/electron/使用electron生成安装包' },
            { text: '进程间通信', link: '/electron/进程间通信' },
            { text: '版本更新', link: '/electron/版本更新' },
            { text: '静默打印', link: '/electron/静默打印' },
            { text: '调用DLL', link: '/electron/调用DLL' },
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
