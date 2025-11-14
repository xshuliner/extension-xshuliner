export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'config',
        'ci',
        'chore',
        'docs',
        'style',
        'perf',
        'test',
        'revert',
      ],
    ],
  },
  prompt: {
    settings: {},
    // messages: {
    //   skip: ':按回车跳过',
    //   max: '最多 %d 个字符',
    //   min: '最少 %d 个字符',
    //   emptyWarning: '不能为空',
    //   upperLimitWarning: '超过最大字符限制',
    //   lowerLimitWarning: '少于最小字符限制',
    // },
    questions: {
      type: {
        description: '选择你要提交的类型:',
        enum: {
          feat: {
            description: '新功能：添加新特性或功能模块',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '问题修复：修复 Bug 或错误',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          refactor: {
            description: '代码重构：不改变功能的代码优化和调整',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          config: {
            description: '构建配置：修改构建系统、外部依赖或项目配置',
            title: 'Build System',
            emoji: '🛠',
          },
          ci: {
            description: '持续集成：修改 CI/CD 配置文件和脚本',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: '其他调整：构建过程或辅助工具的变更，不涉及业务代码',
            title: 'Chores',
            emoji: '♻️',
          },
          docs: {
            description: '文档更新：修改项目文档或注释',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '代码格式：不影响代码逻辑的格式调整（空格、缩进等）',
            title: 'Styles',
            emoji: '💎',
          },
          test: {
            description: '测试用例：添加或修改测试代码',
            title: 'Tests',
            emoji: '🚨',
          },
          perf: {
            description: '性能优化：提升代码性能的改进',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          revert: {
            description: '版本回退：回退到之前的某个提交',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: '选择一个 scope (可选):',
      },
      subject: {
        description: '填写一个简短精炼的描述语句:',
      },
      body: {
        description:
          '添加一个更加详细的描述，可以附上新增功能的描述或bug链接、截图链接 (可选):',
      },
      isBreaking: {
        description: '是否有非兼容性重大变更?',
      },
      breakingBody: {
        description:
          '一个 BREAKING CHANGE 提交需要有正文。请输入对提交本身更详细的描述:',
      },
      breaking: {
        description: '列举非兼容性重大的变更:',
      },
      isIssueAffected: {
        description: '此变更是否影响任何未解决的问题?',
      },
      issuesBody: {
        description: '如果问题已解决，提交需要正文。请输入更长的描述以提交:',
      },
      issues: {
        description: '添加问题引用 (例如: "fix #123", "re #123".):',
      },
    },
  },
};
