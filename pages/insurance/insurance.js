// pages/insurance/insurance.js
const insuranceCalculator = require('../../utils/insuranceCalculator.js');

Page({
  data: {
    salary: '',
    housingFundBase: '',
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

  onHousingFundBaseInput: function(e) {
    this.setData({
      housingFundBase: e.detail.value
    });
  },

  calculate: function() {
    const salary = parseFloat(this.data.salary);
    const housingFundBase = this.data.housingFundBase ? parseFloat(this.data.housingFundBase) : null;

    if (!salary || salary <= 0) {
      wx.showToast({
        title: '请输入有效的工资',
        icon: 'none'
      });
      return;
    }

    if (housingFundBase !== null && housingFundBase <= 0) {
      wx.showToast({
        title: '公积金基数必须大于0',
        icon: 'none'
      });
      return;
    }

    const result = insuranceCalculator.calculateInsurance(salary, housingFundBase);
    
    this.setData({
      result: result
    });
  },

  reset: function() {
    this.setData({
      salary: '',
      housingFundBase: '',
      result: null
    });
  }
});
