# AI Agent 学习检测系统

这是面向嵌入式团队 AI Agent 应用工程师的学习、打卡和考试闭环。适用角色是已经具备 Web、H5、App、Electron 经验，需要进一步承担团队内部 AI 提效工具和 Agent 应用交付的工程师。

## 当前学习计划

学习周期为 16 周，每个工作日 120 分钟，总投入约 160 小时。主线以 FWA 为主，AIoT 和 Tracker 通过适配任务扩展。

| 阶段 | 周次 | 学习重点 | 主要产出 |
| --- | --- | --- | --- |
| 工程底座 | W1-W4 | Python、模型网关、SSE、FastAPI、Vue/Electron | 日志分析与流式问答底座 |
| RAG 与工具 | W5-W8 | 领域建模、混合检索、引用、评测、Function Calling、MCP | 可信 RAG 与只读工具 |
| Agent 治理 | W9-W12 | 显式工作流、LangGraph、HITL、追踪、成本、安全 | 受控诊断 Agent |
| 产品化试点 | W13-W16 | 三产品线适配、CI/CD、部署、试点、交接 | 可交接的内部试点版本 |

每天按以下节奏执行：10 分钟回顾，30 分钟官方课程或文档，55 分钟编码实验，15 分钟测试验收，10 分钟登记证据和下一动作。完成学习不能只记录“看过课程”，必须留下代码、测试输出、文档、评测结果或可复核命令。

## 推进顺序

维护多维表格每日计划
    -> 飞书定时工作流读取当天记录
    -> 发送当天任务、课程和考试链接
    -> GitHub Pages 学习、打卡和周测
    -> 登记任务证据、成绩和复习日期
    -> 审批完成后回写多维表格
    -> 根据未完成项和复习队列生成下一次提醒

1. 先使用本仓库的静态考试站点完成每日任务、周测、复习和报告导出。
2. 飞书应用审批完成后，只读核对目标多维表格字段，再映射个人每日计划和任务明细。
3. 增加工作日提醒、未完成补提醒和周测结果提醒；消息中带当天打卡链接和周测链接。
4. 最后接入受控回写，补齐身份校验、幂等、限流和审计。不得把 App Secret 放入 GitHub Pages 或浏览器代码。

## 使用检测系统

- 每日打卡与可复核证据登记
- W1-W16 周测与重考
- 1/3/7/21 天复习队列
- Skill 掌握度与 M1-M4 门禁
- Markdown / JSON 报告导出

题库当前版本为 3.1，共 51 题，包含单选、多选、代码/命令实操和场景 Rubric。练习卷不计入掌握度；正式成绩需要有效打卡、题型覆盖和门禁证据共同满足。

每日提醒链接：

https://jiepijiang.github.io/ai-study-exam/index.html?date=2026-09-28&week=1&tab=checkin

周测链接：

https://jiepijiang.github.io/ai-study-exam/index.html?date=2026-09-28&week=1&tab=exam

## 当前边界

打卡状态保存在浏览器 localStorage，当前是本地单机 MVP；清理浏览器存储后无法恢复。飞书同步依赖应用审批，正式接入前不发送或保存飞书凭证。GitHub Pages 仅托管静态题库和页面。

## 全栈版本

`fullstack/` 是新增的本地全栈版本，用于登录、多用户数据隔离和服务端学习闭环。它与根目录静态版是两套运行入口：

```powershell
cd fullstack
npm start
```

打开 <http://127.0.0.1:8787>。项目使用 Node.js 内置 HTTP 服务和 JSON 持久化，包含：

- 用户注册、登录、退出和 HttpOnly 会话；密码使用 `crypto.scrypt` 哈希保存。
- 每日计划、证据打卡、周测提交、考试历史、复习队列、学习报告和个人笔记。
- 题目接口不会返回答案、解析或 Rubric；客观题由服务端判分，开放题明确标记为人工复核。
- 明亮/暗黑主题、桌面侧栏、H5 底部导航和响应式周测界面。

后端接口说明在 `fullstack/server/API.md`，冒烟测试：

```powershell
cd fullstack
npm run smoke
```

GitHub Pages 仍然只部署根目录的静态版，不能承载登录、数据库或 App Secret。全栈版本支持通过 `DATABASE_URL` 切换到 PostgreSQL，Render 部署配置位于仓库根目录的 `render.yaml`。免费部署建议使用 Render Free Web Service + Supabase Free PostgreSQL；Render 免费服务会休眠且本地文件系统不持久化，因此线上必须配置 PostgreSQL。

部署步骤：

1. 在 Supabase 创建 Free 项目，复制 PostgreSQL 连接串；不要把连接串提交到 Git。
2. 在 Render 选择 `New Blueprint`，导入本仓库并使用 `render.yaml`。
3. 在 Render 的 `DATABASE_URL` 环境变量中粘贴 Supabase 连接串；`DATABASE_SSL=true` 和 `COOKIE_SECURE=true` 保持开启。
4. Render 的 `Root Directory`、构建命令、启动命令和健康检查会由 Blueprint 设置为 `fullstack`、`npm install`、`npm start`、`/healthz`。
5. 使用 Render 生成的服务地址访问全栈版本；GitHub Pages 继续作为静态题库和文档入口。

Render 免费服务首次访问可能需要等待唤醒；Supabase 免费项目长期无访问可能暂停。上线前仍需补充限流、CSRF、审计日志、管理员人工复核和正式数据库迁移。

## 参考站点审计

基于用户 Edge 登录会话完成的参考功能清单位于 `docs/参考站点功能审计.md`，包含首页、刷题、题库搜索、知识导图、论文、冲刺、周测、复习、报告和个人中心的映射边界。审计没有读取 Cookie、密码或 Token，也没有复制参考站点代码和品牌资源。
