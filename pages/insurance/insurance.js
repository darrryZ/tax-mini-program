// pages/insurance/insurance.js
const insuranceCalculator = require('../../utils/insuranceCalculator.js');
const wxCharts = require('../../utils/wxcharts.js');

let personalPieChart = null;
let companyPieChart = null;

Page({
  data: {
    salary: '',
    housingFundBase: '',
    housingFundRate: '',
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

  onHousingFundRateInput: function(e) {
    this.setData({
      housingFundRate: e.detail.value
    });
  },

  calculate: function() {
    const salary = parseFloat(this.data.salary);
    const housingFundBase = this.data.housingFundBase ? parseFloat(this.data.housingFundBase) : null;
    const housingFundRate = this.data.housingFundRate ? parseFloat(this.data.housingFundRate) : null;

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

    if (housingFundRate !== null && (housingFundRate < 7 || housingFundRate > 12)) {
      wx.showToast({
        title: '公积金比例须在7%-12%之间',
        icon: 'none'
      });
      return;
    }

    const result = insuranceCalculator.calculateInsurance(salary, housingFundBase, null, housingFundRate);
    
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

    // Personal insurance breakdown
    const personalData = [
      { name: '养老保险', data: result.personal.pension, color: '#597ef7' },
      { name: '医疗保险', data: result.personal.medical, color: '#73d13d' },
      { name: '失业保险', data: result.personal.unemployment, color: '#ff9c6e' },
      { name: '住房公积金', data: result.personal.housingFund, color: '#ffc53d' }
    ].filter(item => item.data > 0);

    personalPieChart = new wxCharts({
      canvasId: 'personalPieCanvas',
      type: 'pie',
      series: personalData,
      width: chartWidth,
      height: 300,
      dataLabel: true,
      legend: true,
      animation: true,
      background: '#ffffff',
      padding: 5
    });

    // Company insurance breakdown
    const companyData = [
      { name: '养老保险', data: result.company.pension, color: '#597ef7' },
      { name: '医疗保险', data: result.company.medical, color: '#73d13d' },
      { name: '失业保险', data: result.company.unemployment, color: '#ff9c6e' },
      { name: '工伤保险', data: result.company.injury, color: '#ff85c0' },
      { name: '生育保险', data: result.company.maternity, color: '#9254de' },
      { name: '住房公积金', data: result.company.housingFund, color: '#ffc53d' }
    ].filter(item => item.data > 0);

    companyPieChart = new wxCharts({
      canvasId: 'companyPieCanvas',
      type: 'pie',
      series: companyData,
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
      housingFundBase: '',
      housingFundRate: '',
      result: null
    });
    personalPieChart = null;
    companyPieChart = null;
  }
});
