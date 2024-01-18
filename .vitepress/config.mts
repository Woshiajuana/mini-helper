import { defineConfig } from "vitepress";
import container from "markdown-it-container";
import { renderSandbox } from "vitepress-plugin-sandpack";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Code",
  description: "code daysnap",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  lang: "zh",
  base: "/",
  srcDir: "./src",
  outDir: "./dist", // 默认输出
  assetsDir: "assets",

  // 国际化
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
    },
  },

  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        path: "src",
        titleFromFile: true,
        sideBarItemsResolved(data) {
          // 转换文案
          const mapping = {
            index: '指南',
            basic: "基础",
            intermediate: "进阶",
            advanced: "高级",
          };
          data.forEach((item) => {
            if (item.text) {
              const text = mapping[item.text];
              if (text) {
                item.text = text;
              }
            }
          });

          // 排序
          data.sort((a) =>
            a.link?.endsWith("/index.html") || a.link?.endsWith("/guide.html")
              ? -1
              : 1
          );
          return data;
        },
      }),
    ],
  },

  // 主题设置
  themeConfig: {
    // logo
    logo: "/logo.png",
    siteTitle: "Code",

    // 导航栏 https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      {
        text: "前端面试",
        items: [
          { text: "Html & Css", link: "/html-css/" },
          { text: "Js & Ts", link: "/js-ts/" },
          { text: "Vue", link: "/vue/" },
          { text: "React", link: "/react/" },
          { text: "打包工具", link: "/bundler/" },
          { text: "杂项", link: "/other/" },
        ],
      },
    ],

    // 其他链接
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Woshiajuana/code.daysnap.cn",
      },
    ],

    // 尾部
    footer: {
      message: '本文档由 <a href="https://www.daysnap.cn/">daysnap.cn</a> 整理',
      copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://github.com/woshiajuana">Woshiajuana</a>`,
    },

    // 搜索
    search: {
      provider: "algolia",
      options: {
        appId: "951JD102W2",
        apiKey: "673c50fe091bce7942453b63fe7a0747",
        indexName: "code",
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            searchBox: {
              resetButtonTitle: "清除查询条件",
            },
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    outline: "deep",
    outlineTitle: "本页目录",

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    langMenuLabel: "选择语言",

    lastUpdated: {
      text: "最近更新时间",
    },
  },

  // markdown 设置
  markdown: {
    lineNumbers: true,

    // 配置
    config(md) {
      md
        // the second parameter is html tag name
        .use(container, "sandbox", {
          render(tokens: any[], idx: number) {
            return renderSandbox(tokens, idx, "sandbox");
          },
        });
    },
  },

  // 网站 sitemap.xml
  sitemap: {
    hostname: "https://code.daysnap.cn",
  },
});
