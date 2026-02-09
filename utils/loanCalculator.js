/**
 * 贷款计算器工具
 * Loan Calculator
 * 
 * 支持等额本息和等额本金两种还款方式
 */

/**
 * 计算等额本息还款
 * Calculate equal principal and interest repayment
 * @param {number} principal - 贷款本金
 * @param {number} annualRate - 年利率（如5.5表示5.5%）
 * @param {number} months - 贷款期限（月）
 * @returns {object} 还款详细信息
 */
function calculateEqualPayment(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  
  // 月还款额 = [贷款本金 × 月利率 × (1+月利率)^还款月数] ÷ [(1+月利率)^还款月数 - 1]
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                         (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;
  
  // 计算每月详细信息
  const schedule = [];
  let remainingPrincipal = principal;
  
  for (let month = 1; month <= months; month++) {
    const interestPayment = remainingPrincipal * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingPrincipal -= principalPayment;
    
    schedule.push({
      month: month,
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      principalPayment: parseFloat(principalPayment.toFixed(2)),
      interestPayment: parseFloat(interestPayment.toFixed(2)),
      remainingPrincipal: parseFloat(Math.max(0, remainingPrincipal).toFixed(2))
    });
  }
  
  return {
    type: '等额本息',
    principal: parseFloat(principal.toFixed(2)),
    annualRate: annualRate + '%',
    months: months,
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    schedule: schedule
  };
}

/**
 * 计算等额本金还款
 * Calculate equal principal repayment
 * @param {number} principal - 贷款本金
 * @param {number} annualRate - 年利率（如5.5表示5.5%）
 * @param {number} months - 贷款期限（月）
 * @returns {object} 还款详细信息
 */
function calculateEqualPrincipal(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPrincipal = principal / months;
  
  const schedule = [];
  let remainingPrincipal = principal;
  let totalPayment = 0;
  
  for (let month = 1; month <= months; month++) {
    const interestPayment = remainingPrincipal * monthlyRate;
    const monthlyPayment = monthlyPrincipal + interestPayment;
    totalPayment += monthlyPayment;
    remainingPrincipal -= monthlyPrincipal;
    
    schedule.push({
      month: month,
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      principalPayment: parseFloat(monthlyPrincipal.toFixed(2)),
      interestPayment: parseFloat(interestPayment.toFixed(2)),
      remainingPrincipal: parseFloat(Math.max(0, remainingPrincipal).toFixed(2))
    });
  }
  
  const totalInterest = totalPayment - principal;
  const firstMonthPayment = schedule[0].monthlyPayment;
  const lastMonthPayment = schedule[schedule.length - 1].monthlyPayment;
  
  return {
    type: '等额本金',
    principal: parseFloat(principal.toFixed(2)),
    annualRate: annualRate + '%',
    months: months,
    firstMonthPayment: parseFloat(firstMonthPayment.toFixed(2)),
    lastMonthPayment: parseFloat(lastMonthPayment.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    schedule: schedule
  };
}

/**
 * 比较两种还款方式
 * Compare two repayment methods
 * @param {number} principal - 贷款本金
 * @param {number} annualRate - 年利率
 * @param {number} months - 贷款期限（月）
 * @returns {object} 两种方式的比较
 */
function compareMethods(principal, annualRate, months) {
  const equalPayment = calculateEqualPayment(principal, annualRate, months);
  const equalPrincipal = calculateEqualPrincipal(principal, annualRate, months);
  
  return {
    equalPayment: {
      type: equalPayment.type,
      monthlyPayment: equalPayment.monthlyPayment,
      totalInterest: equalPayment.totalInterest,
      totalPayment: equalPayment.totalPayment
    },
    equalPrincipal: {
      type: equalPrincipal.type,
      firstMonthPayment: equalPrincipal.firstMonthPayment,
      lastMonthPayment: equalPrincipal.lastMonthPayment,
      totalInterest: equalPrincipal.totalInterest,
      totalPayment: equalPrincipal.totalPayment
    },
    interestDifference: parseFloat((equalPayment.totalInterest - equalPrincipal.totalInterest).toFixed(2))
  };
}

module.exports = {
  calculateEqualPayment,
  calculateEqualPrincipal,
  compareMethods
};
