# 更新日志 (Changelog)

## [未发布] - 公积金比例自定义功能

### 新增功能 (Added)
- 五险一金计算器支持自定义公积金缴纳比例（7%-12%）
- 添加公积金缴纳比例输入字段
- 计算结果中显示实际使用的公积金比例

### 改进 (Improved)
- 增加公积金比例范围验证（7%-12%）
- 超出范围时自动使用默认比例12%
- 更新计算结果展示，显示具体的公积金比例

### 技术细节 (Technical Details)
- `utils/insuranceCalculator.js` - 添加 housingFundRate 参数支持
- 添加比例范围验证逻辑
- 结果对象中包含实际使用的公积金比例

### 测试 (Tests)
- 添加自定义比例测试用例
- 添加边界值测试（7%和12%）
- 添加超出范围时的默认值测试

## [已发布] - UI美化更新

### 新增功能 (Added)
- 五险一金计算器支持单独设置公积金缴纳基数
- 所有计算器按钮增加点击效果（缩放动画和阴影变化）
- 输入框增加焦点状态的视觉反馈
- 首页图标增加渐变背景和脉冲动画效果

### 改进 (Improved)
- 统一所有页面的输入框样式（边框、背景色、焦点效果）
- 统一所有页面的按钮样式（阴影、动画、交互效果）
- 优化所有卡片组件的阴影和圆角样式
- 改进首页图标显示，使用渐变色背景替代纯emoji
- 提升整体UI的现代感和一致性

### 技术细节 (Technical Details)
- 添加 CSS transition 动画，提升交互流畅度
- 使用渐变色和阴影增强视觉层次
- 优化输入框的焦点状态反馈
- 实现按钮的点击缩放效果
- 为图标添加无限循环的脉冲动画

### 文件变更 (Files Changed)
- `utils/insuranceCalculator.js` - 添加公积金基数参数支持
- `pages/insurance/insurance.*` - 添加公积金基数输入和处理
- `pages/calculator/calculator.wxss` - 美化按钮和输入框
- `pages/enterprise/enterprise.wxss` - 美化按钮和输入框
- `pages/loan/loan.wxss` - 美化按钮和输入框
- `pages/index/index.*` - 添加渐变动画图标
- `README.md` - 更新功能说明
