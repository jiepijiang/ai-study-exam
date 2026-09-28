# AI Agent 学习系统后端 MVP

这是一个 Node.js 内置模块实现的多用户后端。题库和学习计划从发布仓库根目录的
`../question-bank.json`、`../daily-plan.json` 只读加载；默认状态写入
`fullstack/data/db.json`。设置 `DATABASE_URL` 后会自动使用 PostgreSQL，并创建
`ai_study_state` 表保存状态。

## 启动

```powershell
cd fullstack
npm start
```

环境变量：`PORT` 默认 `8787`；`HOST` 默认 `0.0.0.0`；`DATA_DIR` 可指定 JSON 数据目录；`DATABASE_URL`
存在时切换到 PostgreSQL；`DATABASE_SSL` 默认启用 SSL；`COOKIE_SECURE=true` 为 HTTPS Cookie；`CORS_ORIGIN`
只允许一个明确的前端 Origin，并配合凭据请求使用。生产部署应把 `DATA_DIR` 换成
PostgreSQL、SQLite 或其他具备并发和备份能力的存储，不应把 JSON 文件当作生产数据库。
健康检查地址为 `GET /healthz`。

## 接口

认证：`POST /api/auth/register`、`POST /api/auth/login`、`POST /api/auth/logout`、
`GET /api/auth/me`。注册/登录返回 HttpOnly、SameSite=Lax 会话 Cookie；密码使用
`crypto.scrypt` 派生后保存，数据库中不保存明文密码或会话原文。

内容：`GET /api/dashboard`、`GET /api/sprint`、`GET /api/questions`、
`GET /api/knowledge`、`GET /api/essays`。题目接口只返回题干、选项和公开元数据，
不返回 `answer`、`explain`、`rubric` 或 `reference`。

学习闭环：`POST /api/checkins`、`GET/POST /api/notes`、`POST /api/profile/theme`。
服务端会校验 `DONE` 打卡必须包含至少 8 个字符的证据；只有正式周测会生成复习队列。
考试：`GET /api/exams`、`POST /api/exams/start`、`POST /api/exams/:id/submit`。
正式周测由服务端按周次组卷，练习卷才允许传入受控题目 ID；练习成绩不计入正式掌握度。
复习：`GET /api/reviews`、`POST /api/reviews/:id/answer`。提交后按 1/3/7/21 天
生成复习队列，正式周测历史只追加、不覆盖。

分析：`GET /api/report`。响应中的 `exams` 是正式考试，`practiceExams` 是练习记录，技能正确率只统计正式考试。

所有除 `/api/auth/me`、注册、登录、退出外的接口都需要当前用户会话。查询、考试、
打卡、复习、笔记和主题都以服务端会话中的 `userId` 过滤，客户端传入的用户 ID 不
参与授权判断。代码/场景题先标记 `manualReviewRequired`，不会被错误地自动判为通过。

## 冒烟测试

```powershell
cd fullstack
npm run smoke
```

测试会启动临时端口和临时数据目录，验证注册、登录、计划读取、题目不泄露答案、
打卡、开始/提交周测、报告以及两个用户之间的数据隔离。

## 安全边界

这是本地 MVP：没有邮箱验证、密码找回、限流、CSRF Token、管理员角色、审计日志和
多进程锁。部署到团队环境前必须补齐这些能力，启用 HTTPS，并将会话 Cookie 配置为
适合实际前后端域名的 `Secure`/跨站策略；不应直接暴露本地 JSON 文件或把真实敏感
设备数据放入题库和笔记。
