// pages/loan/loan.js
const loanCalculator = require('../../utils/loanCalculator.js');
const wxCharts = require('../../utils/wxcharts.js');

let loanPieChart = null;

Page({
  data: {
    principal: '',
    annualRate: '',
    years: '',
    loanType: 'equalPayment',
    result: null,
    showSchedule: false,
    scheduleLimit: 12
  },

  onLoad: function() {
    console.log('Loan calculator page loaded');
  },

  onPrincipalInput: function(e) {
    this.setData({
      principal: e.detail.value
    });
  },

  onAnnualRateInput: function(e) {
    this.setData({
      annualRate: e.detail.value
    });
  },

  onYearsInput: function(e) {
    this.setData({
      years: e.detail.value
    });
  },

  onLoanTypeChange: function(e) {
    this.setData({
      loanType: e.detail.value
    });
  },

  calculate: function() {
    const principal = parseFloat(this.data.principal);
    const annualRate = parseFloat(this.data.annualRate);
    const years = parseInt(this.data.years);

    if (!principal || principal <= 0) {
      wx.showToast({
        title: '请输入有效的贷款金额',
        icon: 'none'
      });
      return;
    }

    if (!annualRate || annualRate <= 0) {
      wx.showToast({
        title: '请输入有效的年利率',
        icon: 'none'
      });
      return;
    }

    if (!years || years <= 0) {
      wx.showToast({
        title: '请输入有效的贷款年限',
        icon: 'none'
      });
      return;
    }

    const months = years * 12;
    let result;

    if (this.data.loanType === 'equalPayment') {
      result = loanCalculator.calculateEqualPayment(principal, annualRate, months);
    } else {
      result = loanCalculator.calculateEqualPrincipal(principal, annualRate, months);
    }
    
    this.setData({
      result: result,
      showSchedule: false,
      scheduleLimit: 12
    }, () => {
      // Render chart after data is set
      this.renderChart();
    });
  },

  renderChart: function() {
    const result = this.data.result;
    if (!result) return;

    // Get system info for chart width
    const systemInfo = wx.getSystemInfoSync();
    const windowWidth = systemInfo.windowWidth;
    const chartWidth = windowWidth * 0.9; // 90% of screen width

    // Prepare chart data: principal vs interest
    const chartData = [
      { 
        name: '贷款本金', 
        data: result.principal, 
        color: '#597ef7' 
      },
      { 
        name: '总利息', 
        data: result.totalInterest, 
        color: '#ff7875' 
      }
    ];

    loanPieChart = new wxCharts({
      canvasId: 'loanPieCanvas',
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

  toggleSchedule: function() {
    this.setData({
      showSchedule: !this.data.showSchedule
    });
  },

  loadMoreSchedule: function() {
    this.setData({
      scheduleLimit: this.data.scheduleLimit + 12
    });
  },

  reset: function() {
    this.setData({
      principal: '',
      annualRate: '',
      years: '',
      result: null,
      showSchedule: false,
      scheduleLimit: 12
    });
    loanPieChart = null;
  }
});
