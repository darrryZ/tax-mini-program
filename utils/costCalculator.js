/**
 * 企业总成本计算工具
 * Enterprise Total Cost Calculator
 * 
 * 计算企业雇佣员工的总成本
 */

const insuranceCalculator = require('./insuranceCalculator.js');

/**
 * 计算企业总成本
 * Calculate enterprise total cost for an employee
 * @param {number} salary - 员工税前工资
 * @param {number} employeeCount - 员工数量（默认1）
 * @param {object} rates - 五险一金缴费比例
 * @param {number} otherCosts - 其他成本（如办公设备、培训等）
 * @returns {object} 企业成本详细信息
 */
function calculateEnterpriseCost(salary, employeeCount = 1, rates = null, otherCosts = 0) {
  const insurance = insuranceCalculator.calculateInsurance(salary, rates);
  
  // 单个员工成本
  const costPerEmployee = {
    salary: parseFloat(salary.toFixed(2)),
    companyInsurance: insurance.companyTotal,
    subtotal: parseFloat((salary + insurance.companyTotal).toFixed(2))
  };
  
  // 总成本
  const totalCost = {
    employeeCount: employeeCount,
    totalSalary: parseFloat((salary * employeeCount).toFixed(2)),
    totalCompanyInsurance: parseFloat((insurance.companyTotal * employeeCount).toFixed(2)),
    otherCosts: parseFloat(otherCosts.toFixed(2)),
    subtotal: parseFloat(((salary + insurance.companyTotal) * employeeCount).toFixed(2)),
    grandTotal: parseFloat(((salary + insurance.companyTotal) * employeeCount + otherCosts).toFixed(2))
  };
  
  // 详细的五险一金成本
  const insuranceBreakdown = {
    pension: parseFloat((insurance.company.pension * employeeCount).toFixed(2)),
    medical: parseFloat((insurance.company.medical * employeeCount).toFixed(2)),
    unemployment: parseFloat((insurance.company.unemployment * employeeCount).toFixed(2)),
    injury: parseFloat((insurance.company.injury * employeeCount).toFixed(2)),
    maternity: parseFloat((insurance.company.maternity * employeeCount).toFixed(2)),
    housingFund: parseFloat((insurance.company.housingFund * employeeCount).toFixed(2))
  };
  
  return {
    costPerEmployee,
    totalCost,
    insuranceBreakdown
  };
}

/**
 * 计算月度和年度成本
 * Calculate monthly and annual costs
 * @param {number} monthlySalary - 月工资
 * @param {number} employeeCount - 员工数量
 * @param {object} rates - 五险一金缴费比例
 * @param {number} monthlyOtherCosts - 月度其他成本
 * @returns {object} 月度和年度成本
 */
function calculateMonthlyAndAnnualCost(monthlySalary, employeeCount = 1, rates = null, monthlyOtherCosts = 0) {
  const monthly = calculateEnterpriseCost(monthlySalary, employeeCount, rates, monthlyOtherCosts);
  
  const annual = {
    employeeCount: employeeCount,
    totalSalary: parseFloat((monthly.totalCost.totalSalary * 12).toFixed(2)),
    totalCompanyInsurance: parseFloat((monthly.totalCost.totalCompanyInsurance * 12).toFixed(2)),
    otherCosts: parseFloat((monthlyOtherCosts * 12).toFixed(2)),
    grandTotal: parseFloat((monthly.totalCost.grandTotal * 12).toFixed(2))
  };
  
  return {
    monthly: monthly.totalCost,
    annual: annual
  };
}

module.exports = {
  calculateEnterpriseCost,
  calculateMonthlyAndAnnualCost
};
