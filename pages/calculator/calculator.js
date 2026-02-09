// pages/calculator/calculator.js
const taxCalculator = require('../../utils/taxCalculator.js');
const insuranceCalculator = require('../../utils/insuranceCalculator.js');

Page({
  data: {
    salary: '',
    specialDeduction: '',
    calculationType: 'monthly',
    result: null
  },

  onLoad: function() {
    console.log('Tax calculator page loaded');
  },

  onSalaryInput: function(e) {
    this.setData({
      salary: e.detail.value
    });
  },

  onSpecialDeductionInput: function(e) {
    this.setData({
      specialDeduction: e.detail.value
    });
  },

  onCalculationTypeChange: function(e) {
    this.setData({
      calculationType: e.detail.value
    });
  },

  calculate: function() {
    const salary = parseFloat(this.data.salary);
    const specialDeduction = parseFloat(this.data.specialDeduction) || 0;

    if (!salary || salary <= 0) {
      wx.showToast({
        title: '请输入有效的工资',
        icon: 'none'
      });
      return;
    }

    // 计算五险一金
    const insurance = insuranceCalculator.calculateInsurance(salary);
    
    let result;
    if (this.data.calculationType === 'monthly') {
      result = taxCalculator.calculateMonthlyTax(salary, insurance.personalTotal, specialDeduction);
      result.type = '月度';
    } else {
      const annualSalary = salary * 12;
      const annualInsurance = insurance.personalTotal * 12;
      const annualSpecialDeduction = specialDeduction * 12;
      result = taxCalculator.calculateAnnualTax(annualSalary, annualInsurance, annualSpecialDeduction);
      result.type = '年度';
    }

    this.setData({
      result: result
    });
  },

  reset: function() {
    this.setData({
      salary: '',
      specialDeduction: '',
      result: null
    });
  }
});
