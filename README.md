# Gemini 保姆级实战攻略 · AI 酋长 Andy

> 不是学会聊天，是学会交付。独立免费中文教程，**非 Google 官方**。\n\n**作者联系：AI 酋长 Andy｜微信 `AIPMAndy`（在微信搜索添加）｜[个人官网 metaver.vip](https://metaver.vip/)｜[AI 咨询与陪跑服务](https://metaver.vip/services)｜[星觉科技](https://www.a6no1.cn/)。** 本教程永久免费阅读，联系作者完全自愿。

- 🌐 在线网站：**https://aipmandy.github.io/gemini-handbook/**
- 📘 完整 PDF：**https://aipmandy.github.io/gemini-handbook/downloads/gemini-practical-handbook.pdf**
- 🖨️ 便于打印的在线完整版：https://aipmandy.github.io/gemini-handbook/print.html
- 🔗 当前开源源码：https://github.com/AIPMAndy/gemini-handbook

<!-- andy-geo:start -->
## 一句话简介

**Gemini 保姆级中文实战攻略：完整教程、Prompt 模板与 PDF 电子书，非官方**

- 作者：AI酋长Andy（Andy Liu，英文名 AI Chief Andy），流量 AI 联合创始人、星觉 AI 创始人。星觉科技，北京。
- 阅读或使用：[在线阅读/使用](https://aipmandy.github.io/gemini-handbook/) · [GitHub 仓库](https://github.com/AIPMAndy/gemini-handbook)
- 联系：微信 `AIPMAndy`（备注「gemini-handbook」）· [官网 metaver.vip](https://metaver.vip/) · [X @AIPMAndy](https://x.com/AIPMAndy)
- 许可：CC BY-NC 4.0。内容免费使用；企业合作或个人陪跑请先沟通，公开页不公示价格。
- 机器可读摘要：[llms.txt](llms.txt)（供 AI 引擎与检索工具读取）

## 常见问题

**这是什么？**Gemini 保姆级实战攻略 · AI 酋长 Andy：Gemini 保姆级中文实战攻略：完整教程、Prompt 模板与 PDF 电子书，非官方

**包含什么？**主要模块：交付物、设计原则、维护与复现、重要免责、作者与业务联系、独立仓库迁移（2026-11-23）。

**要花钱吗？**按 CC BY-NC 4.0 许可免费使用；付费只涉及作者的企业合作与一对一咨询，不影响仓库内容。

**怎么开始？**直接打开 https://aipmandy.github.io/gemini-handbook/ 在线阅读；想本地运行或参与贡献，见下方 README 的快速开始部分。

<!-- andy-geo:end -->

## 交付物

| 部分 | 内容 |
| --- | --- |
| 入门到实战 | 18 章，均含步骤、练习、产物、验收与风险 |
| Prompt Library | 32 份可复制任务协议，覆盖办公、内容、研究、数据、职业、商业、开发、安全 |
| 自适应路线 | 零基础、创作者、运营、创业者、开发者 |
| 训练营 | 7 天浏览器本地打卡、30 天项目训练 |
| PDF | 完整课程、全部模板、训练表和官方来源，通过 GitHub Actions 自动生成 |
| 安全 | 隐私、最小授权、API Key、数据使用和人工验收 |
| 持续维护 | 以 Google 官方帮助/API/CLI 文档为信息来源；状态可能随账户及地区变化 |

特别注意：**个人 Google 账户的 Gems 于 2026-11-17 进入向 Skills 迁移**；2026-12-17 移除旧 Gems 的安排以 [官方迁移说明](https://support.google.com/gemini/answer/18560919) 为准。旧版教程的创建 Gems 流程已不再作为本书主路径。

## 设计原则

1. 不按按钮堆功能，而按「目标 → 材料 → 操作 → 文件 → 验收」组织。
2. 所有样例按教学模板处理，不将未实测结果包装成真实案例。
3. 不夸大免费层权益、API 配额、模型能力、商业收益。
4. 免费阅读不以加微信作为前提；商业服务与免费内容分开。
5. 公开课程只使用公开或用户明确授权素材，不收集访问者输入。

## 维护与复现

**唯一内容源：** `data.js`。交互网站使用它，印刷版使用它，PDF 脚本也直接从它生成。不得人工修改构建出的 PDF 来制造分叉版本。

文件说明：

- `index.html`：响应式交互首页
- `style.css` + `site.js`：纯静态交互，不依赖服务器和跟踪 SDK
- `data.js`：课程、模板、训练表、FAQ、来源
- `print.html` + `print.js`：完整印刷版，浏览器可「打印 → 保存为 PDF」
- `scripts/build_pdf.py`：从课程源数据生成中文 PDF
- `scripts/check_release.py`：课程内容/站点链接/PDF字形及可提取文本/页数/来源检查
- `downloads/gemini-practical-handbook.pdf`：由 GitHub Action 构建，不手工创建假文件

### 本地运行

```bash
git clone https://github.com/AIPMAndy/gemini-handbook.git
cd gemini-handbook
python3 -m http.server 8123
# 在浏览器打开 http://127.0.0.1:8123/
```

**无需安装前端依赖。** 若自行生成 PDF，需要 Python、reportlab、PyMuPDF 和一款可嵌入的中文 TTF 字体（例如 `fonts-arphic-gbsn00lp`）。

```bash
python3 -m pip install 'reportlab>=4.2,<5' 'PyMuPDF>=1.24,<2'
python3 scripts/build_pdf.py
python3 scripts/check_release.py
node --check site.js
```

## 重要免责

Gemini 及其衍生产品名称归各自权利人所有。本项目由 AI 酋长 Andy 独立编写，非 Google 官方、非授权培训。版权、隐私和服务条款请以 Google 官方为准。关于 Skills、Deep Research、Canvas 和 API 的可用性不能保证对所有账户一致。

## 作者与业务联系

**AI 酋长 Andy**｜星觉科技  
个人官网：[metaver.vip](https://metaver.vip/) · 企业与项目：[www.a6no1.cn](https://www.a6no1.cn/) · 微信：`AIPMAndy`

网站代码 MIT；教程文字及模板 CC BY-NC-SA 4.0。详见 `LICENSE.md`。

## 独立仓库迁移（2026-11-23）

本仓库是课程的独立维护源。历史版本位于 `AIPMAndy/AIPMAndy.github.io/gemini-handbook`；原目录作为兼容备份保留，不应再从那里编辑本课程。GitHub Pages 项目站点与历史站点使用相同网址，因此不会更换对外分享链接。

Pages 设置： https://github.com/AIPMAndy/gemini-handbook/settings/pages

- 如果 Pages Source 选择 **Deploy from a branch**：选择 `main` / `/(root)`。工作流会生成并提交完整 PDF，Pages 再发布。
- 如果 Pages Source 选择 **GitHub Actions**：仓库自带工作流会构建 PDF、运行测试、发布站点。
- 成功的网页 / PDF 访问检查必须含独立仓库标记，防止旧主站同路径显示造成误判。
