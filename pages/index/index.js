// pages/index/index.js
Page({
  data: {
    calculators: [
      {
        id: 'tax',
        name: '个税计算器',
        icon: '💰',
        iconClass: 'icon-tax',
        description: '计算个人所得税',
        url: '/pages/calculator/calculator'
      },
      {
        id: 'insurance',
        name: '五险一金',
        icon: '🏥',
        iconClass: 'icon-insurance',
        description: '计算五险一金缴纳',
        url: '/pages/insurance/insurance'
      },
      {
        id: 'enterprise',
        name: '企业成本',
        icon: '🏢',
        iconClass: 'icon-enterprise',
        description: '计算企业用工成本',
        url: '/pages/enterprise/enterprise'
      },
      {
        id: 'loan',
        name: '贷款计算器',
        icon: '🏠',
        iconClass: 'icon-loan',
        description: '计算贷款还款',
        url: '/pages/loan/loan'
      }
    ]
  },

  onLoad: function() {
    console.log('Index page loaded');
  },

  navigateToCalculator: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  }
});
