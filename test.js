/**
 * Test Suite for Tax Mini Program Calculators
 * Run with: node test.js
 */

const taxCalculator = require('./utils/taxCalculator.js');
const insuranceCalculator = require('./utils/insuranceCalculator.js');
const costCalculator = require('./utils/costCalculator.js');
const loanCalculator = require('./utils/loanCalculator.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log('✓', message);
    passed++;
  } else {
    console.log('✗', message);
    failed++;
  }
}

function assertEquals(actual, expected, message) {
  if (Math.abs(actual - expected) < 0.01) {
    console.log('✓', message);
    passed++;
  } else {
    console.log('✗', message, `(expected ${expected}, got ${actual})`);
    failed++;
  }
}

console.log('\n=== Tax Calculator Tests ===\n');

// Test 1: Monthly tax calculation
const taxResult1 = taxCalculator.calculateMonthlyTax(10000, 2250, 1000);
assertEquals(taxResult1.salary, 10000, 'Monthly tax: salary is correct');
assertEquals(taxResult1.tax, 52.5, 'Monthly tax: tax amount is correct');
assertEquals(taxResult1.afterTaxSalary, 7697.5, 'Monthly tax: after-tax salary is correct');

// Test 2: Annual tax calculation
const taxResult2 = taxCalculator.calculateAnnualTax(120000, 27000, 12000);
assertEquals(taxResult2.annualSalary, 120000, 'Annual tax: salary is correct');
assertEquals(taxResult2.tax, 630, 'Annual tax: tax amount is correct');

console.log('\n=== Insurance Calculator Tests ===\n');

// Test 3: Insurance calculation
const insuranceResult = insuranceCalculator.calculateInsurance(10000);
assertEquals(insuranceResult.personalTotal, 2250, 'Insurance: personal total is correct');
assertEquals(insuranceResult.companyTotal, 3980, 'Insurance: company total is correct');
assertEquals(insuranceResult.total, 6230, 'Insurance: grand total is correct');
assertEquals(insuranceResult.personal.pension, 800, 'Insurance: personal pension is correct');
assertEquals(insuranceResult.company.housingFund, 1200, 'Insurance: company housing fund is correct');

console.log('\n=== Cost Calculator Tests ===\n');

// Test 4: Enterprise cost calculation
const costResult = costCalculator.calculateEnterpriseCost(10000, 5, null, 1000);
assertEquals(costResult.totalCost.totalSalary, 50000, 'Cost: total salary is correct');
assertEquals(costResult.totalCost.totalCompanyInsurance, 19900, 'Cost: company insurance is correct');
assertEquals(costResult.totalCost.grandTotal, 70900, 'Cost: grand total is correct');

// Test 5: Monthly and annual cost calculation
const costResult2 = costCalculator.calculateMonthlyAndAnnualCost(10000, 2);
assertEquals(costResult2.monthly.totalSalary, 20000, 'Cost: monthly total salary is correct');
assertEquals(costResult2.annual.totalSalary, 240000, 'Cost: annual total salary is correct');

console.log('\n=== Loan Calculator Tests ===\n');

// Test 6: Equal payment loan
const loanResult1 = loanCalculator.calculateEqualPayment(1000000, 4.9, 360);
assertEquals(loanResult1.principal, 1000000, 'Loan: principal is correct');
assertEquals(loanResult1.monthlyPayment, 5307.27, 'Loan equal payment: monthly payment is correct');
assertEquals(loanResult1.totalInterest, 910616.19, 'Loan equal payment: total interest is correct');
assert(loanResult1.schedule.length === 360, 'Loan: schedule has 360 months');

// Test 7: Equal principal loan
const loanResult2 = loanCalculator.calculateEqualPrincipal(1000000, 4.9, 360);
assertEquals(loanResult2.principal, 1000000, 'Loan: principal is correct');
assertEquals(loanResult2.firstMonthPayment, 6861.11, 'Loan equal principal: first month payment is correct');
assert(loanResult2.schedule.length === 360, 'Loan: schedule has 360 months');

// Test 8: Compare methods
const comparison = loanCalculator.compareMethods(1000000, 4.9, 360);
assert(comparison.equalPayment.totalInterest > 0, 'Comparison: equal payment has interest');
assert(comparison.equalPrincipal.totalInterest > 0, 'Comparison: equal principal has interest');
assert(comparison.interestDifference < 0, 'Comparison: equal principal has less interest');

console.log('\n=== Edge Cases Tests ===\n');

// Test 9: Zero special deduction
const taxResult3 = taxCalculator.calculateMonthlyTax(5000, 0, 0);
assertEquals(taxResult3.tax, 0, 'Edge case: no tax for salary at threshold');

// Test 10: High salary
const taxResult4 = taxCalculator.calculateMonthlyTax(100000, 10000, 0);
assert(taxResult4.tax > 0, 'Edge case: high salary has tax');
assert(taxResult4.afterTaxSalary < 90000, 'Edge case: high salary after-tax is less than 90000');

console.log('\n=== Test Summary ===\n');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed === 0) {
  console.log('\n✓ All tests passed!\n');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed!\n');
  process.exit(1);
}
