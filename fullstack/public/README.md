# Agent Lab 前端

这是全栈版本的原生 HTML/CSS/JS 前端，由同目录的 Node 服务提供静态文件和 `/api` 接口。

- `index.html`：认证入口和应用壳。
- `styles.css`：明暗主题、PC 侧栏、H5 底部导航、周测和任务布局。
- `app.js`：认证、hash 路由、学习计划、题库、周测、复习、报告和笔记交互。
- `assets/`：原创几何 Logo 与 favicon。

前端不保存密码，也不直接访问题库答案；登录后的学习记录通过同源服务端接口按用户隔离。GitHub Pages 根目录的静态版与本目录全栈版是两套部署目标。
