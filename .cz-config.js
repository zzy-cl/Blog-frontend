// 提交代码：使用 `npx cz`或者`git cz` 命令
// 相关配置：https://github.com/leoforfree/cz-customizable
module.exports = {
    types: [
        {
            value: "feat",
            name: "feat: 🚀 新增功能",
            emoji: "🚀"
        },
        {
            value: "fix",
            name: "fix: 🧩 修复缺陷",
            emoji: "🧩"
        },
        {
            value: "docs",
            name: "docs: 📚 文档变更",
            emoji: "📚"
        },
        {
            value: "style",
            name: "style: 🎨 代码格式（不影响功能，例如空格、分号等格式修正）",
            emoji: "🎨"
        },
        {
            value: "refactor",
            name: "refactor: ♻ 代码重构（不包括 bug 修复、功能新增）",
            emoji: "♻"
        },
        {
            value: "perf",
            name: "perf: ⚡ 性能优化",
            emoji: "⚡"
        },
        {
            value: "test",
            name: "test: ✅ 添加疏漏测试或已有测试改动",
            emoji: "✅"
        },
        {
            value: "build",
            name: "build: 📦️ 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）",
            emoji: "📦️"
        },
        {
            value: "ci",
            name: "ci: 🎡 修改 CI 配置、脚本",
            emoji: "🎡"
        },
        {
            value: "revert",
            name: "revert: ⏪ 回滚 commit",
            emoji: "⏪"
        },
        {
            value: "chore",
            name: "chore: 🔨 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）",
            emoji: "🔨"
        }
    ],
    messages: {
        type: '选择你要提交的类型 :（必填）',
        customScope: '请输入影响范围 :（可选）',
        subject: '填写简短精炼的变更描述 :（必填）',
        body: '填写更加详细的变更描述，使用 "|" 换行 :（可选）',
        breaking: '列举非兼容性重大的变更，使用 "|" 换行 :（可选）',
        footer: "列举关联issue (可选) 例如: #31, #I3244 :（可选）",
        confirmCommit: "是否提交或修改commit ?"
    },
    subjectLimit: 100,// subject文字长度默认
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['scope', 'footer'] //默认跳过
};
