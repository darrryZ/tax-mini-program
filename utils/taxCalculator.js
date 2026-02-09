/**
 * 个人所得税计算工具
 * Personal Income Tax Calculator
 * 
 * Based on China's individual income tax law (2019 version)
 */

// 个税税率表 (Tax rate table for comprehensive income)
const TAX_BRACKETS = [
  { min: 0, max: 36000, rate: 0.03, deduction: 0 },
  { min: 36000, max: 144000, rate: 0.10, deduction: 2520 },
  { min: 144000, max: 300000, rate: 0.20, deduction: 16920 },
  { min: 300000, max: 420000, rate: 0.25, deduction: 31920 },
  { min: 420000, max: 660000, rate: 0.30, deduction: 52920 },
  { min: 660000, max: 960000, rate: 0.35, deduction: 85920 },
  { min: 960000, max: Infinity, rate: 0.45, deduction: 181920 }
];

// 基本减除费用 (Basic deduction - monthly)
const BASIC_DEDUCTION_MONTHLY = 5000;

/**
 * 计算月度个人所得税
 * Calculate monthly personal income tax
 * @param {number} salary - 月工资 (monthly salary)
 * @param {number} insurance - 五险一金 (social insurance and housing fund)
 * @param {number} specialDeduction - 专项附加扣除 (special additional deductions)
 * @returns {object} 税后收入及详细信息
 */
function calculateMonthlyTax(salary, insurance = 0, specialDeduction = 0) {
  // 应纳税所得额 = 工资 - 五险一金 - 起征点 - 专项附加扣除
  const taxableIncome = salary - insurance - BASIC_DEDUCTION_MONTHLY - specialDeduction;
  
  let tax = 0;
  let taxRate = 0;
  let quickDeduction = 0;
  
  if (taxableIncome <= 0) {
    tax = 0;
  } else {
    // 年度应纳税所得额
    const annualTaxable = taxableIncome * 12;
    
    // 查找适用税率
    for (let bracket of TAX_BRACKETS) {
      if (annualTaxable > bracket.min && annualTaxable <= bracket.max) {
        taxRate = bracket.rate;
        quickDeduction = bracket.deduction;
        break;
      }
    }
    
    // 计算年度税额，然后除以12得到月度税额
    const annualTax = annualTaxable * taxRate - quickDeduction;
    tax = annualTax / 12;
  }
  
  const afterTaxSalary = salary - insurance - tax;
  
  return {
    salary: parseFloat(salary.toFixed(2)),
    insurance: parseFloat(insurance.toFixed(2)),
    specialDeduction: parseFloat(specialDeduction.toFixed(2)),
    taxableIncome: parseFloat((taxableIncome * 12).toFixed(2)), // 年度应纳税所得额
    taxRate: (taxRate * 100).toFixed(0) + '%',
    tax: parseFloat(tax.toFixed(2)),
    afterTaxSalary: parseFloat(afterTaxSalary.toFixed(2))
  };
}

/**
 * 计算年度个人所得税
 * Calculate annual personal income tax
 * @param {number} annualSalary - 年收入
 * @param {number} annualInsurance - 年度五险一金
 * @param {number} annualSpecialDeduction - 年度专项附加扣除
 * @returns {object} 税后收入及详细信息
 */
function calculateAnnualTax(annualSalary, annualInsurance = 0, annualSpecialDeduction = 0) {
  const basicDeduction = BASIC_DEDUCTION_MONTHLY * 12;
  const taxableIncome = annualSalary - annualInsurance - basicDeduction - annualSpecialDeduction;
  
  let tax = 0;
  let taxRate = 0;
  let quickDeduction = 0;
  
  if (taxableIncome <= 0) {
    tax = 0;
  } else {
    for (let bracket of TAX_BRACKETS) {
      if (taxableIncome > bracket.min && taxableIncome <= bracket.max) {
        taxRate = bracket.rate;
        quickDeduction = bracket.deduction;
        break;
      }
    }
    
    tax = taxableIncome * taxRate - quickDeduction;
  }
  
  const afterTaxSalary = annualSalary - annualInsurance - tax;
  
  return {
    annualSalary: parseFloat(annualSalary.toFixed(2)),
    annualInsurance: parseFloat(annualInsurance.toFixed(2)),
    annualSpecialDeduction: parseFloat(annualSpecialDeduction.toFixed(2)),
    taxableIncome: parseFloat(taxableIncome.toFixed(2)),
    taxRate: (taxRate * 100).toFixed(0) + '%',
    tax: parseFloat(tax.toFixed(2)),
    afterTaxSalary: parseFloat(afterTaxSalary.toFixed(2))
  };
}

module.exports = {
  calculateMonthlyTax,
  calculateAnnualTax,
  BASIC_DEDUCTION_MONTHLY,
  TAX_BRACKETS
};
