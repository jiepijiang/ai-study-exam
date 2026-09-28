(() => {
  "use strict";

  const routes = {
    overview: { label: "学习概况", icon: "grid", group: "工作台" },
    tasks: { label: "每日任务", icon: "check", group: "工作台" },
    practice: { label: "分类刷题", icon: "target", group: "学习" },
    "question-bank": { label: "题库搜索", icon: "search", group: "学习" },
    knowledge: { label: "知识导图", icon: "book", group: "学习" },
    papers: { label: "论文与案例", icon: "file", group: "学习" },
    sprint: { label: "考前冲刺", icon: "rocket", group: "冲刺" },
    weekly: { label: "周测", icon: "clipboard", group: "冲刺" },
    review: { label: "复习队列", icon: "clock", group: "我的" },
    reports: { label: "学习报告", icon: "chart", group: "我的" },
    wrong: { label: "错题本", icon: "alert", group: "我的" },
    saved: { label: "收藏与笔记", icon: "bookmark", group: "我的" },
    profile: { label: "个人设置", icon: "settings", group: "我的" }
  };

  const icons = {
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    check: '<path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 2v4M16 2v4M3 9h18M8 14l2 2 5-5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="m17 7 3-3M17 4h3v3"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
    file: '<path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 13h8M8 17h6"/>',
    rocket: '<path d="M14 4c3-2 6-1 6-1s1 3-1 6l-7 7-4-4 6-8Z"/><path d="m8 12-4 1 3 3M12 16l-1 4 3-3M8 20l-3 1 1-3"/><circle cx="16" cy="7" r="1"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chart: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-6M16 7h3v3"/>',
    alert: '<path d="M12 4 21 20H3L12 4Z"/><path d="M12 10v4M12 17v.1"/>',
    bookmark: '<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.6h.5A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    chevron: '<path d="m7 10 5 5 5-5"/>',
    arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    external: '<path d="M14 5h5v5M19 5l-8 8"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    play: '<path d="m9 6 9 6-9 6V6Z"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.7-3L3 11M3 5v6h6M4 13a8 8 0 0 0 14.7 3L21 13M21 19v-6h-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.1"/>',
    send: '<path d="m4 4 17 8-17 8 3-8-3-8ZM7 12h14"/>'
  };

  const store = {
    user: null,
    guest: false,
    route: location.hash.slice(1) || "overview",
    theme: localStorage.getItem("agent-lab-theme") || "system",
    cache: {},
    exam: null,
    examAnswers: {},
    authMode: "login",
    questionFilter: "",
    questionType: "all",
    week: 1,
    sprintView: "",
    currentPlan: [],
    report: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const text = (value) => escapeHtml(String(value ?? ""));
  const truncate = (value, length = 120) => {
    const clean = String(value ?? "").replace(/\s+/g, " ").trim();
    return clean.length > length ? `${clean.slice(0, length)}...` : clean;
  };
  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
    return Number.isNaN(date.getTime()) ? text(value) : date.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric", weekday: "short" });
  };
  const formatDateTime = (value) => value ? new Date(value).toLocaleString("zh-CN", { dateStyle: "short", timeStyle: "short" }) : "-";
  const percent = (value) => `${Math.round(Number(value || 0))}%`;
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.info}</svg>`;
  const routeInfo = () => routes[store.route] || routes.overview;

  function toast(message, tone = "info") {
    const node = document.createElement("div");
    node.className = "toast";
    node.dataset.tone = tone;
    node.textContent = message;
    $("#toast-region").append(node);
    window.setTimeout(() => node.remove(), 3600);
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options
    });
    let payload = null;
    try { payload = await response.json(); } catch { payload = {}; }
    if (!response.ok) throw new Error(payload?.error?.message || `请求失败（${response.status}）`);
    return payload;
  }

  function applyTheme(theme = store.theme) {
    const resolved = theme === "system" ? (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme;
    document.documentElement.dataset.theme = resolved;
    localStorage.setItem("agent-lab-theme", theme);
    store.theme = theme;
    $$('[data-action="theme"]').forEach((button) => {
      button.innerHTML = icon(resolved === "dark" ? "sun" : "moon");
      button.title = resolved === "dark" ? "切换为明亮模式" : "切换为暗黑模式";
    });
  }

  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach((node) => { node.innerHTML = icon(node.dataset.icon); });
  }

  function setAuthMode(mode) {
    store.authMode = mode;
    $$("[data-auth-mode]").forEach((tab) => {
      const active = tab.dataset.authMode === mode;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    const register = mode === "register";
    $("#auth-title").textContent = register ? "创建学习账户" : "登录工作台";
    $("#auth-subtitle").textContent = register ? "建立个人学习记录，跨设备同步打卡和考试数据。" : "登录后同步你的学习进度、周测成绩和复习队列。";
    $("#auth-submit-label").textContent = register ? "创建账户" : "登录";
    $("#auth-name-field").classList.toggle("is-hidden", !register);
    $("#auth-password").autocomplete = register ? "new-password" : "current-password";
  }

  function showAuth() {
    $("#auth-shell").classList.remove("is-hidden");
    $("#app-shell").classList.add("is-hidden");
    setAuthMode(store.authMode);
    hydrateIcons();
  }

  function showApp() {
    $("#auth-shell").classList.add("is-hidden");
    $("#app-shell").classList.remove("is-hidden");
    updateUserChrome();
    buildNav();
    applyTheme(store.user?.theme && store.user.theme !== "system" ? store.user.theme : store.theme);
    renderRoute();
  }

  function updateUserChrome() {
    const user = store.user || { username: "游客", email: "本地演示" };
    const name = user.username || user.email || "游客";
    const initial = name.slice(0, 1).toUpperCase();
    $("#sidebar-name").textContent = name;
    $("#top-name").textContent = name;
    $("#sidebar-role").textContent = store.guest ? "本地演示" : "学习者";
    $("#sidebar-avatar").textContent = initial;
    $("#top-avatar").textContent = initial;
  }

  function buildNav() {
    const groups = ["工作台", "学习", "冲刺", "我的"];
    const renderGroup = (group, mobile = false) => {
      const items = Object.entries(routes).filter(([, value]) => value.group === group);
      const visible = mobile ? items.filter(([key]) => ["overview", "tasks", "weekly", "review", "profile"].includes(key)) : items;
      return visible.map(([key, value]) => `<button type="button" data-route="${key}" class="${store.route === key ? "is-active" : ""}" aria-current="${store.route === key ? "page" : "false"}">${icon(value.icon)}<span>${value.label}</span></button>`).join("");
    };
    $("#side-nav").innerHTML = groups.map((group) => `<div class="nav-group-label">${group}</div>${renderGroup(group)}`).join("");
    $("#mobile-nav").innerHTML = groups.map((group) => renderGroup(group, true)).join("");
    hydrateIcons();
  }

  async function boot() {
    applyTheme();
    hydrateIcons();
    try {
      const payload = await api("/api/auth/me");
      store.user = payload.user;
      if (store.user) showApp(); else showAuth();
    } catch (error) {
      showAuth();
      toast("服务端尚未启动，可先查看登录界面", "warning");
    }
  }

  async function load(path, key = path) {
    if (!store.cache[key]) store.cache[key] = await api(path);
    return store.cache[key];
  }

  function invalidate(...keys) { keys.forEach((key) => delete store.cache[key]); }

  function pageHead(kicker, title, description, actions = "") {
    return `<div class="page-head"><div><div class="section-kicker">${text(kicker)}</div><h1>${text(title)}</h1><p>${text(description)}</p></div><div class="head-actions">${actions}</div></div>`;
  }

  function metric(label, value, meta, tone = "") {
    return `<div class="metric"><div class="metric-label"><span>${text(label)}</span>${tone ? `<span class="status status-${tone}">${tone === "success" ? "正常" : tone === "warning" ? "待处理" : "提示"}</span>` : ""}</div><div class="metric-value">${text(value)}</div><div class="metric-meta">${text(meta)}</div></div>`;
  }

  function emptyState(title, description, action = "") {
    return `<div class="empty-state"><div><strong>${text(title)}</strong><p>${text(description)}</p>${action ? `<div style="margin-top:12px">${action}</div>` : ""}</div></div>`;
  }

  function renderOverview(data) {
    const summary = data.summary || {};
    const today = data.today;
    const tasks = today?.tasks || [];
    const done = tasks.filter((task) => task.status === "DONE").length;
    const total = tasks.length || 0;
    const recent = data.recentExams || [];
    return `${pageHead("TODAY / 学习概况", `早上好，${data.user?.username || "学习者"}`, "把今天的学习动作、周测和复习队列集中在一个可验证的工作台里。", `<button class="button button-primary" data-route="tasks">${icon("arrow")}开始今日任务</button>`)}
      <div class="metric-grid">${metric("今日完成", `${done}/${total || "-"}`, total ? `${Math.round(done / total * 100)}% 完成度` : "等待计划数据", total && done === total ? "success" : "warning")}${metric("累计打卡", summary.checkedTasks || 0, "有证据的服务端记录")}${metric("周测平均", summary.averageScore ? `${summary.averageScore} 分` : "-", `${summary.exams || 0} 次提交`)}${metric("待复习", summary.dueReviews || 0, "到期后优先处理", summary.dueReviews ? "warning" : "success")}</div>
      <div class="content-grid"><div><section class="panel"><div class="panel-head"><div><h2>今日学习任务</h2><p>${today ? `${formatDate(today.date)} · ${text(today.topic || today.stage || "按计划推进")}` : "当前没有匹配到今日计划"}</p></div><button class="panel-action" data-route="tasks">查看全部 ${icon("arrow")}</button></div>${tasks.length ? `<div class="task-list">${tasks.slice(0, 5).map((task) => taskRow(task, today.date)).join("")}</div>` : emptyState("今天暂无任务", "计划数据会由服务端从 16 周学习计划生成。", `<button class="button button-secondary" data-route="sprint">打开冲刺中心</button>`)}</section><section class="panel"><div class="panel-head"><div><h2>最近考试</h2><p>正式周测和练习记录追加保存，不覆盖历史。</p></div><button class="panel-action" data-route="weekly">进入周测 ${icon("arrow")}</button></div>${recent.length ? `<div class="table-wrap"><table><thead><tr><th>周次</th><th>模式</th><th>得分</th><th>状态</th><th>提交时间</th></tr></thead><tbody>${recent.map((exam) => `<tr><td>W${exam.week}</td><td>${exam.mode === "practice" ? "练习" : "周测"}</td><td>${exam.score ?? "-"}</td><td><span class="status ${exam.passed ? "status-success" : "status-warning"}">${exam.passed ? "通过" : exam.manualReviewRequired ? "待复核" : "未通过"}</span></td><td>${formatDateTime(exam.submittedAt)}</td></tr>`).join("")}</tbody></table></div>` : emptyState("还没有考试记录", "完成每日任务后，从周测页面开始第一份试卷。", `<button class="button button-secondary" data-route="weekly">开始周测</button>`)}</section></div><aside><section class="panel"><div class="panel-head"><div><h2>快速入口</h2><p>按参考站点的学习流组织。</p></div></div><div class="link-grid"><a class="link-card" href="#practice"><span class="icon-wrap">${icon("target")}</span><span><h3>分类刷题</h3><p>按知识点和题型开始练习</p></span></a><a class="link-card" href="#sprint"><span class="icon-wrap">${icon("rocket")}</span><span><h3>考前冲刺</h3><p>公式、速记、答题套路和模拟卷</p></span></a><a class="link-card" href="#review"><span class="icon-wrap">${icon("clock")}</span><span><h3>复习队列</h3><p>1/3/7/21 天间隔复习</p></span></a><a class="link-card" href="#reports"><span class="icon-wrap">${icon("chart")}</span><span><h3>学习报告</h3><p>查看能力覆盖与成绩变化</p></span></a></div></section></aside></div>`;
  }

  function taskRow(task, date) {
    const status = task.status || "TODO";
    return `<article class="task-row"><span class="task-check ${status === "DONE" ? "is-done" : ""}">${status === "DONE" ? icon("check") : ""}</span><div><div class="task-title">${text(truncate(task.content || task.title || task.taskId, 180))}</div><div class="task-meta">${text(task.type || "任务")} · ${task.minutes || 0} 分钟 · ${text(task.output || task.evidenceHint || "完成后登记证据")}</div></div><span class="status ${status === "DONE" ? "status-success" : status === "BLOCKED" ? "status-danger" : "status-warning"}">${status === "DONE" ? "已完成" : status === "TODO" ? "待完成" : text(status)}</span></article>`;
  }

  async function renderTasks() {
    const data = await load(`/api/sprint?week=${store.week}`, `plan-${store.week}`);
    store.currentPlan = data.items || [];
    const total = store.currentPlan.reduce((count, entry) => count + (entry.tasks || []).length, 0);
    const done = store.currentPlan.reduce((count, entry) => count + (entry.tasks || []).filter((task) => task.status === "DONE").length, 0);
    return `${pageHead("PLAN / 每日任务", "每日任务与证据", "按照日期、任务、产出和证据顺序完成学习；只有服务端记录才会计入闭环。", `<label class="filter-bar" style="margin:0"><span class="sr-only">选择周次</span><select id="task-week">${Array.from({ length: 16 }, (_, index) => `<option value="${index + 1}" ${store.week === index + 1 ? "selected" : ""}>第 ${index + 1} 周</option>`).join("")}</select></label>`)}
      <div class="metric-grid">${metric("本周任务", total, "学习计划任务总数")}${metric("已完成", done, `${total ? Math.round(done / total * 100) : 0}% 有效完成`, done === total && total ? "success" : "warning")}${metric("计划主题", store.currentPlan[0]?.topic || "-", "按本周第一天显示")}${metric("证据要求", "必填", "路径、命令或复盘摘要")}</div>
      <div class="timeline-list">${store.currentPlan.map((entry) => `<section class="panel"><div class="panel-head"><div><h2>${formatDate(entry.date)} · ${text(entry.day || "学习日")}</h2><p>${text(entry.topic || entry.stage || "学习任务")} · ${text(entry.focus || "完成计划并留下可复核证据")}</p></div><span class="status ${entry.completedTasks === entry.tasks.length ? "status-success" : "status-warning"}">${entry.completedTasks || 0}/${entry.tasks.length} 已完成</span></div><div class="task-list">${(entry.tasks || []).map((task) => taskEditor(task, entry.date)).join("")}</div></section>`).join("") || emptyState("暂无计划", "请检查服务端是否加载了 daily-plan.json。")}</div>`;
  }

  function taskEditor(task, date) {
    const status = task.status || "TODO";
    const evidence = typeof task.evidence === "string" ? task.evidence : "";
    return `<article class="task-row"><span class="task-check ${status === "DONE" ? "is-done" : ""}">${status === "DONE" ? icon("check") : ""}</span><div><div class="task-title">${text(task.content || task.taskId)}</div><div class="task-meta">${text(task.type || "任务")} · ${task.minutes || 0} 分钟 · 产出：${text(task.output || task.evidenceHint || "未指定")}</div><div class="evidence-form"><select aria-label="任务状态" data-task-status="${text(task.taskId)}"><option value="TODO" ${status === "TODO" ? "selected" : ""}>待开始</option><option value="DONE" ${status === "DONE" ? "selected" : ""}>完成</option><option value="PARTIAL" ${status === "PARTIAL" ? "selected" : ""}>部分完成</option><option value="BLOCKED" ${status === "BLOCKED" ? "selected" : ""}>阻塞</option></select><input aria-label="任务证据" data-task-evidence="${text(task.taskId)}" value="${text(evidence)}" placeholder="证据路径、命令结果或复盘摘要（至少 8 字）" /><button class="button button-secondary" data-save-task="${text(task.taskId)}" data-date="${text(date)}">保存</button></div></div><span class="status ${status === "DONE" ? "status-success" : status === "BLOCKED" ? "status-danger" : "status-warning"}">${status === "DONE" ? "已完成" : status === "PARTIAL" ? "部分完成" : status === "BLOCKED" ? "阻塞" : "待开始"}</span></article>`;
  }

  async function renderPractice(search = false) {
    const key = search ? "questions-search" : "questions-all";
    const data = await load("/api/questions?limit=100", key);
    const items = (data.items || []).filter((question) => {
      const matchText = `${question.stem || question.q || ""} ${question.skill_name || ""}`.toLowerCase();
      const typeOk = store.questionType === "all" || question.type === store.questionType;
      return typeOk && (!store.questionFilter || matchText.includes(store.questionFilter.toLowerCase()));
    });
    const title = search ? "题库搜索" : "分类刷题";
    return `${pageHead(search ? "SEARCH / 题库" : "PRACTICE / 练习", title, search ? "按题干、知识点和题型快速定位题目。" : "先按能力模块覆盖，再用周测确认是否真正掌握。", `<button class="button button-primary" data-route="weekly">进入周测 ${icon("arrow")}</button>`)}<section class="panel"><div class="filter-bar"><input id="question-search" value="${text(store.questionFilter)}" placeholder="输入关键词搜索题目或知识点" /><select id="question-type"><option value="all">全部题型</option><option value="single" ${store.questionType === "single" ? "selected" : ""}>单选题</option><option value="multi" ${store.questionType === "multi" ? "selected" : ""}>多选题</option><option value="code" ${store.questionType === "code" ? "selected" : ""}>代码/命令</option><option value="scenario" ${store.questionType === "scenario" ? "selected" : ""}>场景 Rubric</option></select><span class="status status-info">${items.length}/${data.total || 0} 题</span></div>${items.length ? `<div class="question-list">${items.map((question, index) => questionPreview(question, index)).join("")}</div>` : emptyState("没有匹配题目", "换一个关键词或清除题型筛选。")}</section>`;
  }

  function questionPreview(question, index) {
    const title = question.stem || question.q || "未命名题目";
    return `<article class="question-card"><div class="question-top"><span class="question-number">Q${index + 1}</span><span class="chip">${text(question.type || "题目")}</span><span class="chip">${text(question.skill_name || question.skill_id || "通用能力")}</span><span class="muted">${text(question.level || "")}</span></div><h3 class="question-title is-clamped">${text(title)}</h3><div class="question-footer"><span class="muted">${text(question.source || "学习计划题库")} · ${question.minutes || 2} 分钟</span><button class="button button-secondary" data-preview-question="${text(question.id)}">查看题目 ${icon("arrow")}</button></div></article>`;
  }

  const sprintCalcItems = [
    ["流水线", "吞吐率、加速比、效率", "先画阶段和瓶颈，再区分单条延迟与整体吞吐。"],
    ["存储系统", "Cache 命中率 / 平均访问时间", "注意命中率、命中时间和缺失代价的单位。"],
    ["系统可靠性", "串联 / 并联可靠性", "串联系统取乘积，并联系统先算全部失败概率。"],
    ["差错控制", "海明校验码 / CRC", "先确定校验位数量，再按位位置和生成多项式计算。"],
    ["项目管理", "关键路径 / PERT", "关键路径决定工期，PERT 需要区分乐观、最可能和悲观估计。"],
    ["操作系统", "页面置换 / 缺页计算", "按访问序列逐步维护页框，不能跳过置换时刻。"],
    ["计算机网络", "子网划分 / IP 地址", "先确认网络位和主机位，再算地址范围与广播地址。"],
    ["数据库", "范式判定 / 属性闭包", "先写函数依赖，再计算闭包，不直接凭记忆判断。"]
  ];

  const sprintPoints = [
    ["软件架构", "数据流=管道过滤器；调用返回=主程序/子程序、面向对象、分层；独立构件=事件驱动；虚拟机=解释器/规则；仓库=数据库/黑板。"],
    ["质量属性", "场景六要素：刺激源、刺激、环境、制品、响应、响应度量；性能看资源需求/管理/仲裁；安全看抵抗、检测、恢复。"],
    ["架构评估", "ATAM 关注敏感点、权衡点、风险点和非风险点；SAAM 侧重可修改性；CBAM 加入成本效益。"],
    ["设计模式", "创建型 5 个、结构型 7 个、行为型 11 个；工厂方法是单一产品，抽象工厂是产品族。"],
    ["分布式与数据库", "CAP 的 P 必选，C/A 取舍；ACID 与隔离级别要结合脏读、不可重复读和幻读解释。"],
    ["网络与安全", "对称加密快但密钥分发难；非对称加密解决密钥分发；私钥签名、公钥验证。"],
    ["测试", "白盒覆盖由语句到路径逐渐增强；黑盒常用等价类、边界值、因果图和正交实验。"]
  ];

  const sprintSkills = [
    ["通用答题流程", ["通读材料并圈出业务场景、约束和质量属性", "定位知识点，再按题干分点作答", "涉及权衡时写清优点、缺点和适用场景", "根据分值补足要点数量"]],
    ["架构设计类", ["先给选型结论，再用质量属性说明理由", "把性能、可用性、可修改性和安全性落到战术", "对比方案使用维度 × 方案结构", "说明边界条件和迁移成本"]],
    ["论文写作类", ["先确定项目背景、约束和本人职责", "正文按问题、方案、权衡、落地和验证展开", "所有效果指标给出采集口径和时间范围", "结尾总结不足、改进和下一步"]]
  ];

  async function renderKnowledge() {
    const data = await load("/api/knowledge");
    const skills = Object.entries(data.skills || {});
    return `${pageHead("KNOWLEDGE / 知识导图", "能力地图", "把学习计划中的 18 个 skill_id 作为主索引，按里程碑推进。", `<button class="button button-secondary" data-route="reports">查看掌握度 ${icon("arrow")}</button>`)}<section class="panel"><div class="panel-head"><div><h2>技能目录</h2><p>W1-W4 为 M1，W5-W8 为 M2，W9-W12 为 M3，W13-W16 为 M4。</p></div><span class="status status-info">题库 v${text(data.bankVersion || "3.1")}</span></div><div class="sprint-grid">${skills.map(([id, name]) => `<article class="sprint-card"><div class="icon-wrap">${icon("book")}</div><h3>${text(name)}</h3><p>${text(id)} · ${text(data.skillMilestones?.[id] || "横切能力")}</p><div class="card-meta">查看关联题目 ${icon("arrow")}</div></article>`).join("")}</div></section>`;
  }

  async function renderPapers() {
    const data = await load("/api/essays");
    const items = data.items || [];
    return `${pageHead("PAPERS / 案例与论文", "案例与论文", "开放题不做虚假的自动判分，提交后保留人工复核入口和证据。", `<button class="button button-primary" data-route="sprint">查看答题套路 ${icon("arrow")}</button>`)}<section class="panel"><div class="panel-head"><div><h2>开放题库</h2><p>案例题与论文题优先检查结构、证据和迁移能力。</p></div><span class="status status-warning">需人工复核</span></div>${items.length ? `<div class="question-list">${items.map((question, index) => `<article class="question-card"><div class="question-top"><span class="question-number">${index + 1}</span><span class="chip">${text(question.type)}</span><span class="chip">${text(question.skill_name || question.skill_id)}</span></div><h3 class="question-title">${text(truncate(question.stem || question.q, 240))}</h3><p class="muted">来源：${text(question.source || "学习计划题库")} · 评分方式：Rubric/人工复核</p></article>`).join("")}</div>` : emptyState("暂无开放题", "题库接口没有返回案例或论文题。")}</section>`;
  }

  function sprintCard(route, title, description, meta, iconName = "rocket") {
    return `<button class="sprint-card" data-sprint-action="${route}"><span class="icon-wrap">${icon(iconName)}</span><h3>${text(title)}</h3><p>${text(description)}</p><span class="card-meta">${text(meta)} ${icon("arrow")}</span></button>`;
  }

  function renderSprint() {
    if (store.sprintView) return renderSprintDetail(store.sprintView);
    return `${pageHead("SPRINT / 冲刺", "考前冲刺中心", "集中处理计算题、英语术语、必考点、易错点和答题套路。", `<button class="button button-primary" data-route="weekly">生成模拟卷 ${icon("arrow")}</button>`)}<section class="panel"><div class="panel-head"><div><h2>冲刺工具</h2><p>把高频内容拆成可重复的短动作，避免题目文字堆在一个页面里。</p></div></div><div class="sprint-grid">${sprintCard("mock", "生成模拟卷", "从周题库随机组卷，提交后保留历史。", "模拟考试 / 练习模式", "clipboard")}${sprintCard("calc", "计算题汇总", "流水线、Cache、可靠性、网络和数据库计算。", `${sprintCalcItems.length} 类公式`, "chart")}${sprintCard("words", "英语单词", "翻卡背诵专业英语术语，记录掌握进度。", `${getUniqueSprintWords().length} 个术语`, "book")}${sprintCard("points", "必考速记", "按架构、质量属性、数据库和安全分章复习。", `${sprintPoints.length} 条要点`, "target")}${sprintCard("skills", "答题套路", "案例分析和论文写作的通用结构。", `${sprintSkills.length} 套结构`, "file")}${sprintCard("ai", "AI 出题", "按知识点生成额外练习，结果进入练习记录。", "按需生成", "plus")}</div></section><section class="content-grid"><section class="panel"><div class="panel-head"><div><h2>今日冲刺清单</h2><p>按计划完成一轮短复习，再开始周测。</p></div></div><div class="task-list"><div class="task-row"><span class="task-check">${icon("check")}</span><div><div class="task-title">背一组英语术语并标记不熟词</div><div class="task-meta">10 分钟 · 先记含义，再回忆应用场景</div></div><span class="status status-info">建议</span></div><div class="task-row"><span class="task-check">${icon("check")}</span><div><div class="task-title">按类型过一遍公式和一个例题</div><div class="task-meta">20 分钟 · 记录公式适用条件和边界</div></div><span class="status status-info">建议</span></div><div class="task-row"><span class="task-check">${icon("check")}</span><div><div class="task-title">复盘最近一次错题的错误原因</div><div class="task-meta">15 分钟 · 不只记录正确答案</div></div><span class="status status-info">建议</span></div></div></section><section class="panel"><div class="panel-head"><div><h2>冲刺原则</h2><p>每个动作都要留下一条可复核记录。</p></div></div><div class="notice" data-tone="warning">低分不通过时，优先补对应能力和复习队列，不通过重复刷题次数掩盖薄弱点。</div><div class="notice">开放题和安全题保留人工复核状态，系统不会用猜测替代证据。</div></section></section>`;
  }

  function renderSprintDetail(view) {
    const back = `<button class="button button-secondary" data-sprint-back>${icon("arrow")}返回冲刺中心</button>`;
    if (view === "calc") return `${pageHead("SPRINT / 计算题", "计算题汇总", "先确认公式适用条件，再用一个小例题验证计算过程。", back)}<section class="panel"><div class="sprint-grid">${sprintCalcItems.map(([title, formula, note]) => `<article class="sprint-card"><div class="icon-wrap">${icon("chart")}</div><h3>${text(title)}</h3><p>${text(formula)}</p><div class="card-meta">${text(note)}</div></article>`).join("")}</div></section>`;
    if (view === "points") return `${pageHead("SPRINT / 速记", "必考速记", "短句只用于唤醒知识点，真正掌握仍需回到题目、代码或复盘证据。", back)}<section class="panel"><div class="question-list">${sprintPoints.map(([title, note]) => `<article class="question-card"><div class="question-top"><span class="question-number">${text(title)}</span><span class="chip">高频</span></div><p class="question-title">${text(note)}</p></article>`).join("")}</div></section>`;
    if (view === "skills") return `${pageHead("SPRINT / 答题", "答题套路", "用结构保证覆盖要点，不用模板替代对材料和证据的理解。", back)}<section class="sprint-grid">${sprintSkills.map(([title, steps]) => `<article class="panel"><div class="panel-head"><div><h2>${text(title)}</h2><p>逐条检查，再开始作答。</p></div></div><ol>${steps.map((step) => `<li style="margin:8px 0;color:var(--muted)">${text(step)}</li>`).join("")}</ol></article>`).join("")}</section>`;
    if (view === "words") return `${pageHead("SPRINT / 单词", "英语单词", "参考站点采用卡片背诵；当前版本提供工程术语卡片结构，进度保存在当前浏览器。", back)}<section class="content-grid"><section class="panel"><div class="word-card"><button data-word-card><strong id="word-term">architecture</strong><span id="word-meaning">点击卡片显示释义</span></button></div><div class="head-actions" style="margin-top:14px;justify-content:center"><button class="button button-secondary" data-word-action="unknown">不认识</button><button class="button button-primary" data-word-action="known">认识</button></div></section><section class="panel"><div class="panel-head"><div><h2>背单词进度</h2><p>当前提供术语卡片交互；完整词表可由课程资源目录继续导入。</p></div></div><div class="metric-value" id="word-progress">0 / ${getUniqueSprintWords().length}</div><div class="progress"><i id="word-progress-bar" style="width:0%"></i></div></section></section>`;
    if (view === "ai") return `${pageHead("SPRINT / 练习", "按知识点练习", "当前使用已有题库做受控随机练习，不伪造模型生成结果；接入模型后保留同一题目和审计契约。", back)}<section class="panel"><div class="filter-bar"><label>知识点 <select id="ai-skill"><option value="">全部能力</option></select></label><label>题量 <select id="ai-limit"><option value="3">3 题</option><option value="5">5 题</option></select></label><button class="button button-primary" data-generate-practice>${icon("play")}生成练习</button></div><div id="ai-skill-hint" class="notice">选择知识点后，系统会从现有题库抽取练习卷，练习成绩不改变正式掌握度。</div></section>`;
    return renderSprint();
  }

  async function renderWeekly() {
    const exams = await load("/api/exams", "exams");
    const history = exams.items || [];
    if (store.exam) return renderExamSession(store.exam);
    return `${pageHead("WEEKLY / 周测", "周测与历史", "先完成当天任务，再提交一份服务端记录的周测；练习和正式记录分开。", `<button class="button button-primary" data-start-exam="weekly">开始第 ${store.week} 周测 ${icon("arrow")}</button>`)}<section class="panel"><div class="filter-bar"><label>周次 <select id="exam-week">${Array.from({ length: 16 }, (_, index) => `<option value="${index + 1}" ${store.week === index + 1 ? "selected" : ""}>W${index + 1}</option>`).join("")}</select></label><span class="status status-info">题库 3.1 · 客观题服务端判分</span></div><div class="notice" data-tone="warning">代码题、场景题提交后显示“待人工复核”，不会被错误地自动判为通过。</div>${history.length ? `<div class="table-wrap"><table><thead><tr><th>周次</th><th>模式</th><th>题数</th><th>得分</th><th>状态</th><th>时间</th></tr></thead><tbody>${history.map((exam) => `<tr><td>W${exam.week}</td><td>${exam.mode === "practice" ? "练习" : "周测"}</td><td>${exam.total}</td><td>${exam.score ?? "-"}</td><td><span class="status ${exam.passed ? "status-success" : exam.manualReviewRequired ? "status-warning" : "status-danger"}">${exam.passed ? "通过" : exam.manualReviewRequired ? "待复核" : "未通过"}</span></td><td>${formatDateTime(exam.submittedAt || exam.startedAt)}</td></tr>`).join("")}</tbody></table></div>` : emptyState("暂无周测记录", "选择周次并开始第一份试卷。", `<button class="button button-primary" data-start-exam="weekly">开始周测</button>`)}</section>`;
  }

  function renderExamSession(exam) {
    const questions = exam.questions || [];
    const answered = Object.keys(store.examAnswers).length;
    return `${pageHead("EXAM / 作答", `W${exam.week} 周测`, "每道题独立显示题型和技能标签；提交后服务端保存答案与结果。", `<span class="status status-info">${answered}/${questions.length} 已作答</span>`)}<div class="exam-layout"><div>${questions.map((question, index) => examQuestion(question, index)).join("")}<div class="exam-submit"><button class="button button-primary" data-submit-exam="${text(exam.id)}">提交并查看结果 ${icon("send")}</button></div></div><aside class="exam-sidebar"><div class="exam-progress"><strong>${answered}/${questions.length}</strong><span class="muted">当前完成度</span><div class="progress" style="margin-top:10px"><i style="width:${questions.length ? answered / questions.length * 100 : 0}%"></i></div></div><div class="panel"><div class="panel-head"><div><h3>作答提示</h3><p>开放题提交后进入人工复核。</p></div></div><div class="muted">不要复制题干作为答案。选择题请先判断，再提交。</div></div></aside></div>`;
  }

  function examQuestion(question, index) {
    const type = question.type || "single";
    const selected = store.examAnswers[question.id];
    const options = question.options || [];
    const isMulti = type === "multi";
    const inputType = isMulti ? "checkbox" : "radio";
    return `<article class="exam-question"><div class="question-top"><span class="question-number">${String(index + 1).padStart(2, "0")}</span><span class="chip">${text(type)}</span><span class="chip">${text(question.skill_name || question.skill_id || "通用能力")}</span><span class="muted">${text(question.level || "")}</span></div><h3>${text(question.stem || question.q || "未命名题目")}</h3>${options.length ? `<div class="question-options">${options.map((option, optionIndex) => { const checked = isMulti ? Array.isArray(selected) && selected.includes(optionIndex) : Number(selected) === optionIndex; return `<label class="option ${checked ? "is-selected" : ""}"><input type="${inputType}" name="question-${text(question.id)}" value="${optionIndex}" data-answer-question="${text(question.id)}" ${checked ? "checked" : ""} />${String.fromCharCode(65 + optionIndex)}. ${text(option)}</label>`; }).join("")}</div>` : `<label class="field"><span>开放作答</span><textarea name="answer-${text(question.id)}" aria-label="开放作答" data-open-answer="${text(question.id)}" placeholder="写出判断依据、步骤和验收证据"></textarea></label>`}</article>`;
  }

  async function renderReviews(onlyWrong = false) {
    const data = await load("/api/reviews?due=false", "reviews-all");
    const items = data.items || [];
    const filtered = onlyWrong ? items.filter((item) => item.lastCorrect === false) : items;
    return `${pageHead(onlyWrong ? "WRONG / 错题本" : "REVIEW / 复习", onlyWrong ? "错题本" : "复习队列", "按服务端记录的间隔推进，答错重置，答对逐步延长间隔。", `<button class="button button-secondary" data-action="refresh">${icon("refresh")}刷新</button>`)}<section class="panel"><div class="panel-head"><div><h2>${filtered.length ? `${filtered.length} 条待处理记录` : "暂无待处理记录"}</h2><p>复习间隔：1 天 → 3 天 → 7 天 → 21 天。</p></div><span class="status ${filtered.length ? "status-warning" : "status-success"}">${filtered.length ? "需要复习" : "保持节奏"}</span></div>${filtered.length ? `<div class="review-list">${filtered.map(reviewItem).join("")}</div>` : emptyState("复习队列为空", "提交周测后，系统会按题目表现生成复习记录。", `<button class="button button-secondary" data-route="weekly">开始一份周测</button>`)}</section>`;
  }

  function reviewItem(item) {
    const question = item.question || {};
    return `<article class="review-item"><div><div class="question-top"><span class="chip">${text(question.type || "题目")}</span><span class="chip">${text(question.skill_name || question.skill_id || "通用能力")}</span><span class="status ${item.nextReviewAt && new Date(item.nextReviewAt) <= new Date() ? "status-warning" : "status-info"}">${item.nextReviewAt && new Date(item.nextReviewAt) <= new Date() ? "已到期" : `第 ${Number(item.stage || 0) + 1} 阶段`}</span></div><h3>${text(truncate(question.stem || question.q, 220))}</h3><p>下次复习：${formatDateTime(item.nextReviewAt)} · ${item.lastCorrect ? "上次答对" : "上次答错或未完成"}</p>${question.options?.length ? `<div class="question-options" style="margin-top:10px">${question.options.map((option, index) => `<label class="option"><input type="radio" name="review-${text(item.id)}" value="${index}" data-review-answer="${text(item.id)}" />${String.fromCharCode(65 + index)}. ${text(option)}</label>`).join("")}</div>` : ""}</div><button class="button button-secondary" data-answer-review="${text(item.id)}">提交复习</button></article>`;
  }

  async function renderReports() {
    const data = await load("/api/report", "report");
    store.report = data;
    const exams = data.exams || [];
    const practiceExams = data.practiceExams || [];
    const checkins = data.checkins || {};
    const skills = data.bySkill || [];
    const reportText = JSON.stringify(data, null, 2);
    return `${pageHead("REPORT / 报告", "学习报告", "把打卡、考试和技能正确率放在同一份可导出的服务端报告中。", `<button class="button button-secondary" data-export-report="json">下载 JSON ${icon("arrow")}</button>`)}<div class="metric-grid">${metric("有效打卡", checkins.done || 0, `共 ${checkins.total || 0} 条记录`)}${metric("正式考试", exams.length, `${practiceExams.length} 次练习不计入掌握度`)}${metric("技能样本", skills.reduce((sum, item) => sum + item.attempts, 0), "已关联题目次数")}${metric("平均正确率", skills.length ? `${Math.round(skills.reduce((sum, item) => sum + item.accuracy, 0) / skills.length)}%` : "-", "按技能平均")}</div><section class="panel"><div class="panel-head"><div><h2>技能掌握概览</h2><p>当前报告按客观题结果统计，开放题仍需人工复核。</p></div></div>${skills.length ? `<div class="table-wrap"><table><thead><tr><th>Skill</th><th>题次</th><th>答对</th><th>正确率</th></tr></thead><tbody>${skills.map((item) => `<tr><td><strong>${text(item.name || item.skill)}</strong><div class="muted">${text(item.skill)}</div></td><td>${item.attempts}</td><td>${item.correct}</td><td><div>${item.accuracy}%</div><div class="progress" style="margin-top:6px"><i style="width:${item.accuracy}%"></i></div></td></tr>`).join("")}</tbody></table></div>` : emptyState("还没有掌握度样本", "提交一份客观题周测后，这里会按技能累计结果。")}</section><section class="panel"><div class="panel-head"><div><h2>原始报告</h2><p>可作为迁移或后续飞书回写的输入，不包含密码和会话数据。</p></div><button class="panel-action" data-copy-report>复制 JSON ${icon("arrow")}</button></div><pre class="report-code">${text(reportText)}</pre></section>`;
  }

  async function renderSaved() {
    const data = await load("/api/notes", "notes");
    const notes = data.items || [];
    return `${pageHead("SAVED / 个人资料", "收藏与笔记", "把关键题目、复盘结论和下一步动作留在个人工作区。", `<button class="button button-primary" data-action="new-note">${icon("plus")}新建笔记</button>`)}<section class="content-grid"><section class="panel"><div class="panel-head"><div><h2>我的笔记</h2><p>笔记保存到当前账号，不与其他用户共享。</p></div></div>${notes.length ? `<div class="question-list">${notes.map((note) => `<article class="question-card"><div class="question-top"><span class="chip">学习笔记</span><span class="muted">${formatDateTime(note.updatedAt || note.createdAt)}</span></div><h3 class="question-title">${text(note.title || "未命名笔记")}</h3><p class="muted" style="white-space:pre-wrap">${text(truncate(note.content, 320))}</p></article>`).join("")}</div>` : emptyState("还没有笔记", "从周测或题库中记录一个可复用的工程结论。", `<button class="button button-secondary" data-action="new-note">新建第一条</button>`)}</section><section class="panel"><div class="panel-head"><div><h2>收藏题目</h2><p>收藏功能将在题目详情中开启。</p></div></div>${emptyState("暂无收藏", "先从题库搜索一条题目开始复习。", `<button class="button button-secondary" data-route="question-bank">打开题库</button>`)}</section></section>`;
  }

  function renderProfile() {
    const user = store.user || {};
    return `${pageHead("PROFILE / 设置", "个人设置", "管理当前账号、主题和学习数据边界。", `<button class="button button-danger" data-action="logout">退出登录</button>`)}<section class="content-grid"><section class="panel"><div class="panel-head"><div><h2>账户信息</h2><p>多用户数据按服务端 userId 隔离。</p></div></div><div class="task-list"><div class="task-row"><span class="avatar">${text((user.username || "U").slice(0, 1).toUpperCase())}</span><div><div class="task-title">${text(user.username || "游客")}</div><div class="task-meta">${text(user.email || "本地演示账户")}</div></div><span class="status status-success">${store.guest ? "本地演示" : "已登录"}</span></div></div></section><section class="panel"><div class="panel-head"><div><h2>显示主题</h2><p>主题偏好保存到当前账号；未登录时保存在当前浏览器。</p></div></div><div class="head-actions"><button class="button ${store.theme === "light" ? "button-primary" : "button-secondary"}" data-set-theme="light">${icon("sun")}明亮模式</button><button class="button ${store.theme === "dark" ? "button-primary" : "button-secondary"}" data-set-theme="dark">${icon("moon")}暗黑模式</button><button class="button ${store.theme === "system" ? "button-primary" : "button-secondary"}" data-set-theme="system">跟随系统</button></div></section></section>`;
  }

  async function renderRoute() {
    if (!store.user && !store.guest) return showAuth();
    if (!routes[store.route]) store.route = "overview";
    buildNav();
    $("#page-breadcrumb").textContent = routeInfo().label;
    const main = $("#main-content");
    main.innerHTML = `<div class="notice">正在加载 ${text(routeInfo().label)}...</div>`;
    try {
      let html;
      if (store.guest) html = renderGuestRoute();
      else if (store.route === "overview") html = renderOverview(await load("/api/dashboard", "dashboard"));
      else if (store.route === "tasks") html = await renderTasks();
      else if (store.route === "practice") html = await renderPractice(false);
      else if (store.route === "question-bank") html = await renderPractice(true);
      else if (store.route === "knowledge") html = await renderKnowledge();
      else if (store.route === "papers") html = await renderPapers();
      else if (store.route === "sprint") html = renderSprint();
      else if (store.route === "weekly") html = await renderWeekly();
      else if (store.route === "review") html = await renderReviews(false);
      else if (store.route === "wrong") html = await renderReviews(true);
      else if (store.route === "reports") html = await renderReports();
      else if (store.route === "saved") html = await renderSaved();
      else if (store.route === "profile") html = renderProfile();
      main.innerHTML = html;
      hydrateIcons(main);
      if (store.route === "sprint" && store.sprintView) await setupSprintDetail(store.sprintView);
      main.focus({ preventScroll: true });
    } catch (error) {
      main.innerHTML = `<section class="panel">${emptyState("页面加载失败", error.message, `<button class="button button-secondary" data-action="refresh">重新加载</button>`)}</section>`;
      toast(error.message, "danger");
    }
  }

  async function setupSprintDetail(view) {
    if (view === "ai") {
      const data = await load("/api/knowledge");
      const select = $("#ai-skill");
      if (select) select.insertAdjacentHTML("beforeend", Object.entries(data.skills || {}).map(([id, name]) => `<option value="${text(id)}">${text(name)}</option>`).join(""));
    }
    if (view === "words") updateWordCard(false);
  }

  const sprintWords = [
    ["architecture", "架构设计"], ["component", "软件构件"], ["middleware", "中间件"],
    ["availability", "可用性"], ["modifiability", "可修改性"], ["reliability", "可靠性"],
    ["throughput", "吞吐量"], ["latency", "延迟"], ["consistency", "一致性"],
    ["resilience", "韧性 / 弹性"], ["observability", "可观测性"], ["idempotency", "幂等性"],
    ["provenance", "来源溯源"], ["retrieval", "检索"], ["orchestration", "编排"]
  ];

  function getUniqueSprintWords() {
    const seen = new Set();
    return sprintWords.filter(([term]) => {
      const key = String(term || "").trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function wordProgressKey() {
    const account = store.guest ? "guest" : (store.user?.id || "guest");
    return `agent-lab-word-progress:${account}`;
  }

  function readWordProgress(words = getUniqueSprintWords()) {
    const wordKeys = new Set(words.map(([term]) => String(term).trim().toLowerCase()));
    try {
      const saved = JSON.parse(localStorage.getItem(wordProgressKey()) || "{}");
      const known = Array.isArray(saved.known)
        ? [...new Set(saved.known.map((term) => String(term).trim().toLowerCase()))].filter((term) => wordKeys.has(term))
        : [];
      const index = Number(saved.index);
      return { index: Number.isFinite(index) && index >= 0 ? Math.floor(index) : 0, known };
    } catch {
      return { index: 0, known: [] };
    }
  }

  function saveWordProgress(progress) {
    localStorage.setItem(wordProgressKey(), JSON.stringify({ index: progress.index, known: progress.known }));
  }

  function updateWordCard(reveal) {
    const words = getUniqueSprintWords();
    const term = $("#word-term");
    const meaning = $("#word-meaning");
    if (!term || !meaning) return;
    if (!words.length) {
      term.textContent = "暂无术语";
      meaning.textContent = "当前没有可复习的术语";
      return;
    }
    const progressState = readWordProgress(words);
    const index = progressState.index % words.length;
    term.textContent = words[index][0];
    meaning.textContent = reveal ? words[index][1] : "点击卡片显示释义";
    const known = progressState.known.length;
    const progress = $("#word-progress");
    const bar = $("#word-progress-bar");
    if (progress) progress.textContent = `${known} / ${words.length}`;
    if (bar) bar.style.width = `${Math.min(known / words.length * 100, 100)}%`;
  }

  function renderGuestRoute() {
    const cards = Object.entries(routes).slice(0, 8).map(([key, route]) => `<button class="link-card" data-route="${key}"><span class="icon-wrap">${icon(route.icon)}</span><span><h3>${text(route.label)}</h3><p>游客模式只展示界面，登录后保存真实学习数据。</p></span></button>`).join("");
    return `${pageHead("DEMO / 游客模式", "本地演示工作台", "当前未连接服务端账号。注册或登录后，打卡和周测才会进入个人数据。", `<button class="button button-primary" data-action="logout">返回登录</button>`)}<section class="panel"><div class="panel-head"><div><h2>功能预览</h2><p>你可以先查看信息架构和主题，创建账号后开始正式学习。</p></div></div><div class="link-grid">${cards}</div></section>`;
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    const account = $("#auth-account").value.trim();
    const password = $("#auth-password").value;
    try {
      if (store.authMode === "register") {
        const displayName = $("#auth-name").value.trim();
        const username = (displayName || account.split("@")[0]).replace(/[^\u4e00-\u9fa5A-Za-z0-9_-]/g, "").slice(0, 32);
        const email = account.includes("@") ? account : `${username || "learner"}@local.test`;
        const payload = await api("/api/auth/register", { method: "POST", body: JSON.stringify({ username: username || "learner", email, password }) });
        store.user = payload.user;
        store.guest = false;
        toast("账户已创建，学习记录会按账号保存", "success");
      } else {
        const payload = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identity: account, password }) });
        store.user = payload.user;
        store.guest = false;
        toast("登录成功", "success");
      }
      showApp();
    } catch (error) { toast(error.message, "danger"); }
  }

  async function saveTask(button) {
    const taskId = button.dataset.saveTask;
    const date = button.dataset.date;
    const status = $(`[data-task-status="${CSS.escape(taskId)}"]`).value;
    const evidence = $(`[data-task-evidence="${CSS.escape(taskId)}"]`).value.trim();
    if (status === "DONE" && evidence.length < 8) return toast("完成任务前请填写至少 8 个字符的可复核证据", "warning");
    try {
      await api("/api/checkins", { method: "POST", body: JSON.stringify({ date, taskId, status, evidence }) });
      invalidate(`plan-${store.week}`, "dashboard", "report");
      toast("任务记录已保存", "success");
      await renderRoute();
    } catch (error) { toast(error.message, "danger"); }
  }

  async function startExam(mode = "weekly") {
    const select = $("#exam-week");
    if (select) store.week = Number(select.value);
    try {
      const payload = await api("/api/exams/start", { method: "POST", body: JSON.stringify({ week: store.week, mode: mode === "practice" ? "practice" : "weekly" }) });
      store.exam = payload;
      store.examAnswers = {};
      await renderRoute();
    } catch (error) { toast(error.message, "danger"); }
  }

  function syncExamAnswers() {
    $$('[data-answer-question]').forEach((input) => {
      const id = input.dataset.answerQuestion;
      const checked = $$(`[data-answer-question="${CSS.escape(id)}"]`).filter((item) => item.checked).map((item) => Number(item.value));
      store.examAnswers[id] = input.type === "checkbox" ? checked : checked[0];
    });
    $$('[data-open-answer]').forEach((input) => { store.examAnswers[input.dataset.openAnswer] = input.value; });
  }

  async function submitExam(button) {
    syncExamAnswers();
    try {
      const payload = await api(`/api/exams/${encodeURIComponent(button.dataset.submitExam)}/submit`, { method: "POST", body: JSON.stringify({ answers: store.examAnswers }) });
      store.exam = null;
      store.examAnswers = {};
      invalidate("exams", "reviews-all", "dashboard", "report");
      toast(`考试已提交，得分 ${payload.score ?? 0}`, payload.passed ? "success" : "warning");
      await renderRoute();
    } catch (error) { toast(error.message, "danger"); }
  }

  async function answerReview(button) {
    const reviewId = button.dataset.answerReview;
    const input = $(`[data-review-answer="${CSS.escape(reviewId)}"]:checked`);
    if (!input) return toast("请先选择一个答案", "warning");
    try {
      const payload = await api(`/api/reviews/${encodeURIComponent(reviewId)}/answer`, { method: "POST", body: JSON.stringify({ answer: Number(input.value) }) });
      invalidate("reviews-all", "dashboard", "report");
      toast(payload.correct ? "回答正确，复习间隔已推进" : "回答不正确，间隔已重置", payload.correct ? "success" : "warning");
      await renderRoute();
    } catch (error) { toast(error.message, "danger"); }
  }

  async function setTheme(theme) {
    applyTheme(theme);
    if (store.user && !store.guest) {
      try { const payload = await api("/api/profile/theme", { method: "POST", body: JSON.stringify({ theme }) }); store.user = payload.user; } catch (error) { toast(error.message, "danger"); }
    }
    await renderRoute();
  }

  function showQuestion(question) {
    const options = question.options || [];
    $("#modal-root").innerHTML = `<div class="modal-backdrop" data-close-modal><section class="modal" role="dialog" aria-modal="true" aria-labelledby="question-modal-title"><div class="modal-head"><div><div class="section-kicker">题目详情</div><h2 id="question-modal-title">${text(question.skill_name || question.skill_id || "题目")}</h2></div><button class="icon-btn" data-close-modal aria-label="关闭">${icon("close")}</button></div><div class="modal-body"><div class="question-top"><span class="chip">${text(question.type || "题目")}</span><span class="chip">${text(question.level || "")}</span></div><p style="margin-top:14px;color:var(--ink);font-weight:700;line-height:1.7">${text(question.stem || question.q)}</p>${options.length ? `<div class="question-options">${options.map((option, index) => `<div class="option">${String.fromCharCode(65 + index)}. ${text(option)}</div>`).join("")}</div>` : `<div class="notice" data-tone="warning">这是开放题，开始周测后提交作答并进入人工复核。</div>`}</div><div class="head-actions" style="margin-top:18px"><button class="button button-secondary" data-close-modal>关闭</button><button class="button button-primary" data-route="weekly" data-close-modal>去周测</button></div></section></div>`;
    hydrateIcons($("#modal-root"));
  }

  function showNoteModal() {
    $("#modal-root").innerHTML = `<div class="modal-backdrop" data-close-modal><section class="modal" role="dialog" aria-modal="true" aria-labelledby="note-modal-title"><div class="modal-head"><h2 id="note-modal-title">新建学习笔记</h2><button class="icon-btn" data-close-modal aria-label="关闭">${icon("close")}</button></div><form id="note-form" class="stack-form"><label class="field"><span>标题</span><input name="title" required placeholder="例如：SSE 断线重连的三个边界" /></label><label class="field"><span>内容</span><textarea name="content" required placeholder="记录结论、证据和下一步动作"></textarea></label><button class="button button-primary" type="submit">保存笔记 ${icon("send")}</button></form></section></div>`;
    hydrateIcons($("#modal-root"));
  }

  async function saveNote(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try { await api("/api/notes", { method: "POST", body: JSON.stringify(data) }); invalidate("notes"); $("#modal-root").innerHTML = ""; toast("笔记已保存", "success"); if (store.route === "saved") await renderRoute(); } catch (error) { toast(error.message, "danger"); }
  }

  async function logout() {
    if (!store.guest) { try { await api("/api/auth/logout", { method: "POST", body: "{}" }); } catch {} }
    store.user = null; store.guest = false; store.cache = {}; store.exam = null; location.hash = "overview"; showAuth(); toast("已退出登录", "success");
  }

  document.addEventListener("click", async (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) { event.preventDefault(); const next = routeButton.dataset.route; if (next) { if (routeButton.dataset.closeModal) $("#modal-root").innerHTML = ""; if (next === "sprint") store.sprintView = ""; store.route = next; location.hash = next; $("#app-shell").classList.remove("nav-open"); await renderRoute(); } return; }
    const authTab = event.target.closest("[data-auth-mode]");
    if (authTab) { setAuthMode(authTab.dataset.authMode); return; }
    const themeButton = event.target.closest('[data-action="theme"]');
    if (themeButton) { await setTheme(store.theme === "dark" ? "light" : "dark"); return; }
    const setThemeButton = event.target.closest("[data-set-theme]");
    if (setThemeButton) { await setTheme(setThemeButton.dataset.setTheme); return; }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "guest") { store.user = { username: "游客", email: "local-demo" }; store.guest = true; showApp(); toast("已进入本地演示，不会保存到服务端", "warning"); return; }
    if (action === "logout") { await logout(); return; }
    if (action === "open-nav") { $("#app-shell").classList.add("nav-open"); return; }
    if (action === "close-nav") { $("#app-shell").classList.remove("nav-open"); return; }
    if (action === "refresh") { store.cache = {}; await renderRoute(); return; }
    if (action === "new-note") { showNoteModal(); return; }
    if (action === "profile-menu") { store.route = "profile"; location.hash = "profile"; await renderRoute(); return; }
    if (action === "notifications") { toast("当前没有新的学习通知", "info"); return; }
    const saveTaskButton = event.target.closest("[data-save-task]");
    if (saveTaskButton) { await saveTask(saveTaskButton); return; }
    const startButton = event.target.closest("[data-start-exam]");
    if (startButton) { await startExam(startButton.dataset.startExam); return; }
    const submitButton = event.target.closest("[data-submit-exam]");
    if (submitButton) { await submitExam(submitButton); return; }
    const reviewButton = event.target.closest("[data-answer-review]");
    if (reviewButton) { await answerReview(reviewButton); return; }
    const preview = event.target.closest("[data-preview-question]");
    if (preview) { const data = await load("/api/questions?limit=100", "questions-all"); const question = (data.items || []).find((item) => item.id === preview.dataset.previewQuestion); if (question) showQuestion(question); return; }
    const sprintAction = event.target.closest("[data-sprint-action]");
    if (sprintAction) { const type = sprintAction.dataset.sprintAction; if (type === "mock") { store.sprintView = ""; store.route = "weekly"; location.hash = "weekly"; } else { store.sprintView = type; } await renderRoute(); return; }
    if (event.target.closest("[data-sprint-back]")) { store.sprintView = ""; await renderRoute(); return; }
    if (event.target.closest("[data-word-card]")) { const meaning = $("#word-meaning"); updateWordCard(meaning?.textContent === "点击卡片显示释义"); return; }
    const wordAction = event.target.closest("[data-word-action]");
    if (wordAction) {
      const words = getUniqueSprintWords();
      if (!words.length) return toast("当前没有可复习的术语", "warning");
      const progressState = readWordProgress(words);
      const current = progressState.index % words.length;
      if (wordAction.dataset.wordAction === "known") {
        const currentKey = String(words[current][0]).trim().toLowerCase();
        if (!progressState.known.includes(currentKey)) progressState.known.push(currentKey);
      }
      progressState.index = current + 1;
      saveWordProgress(progressState);
      updateWordCard(false);
      toast(wordAction.dataset.wordAction === "known" ? "已加入掌握进度" : "保留到下一轮复习", wordAction.dataset.wordAction === "known" ? "success" : "info");
      return;
    }
    if (event.target.closest("[data-generate-practice]")) {
      const generateButton = event.target.closest("[data-generate-practice]");
      if (generateButton.disabled) return;
      const skill = $("#ai-skill")?.value || "";
      const limit = Number($("#ai-limit")?.value || 3);
      const originalLabel = generateButton.innerHTML;
      generateButton.disabled = true;
      generateButton.setAttribute("aria-busy", "true");
      generateButton.textContent = "生成中...";
      try {
        const data = await load(skill ? `/api/questions?skill=${encodeURIComponent(skill)}&limit=100` : "/api/questions?limit=100", `practice-${skill || "all"}`);
        const questions = (data.items || []).sort(() => Math.random() - .5).slice(0, limit);
        if (!questions.length) return toast("这个知识点暂时没有可用题目", "warning");
        const payload = await api("/api/exams/start", { method: "POST", body: JSON.stringify({ week: store.week, mode: "practice", questionIds: questions.map((item) => item.id) }) });
        store.exam = payload; store.examAnswers = {}; store.sprintView = ""; store.route = "weekly"; location.hash = "weekly"; await renderRoute();
      } catch (error) { toast(error.message, "danger"); }
      finally {
        if (document.body.contains(generateButton)) {
          generateButton.disabled = false;
          generateButton.removeAttribute("aria-busy");
          generateButton.innerHTML = originalLabel;
        }
      }
      return;
    }
    if (event.target.closest("[data-export-report]")) { const blob = new Blob([JSON.stringify(store.report || {}, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "ai-study-report.json"; anchor.click(); URL.revokeObjectURL(url); return; }
    if (event.target.closest("[data-copy-report]")) { await navigator.clipboard?.writeText(JSON.stringify(store.report || {}, null, 2)); toast("报告 JSON 已复制", "success"); return; }
    if (event.target.closest("[data-close-modal]")) { if (event.target.classList.contains("modal-backdrop") || event.target.closest(".modal-head") || event.target.closest(".head-actions")) $("#modal-root").innerHTML = ""; }
  });

  document.addEventListener("change", async (event) => {
    if (event.target.id === "task-week" || event.target.id === "exam-week") { store.week = Number(event.target.value); store.cache = {}; await renderRoute(); }
    if (event.target.id === "question-type") { store.questionType = event.target.value; await renderRoute(); }
    if (event.target.matches("[data-answer-question]")) { const questionId = event.target.dataset.answerQuestion; const inputs = $$(`[data-answer-question="${CSS.escape(questionId)}"]`); const values = inputs.filter((input) => input.checked).map((input) => Number(input.value)); store.examAnswers[questionId] = event.target.type === "checkbox" ? values : values[0]; await renderRoute(); }
  });

  document.addEventListener("input", (event) => {
    if (event.target.id === "question-search") { store.questionFilter = event.target.value; window.clearTimeout(window.__questionTimer); window.__questionTimer = window.setTimeout(() => renderRoute(), 180); }
    if (event.target.matches("[data-open-answer]")) store.examAnswers[event.target.dataset.openAnswer] = event.target.value;
  });
  document.addEventListener("submit", async (event) => {
    if (event.target.id === "auth-form") await handleAuthSubmit(event);
    if (event.target.id === "note-form") await saveNote(event);
  });
  window.addEventListener("hashchange", async () => { store.route = location.hash.slice(1) || "overview"; await renderRoute(); });
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => { if (store.theme === "system") applyTheme(); });

  boot();
})();
