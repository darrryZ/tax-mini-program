/**
 * 五险一金计算工具
 * Five Social Insurance and One Housing Fund Calculator
 * 
 * 五险一金包括：
 * - 养老保险 (Pension Insurance)
 * - 医疗保险 (Medical Insurance)
 * - 失业保险 (Unemployment Insurance)
 * - 工伤保险 (Work-related Injury Insurance)
 * - 生育保险 (Maternity Insurance)
 * - 住房公积金 (Housing Fund)
 */

// 默认缴费比例 (Default contribution rates)
const DEFAULT_RATES = {
  pension: {
    personal: 0.08,    // 个人缴纳8%
    company: 0.16      // 单位缴纳16%
  },
  medical: {
    personal: 0.02,    // 个人缴纳2%
    company: 0.10      // 单位缴纳10%
  },
  unemployment: {
    personal: 0.005,   // 个人缴纳0.5%
    company: 0.005     // 单位缴纳0.5%
  },
  injury: {
    personal: 0,       // 个人不缴纳
    company: 0.005     // 单位缴纳0.5%
  },
  maternity: {
    personal: 0,       // 个人不缴纳
    company: 0.008     // 单位缴纳0.8%
  },
  housingFund: {
    personal: 0.12,    // 个人缴纳12%
    company: 0.12      // 单位缴纳12%
  }
};

/**
 * 计算五险一金
 * Calculate social insurance and housing fund
 * @param {number} salary - 工资基数
 * @param {object} rates - 自定义缴费比例（可选）
 * @returns {object} 五险一金详细信息
 */
function calculateInsurance(salary, rates) {
  // Use default rates if rates is not provided or is null
  if (!rates) {
    rates = DEFAULT_RATES;
  }
  
  const result = {
    salary: parseFloat(salary.toFixed(2)),
    personal: {},
    company: {},
    personalTotal: 0,
    companyTotal: 0,
    total: 0
  };
  
  // 养老保险
  result.personal.pension = parseFloat((salary * rates.pension.personal).toFixed(2));
  result.company.pension = parseFloat((salary * rates.pension.company).toFixed(2));
  
  // 医疗保险
  result.personal.medical = parseFloat((salary * rates.medical.personal).toFixed(2));
  result.company.medical = parseFloat((salary * rates.medical.company).toFixed(2));
  
  // 失业保险
  result.personal.unemployment = parseFloat((salary * rates.unemployment.personal).toFixed(2));
  result.company.unemployment = parseFloat((salary * rates.unemployment.company).toFixed(2));
  
  // 工伤保险
  result.personal.injury = parseFloat((salary * rates.injury.personal).toFixed(2));
  result.company.injury = parseFloat((salary * rates.injury.company).toFixed(2));
  
  // 生育保险
  result.personal.maternity = parseFloat((salary * rates.maternity.personal).toFixed(2));
  result.company.maternity = parseFloat((salary * rates.maternity.company).toFixed(2));
  
  // 住房公积金
  result.personal.housingFund = parseFloat((salary * rates.housingFund.personal).toFixed(2));
  result.company.housingFund = parseFloat((salary * rates.housingFund.company).toFixed(2));
  
  // 计算总计
  result.personalTotal = parseFloat((
    result.personal.pension +
    result.personal.medical +
    result.personal.unemployment +
    result.personal.injury +
    result.personal.maternity +
    result.personal.housingFund
  ).toFixed(2));
  
  result.companyTotal = parseFloat((
    result.company.pension +
    result.company.medical +
    result.company.unemployment +
    result.company.injury +
    result.company.maternity +
    result.company.housingFund
  ).toFixed(2));
  
  result.total = parseFloat((result.personalTotal + result.companyTotal).toFixed(2));
  
  return result;
}

/**
 * 获取实际到手工资
 * @param {number} salary - 税前工资
 * @param {object} rates - 缴费比例
 * @returns {number} 扣除五险一金后的工资
 */
function getNetSalaryAfterInsurance(salary, rates) {
  const insurance = calculateInsurance(salary, rates);
  return parseFloat((salary - insurance.personalTotal).toFixed(2));
}

module.exports = {
  calculateInsurance,
  getNetSalaryAfterInsurance,
  DEFAULT_RATES
};
