// pages/loan/loan.js
const loanCalculator = require('../../utils/loanCalculator.js');

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
  }
});
