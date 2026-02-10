// pages/insurance/insurance.js
const insuranceCalculator = require('../../utils/insuranceCalculator.js');

Page({
  data: {
    salary: '',
    result: null
  },

  onLoad: function() {
    console.log('Insurance calculator page loaded');
  },

  onSalaryInput: function(e) {
    this.setData({
      salary: e.detail.value
    });
  },

  calculate: function() {
    const salary = parseFloat(this.data.salary);

    if (!salary || salary <= 0) {
      wx.showToast({
        title: '请输入有效的工资',
        icon: 'none'
      });
      return;
    }

    const result = insuranceCalculator.calculateInsurance(salary);
    
    this.setData({
      result: result
    });
  },

  reset: function() {
    this.setData({
      salary: '',
      result: null
    });
  }
});
