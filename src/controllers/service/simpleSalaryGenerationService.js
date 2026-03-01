import SimpleGeneratedSalaryModel from "../../models/generated_simple_salary"

function getTypeFromArray(array, typeNeeded) {
  for (let item of array) {
    if (item.category.toLowerCase() === typeNeeded.toLowerCase()) {
      // check if obj is different
      return new Object(item);
    }
  }
  return null;
}

module.exports = {
  async calculateSalaryForMonthForOneFaculty(
    uniMonthlySalaryStructure,
    facultySalaryCustomization,
    req
  ) {
    // console.log("=== IN calculateSalaryForMonth");
    // console.log("uniMonthlySalaryStructure: ", uniMonthlySalaryStructure);
    // console.log("facultySalaryCustomization: ", facultySalaryCustomization);

    // add all earning
    let basicSalary = getTypeFromArray(
      facultySalaryCustomization.earnings,
      "basic"
    ).amount;
    // TODO: if null, error
    let totalEarning = 0;
    let earnings = new Map();

    for (let earning of uniMonthlySalaryStructure.earnings) {
      let currEarning = 0;
      // check if earning is percentage
      if (earning.isPercentage) {
        // multiply earning by salary
        currEarning = (earning.percentage * basicSalary) / 100;
      } else {
        currEarning = earning.amount;
      }

      totalEarning += currEarning;
      earning.calculated_amount = currEarning;

      if (earnings.has(earning.category)) {
        totalEarning -= earnings.get(earning.category).calculated_amount;
      }
      earnings.set(earning.category, earning);
    }

    for (let earning of facultySalaryCustomization.earnings) {
      let currEarning = 0;
      // check if earning is percentage
      if (earning.isPercentage) {
        // multiply earning by salary
        currEarning = (earning.percentage * basicSalary) / 100;
      } else {
        currEarning = earning.amount;
      }

      totalEarning += currEarning;
      earning.calculated_amount = currEarning;

      if (earnings.has(earning.category)) {
        totalEarning -= earnings.get(earning.category).calculated_amount;
      }
      earnings.set(earning.category, earning);
    }

    // add all deduction
    let totalDeduction = 0;
    let deductions = new Map();

    for (let deduction of uniMonthlySalaryStructure.deductions) {
      let currDeduction = 0;
      // check if earning is percentage
      if (deduction.isPercentage) {
        // multiply earning by salary
        currDeduction = (deduction.percentage * basicSalary) / 100;
      } else {
        currDeduction = deduction.amount;
      }

      totalDeduction += currDeduction;
      deduction.calculated_amount = currDeduction;

      if (deductions.has(deduction.category)) {
        totalDeduction -= deductions.set(deduction.category).calculated_amount;
      }
      deductions.set(deduction.category, deduction);
    }

    for (let deduction of facultySalaryCustomization.deductions) {
      let currDeduction = 0;
      // check if earning is percentage
      if (deduction.isPercentage) {
        // multiply earning by salary
        currDeduction = (deduction.percentage * basicSalary) / 100;
      } else {
        currDeduction = deduction.amount;
      }

      totalDeduction += currDeduction;
      deduction.calculated_amount = currDeduction;

      if (deductions.has(deduction.category)) {
        totalDeduction -= deductions.set(deduction.category).calculated_amount;
      }
      deductions.set(deduction.category, deduction);
    }

    // calculate net salary
    let netSalary = totalEarning - totalDeduction;

    // create salary object
    let salary = new SimpleGeneratedSalaryModel();
    salary.faculty_id = facultySalaryCustomization.faculty_id;
    salary.created_by = req.body.created_by;
    salary.month = uniMonthlySalaryStructure.month;
    salary.year = uniMonthlySalaryStructure.year;
    salary.total_earnings = totalEarning;
    salary.total_deductions = totalDeduction;
    salary.total_net = netSalary;
    salary.earnings = [...earnings.values()];
    salary.deductions = [...deductions.values()];

    // console.log("===\n======", salary);

    return await salary.save();
  }
};
