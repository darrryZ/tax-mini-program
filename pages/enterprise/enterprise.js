// pages/enterprise/enterprise.js
const costCalculator = require('../../utils/costCalculator.js');

Page({
  data: {
    salary: '',
    employeeCount: '1',
    otherCosts: '',
    result: null
  },

  onLoad: function() {
    console.log('Enterprise cost calculator page loaded');
  },

  onSalaryInput: function(e) {
    this.setData({
      salary: e.detail.value
    });
  },

  onEmployeeCountInput: function(e) {
    this.setData({
      employeeCount: e.detail.value
    });
  },

  onOtherCostsInput: function(e) {
    this.setData({
      otherCosts: e.detail.value
    });
  },

  calculate: function() {
    const salary = parseFloat(this.data.salary);
    const employeeCount = parseInt(this.data.employeeCount) || 1;
    const otherCosts = parseFloat(this.data.otherCosts) || 0;

    if (!salary || salary <= 0) {
      wx.showToast({
        title: '请输入有效的工资',
        icon: 'none'
      });
      return;
    }

    if (employeeCount <= 0) {
      wx.showToast({
        title: '请输入有效的员工数量',
        icon: 'none'
      });
      return;
    }

    const result = costCalculator.calculateMonthlyAndAnnualCost(salary, employeeCount, null, otherCosts);
    
    this.setData({
      result: result
    });
  },

  reset: function() {
    this.setData({
      salary: '',
      employeeCount: '1',
      otherCosts: '',
      result: null
    });
  }
});
