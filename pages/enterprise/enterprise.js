// pages/enterprise/enterprise.js
const costCalculator = require('../../utils/costCalculator.js');
const wxCharts = require('../../utils/wxcharts.js');

let monthlyCostChart = null;
let annualCostChart = null;

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
    }, () => {
      // Render charts after data is set
      this.renderCharts();
    });
  },

  renderCharts: function() {
    const result = this.data.result;
    if (!result) return;

    // Get system info for chart width
    const systemInfo = wx.getSystemInfoSync();
    const windowWidth = systemInfo.windowWidth;
    const chartWidth = windowWidth * 0.9; // 90% of screen width

    // Monthly cost breakdown
    const monthlyData = [];
    if (result.monthly.totalSalary > 0) {
      monthlyData.push({ 
        name: '工资总额', 
        data: result.monthly.totalSalary, 
        color: '#597ef7' 
      });
    }
    if (result.monthly.totalCompanyInsurance > 0) {
      monthlyData.push({ 
        name: '五险一金', 
        data: result.monthly.totalCompanyInsurance, 
        color: '#73d13d' 
      });
    }
    if (result.monthly.otherCosts > 0) {
      monthlyData.push({ 
        name: '其他成本', 
        data: result.monthly.otherCosts, 
        color: '#ff9c6e' 
      });
    }

    monthlyCostChart = new wxCharts({
      canvasId: 'monthlyCostCanvas',
      type: 'pie',
      series: monthlyData,
      width: chartWidth,
      height: 300,
      dataLabel: true,
      legend: true,
      animation: true,
      background: '#ffffff',
      padding: 5
    });

    // Annual cost breakdown
    const annualData = [];
    if (result.annual.totalSalary > 0) {
      annualData.push({ 
        name: '工资总额', 
        data: result.annual.totalSalary, 
        color: '#597ef7' 
      });
    }
    if (result.annual.totalCompanyInsurance > 0) {
      annualData.push({ 
        name: '五险一金', 
        data: result.annual.totalCompanyInsurance, 
        color: '#73d13d' 
      });
    }
    if (result.annual.otherCosts > 0) {
      annualData.push({ 
        name: '其他成本', 
        data: result.annual.otherCosts, 
        color: '#ff9c6e' 
      });
    }

    annualCostChart = new wxCharts({
      canvasId: 'annualCostCanvas',
      type: 'pie',
      series: annualData,
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
      employeeCount: '1',
      otherCosts: '',
      result: null
    });
    monthlyCostChart = null;
    annualCostChart = null;
  }
});
