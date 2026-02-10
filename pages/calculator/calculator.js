// pages/calculator/calculator.js
const taxCalculator = require('../../utils/taxCalculator.js');
const insuranceCalculator = require('../../utils/insuranceCalculator.js');
const wxCharts = require('../../utils/wxcharts.js');

let pieChart = null;

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
    }, () => {
      // Render chart after data is set
      this.renderChart();
    });
  },

  renderChart: function() {
    const result = this.data.result;
    if (!result) return;

    const salary = result.salary || result.annualSalary;
    const insurance = result.insurance || result.annualInsurance;
    const tax = result.tax;
    const afterTaxSalary = result.afterTaxSalary;
    const specialDeduction = result.specialDeduction || result.annualSpecialDeduction;

    // Get system info for chart width
    const systemInfo = wx.getSystemInfoSync();
    const windowWidth = systemInfo.windowWidth;
    const chartWidth = windowWidth * 0.9; // 90% of screen width

    // Prepare chart data
    const chartData = [];
    if (insurance > 0) {
      chartData.push({
        name: '五险一金',
        data: insurance,
        color: '#91d5ff'
      });
    }
    if (specialDeduction > 0) {
      chartData.push({
        name: '专项扣除',
        data: specialDeduction,
        color: '#b37feb'
      });
    }
    if (tax > 0) {
      chartData.push({
        name: '个人所得税',
        data: tax,
        color: '#ff7875'
      });
    }
    chartData.push({
      name: '税后收入',
      data: afterTaxSalary,
      color: '#95de64'
    });

    // Create pie chart
    pieChart = new wxCharts({
      canvasId: 'taxPieCanvas',
      type: 'pie',
      series: chartData,
      width: chartWidth,
      height: 300,
      dataLabel: true,
      legend: true,
      animation: true,
      background: '#ffffff',
      padding: 5
    });
  },

  reset: function() {
    this.setData({
      salary: '',
      specialDeduction: '',
      result: null
    });
    pieChart = null;
  }
});
