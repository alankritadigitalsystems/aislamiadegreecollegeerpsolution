import FacultyModel from "../../models/faculty"

const LABEL_TEACHING = "teaching";
const LABEL_NONE = "none";
const LABEL_NON_TEACHING = "non_teaching";
const GENDER_FEMALE = "female";
const GENDER_MALE = "male";

const leaveCategories = {
  cl: {
    yearly_addition: {
      teaching: 8,
      non_teaching: 14,
    },
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: LABEL_NONE,
    },
    total_leave_used_cap: -1,
    total_application_count_cap: -1,
    single_application_leave_cap: 1,
    accumulation_limit: -1,
    is_proof_needed: false,
  },
  pl: {
    yearly_addition: {
      teaching: 10,
    },
    applicability: {
      staff_category: LABEL_TEACHING,
      gender_restriction: LABEL_NONE,
    },
    total_leave_used_cap: -1,
    total_application_count_cap: -1,
    single_application_leave_cap: -1,
    accumulation_limit: 60,
    is_proof_needed: false,
  },
  el: {
    yearly_addition: {
      non_teaching: 31,
    },
    applicability: {
      staff_category: LABEL_NON_TEACHING,
      gender_restriction: LABEL_NONE,
    },
    total_leave_used_cap: -1,
    total_application_count_cap: -1,
    single_application_leave_cap: -1,
    accumulation_limit: 300,
    is_proof_needed: false,
  },
  sl: {
    yearly_addition: {},
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: LABEL_NONE,
    },
    total_leave_used_cap: 365,
    total_application_count_cap: -1,
    single_application_leave_cap: -1,
    accumulation_limit: -1,
    is_proof_needed: false,
  },
  mtl: {
    yearly_addition: {},
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: GENDER_FEMALE,
    },
    total_leave_used_cap: 360,
    total_application_count_cap: 2,
    single_application_leave_cap: 180,
    accumulation_limit: -1,
    is_proof_needed: true,
  },
  ptl: {
    yearly_addition: {},
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: GENDER_MALE,
    },
    total_leave_used_cap: 20,
    total_application_count_cap: 2,
    single_application_leave_cap: 10,
    accumulation_limit: -1,
    is_proof_needed: true,
  },
  lwp: {
    yearly_addition: {},
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: LABEL_NONE,
    },
    total_leave_used_cap: -1,
    total_application_count_cap: -1,
    single_application_leave_cap: 1095,
    accumulation_limit: -1,
    is_proof_needed: false,
  },
  chcl: {
    yearly_addition: {},
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: GENDER_FEMALE,
    },
    total_leave_used_cap: 730,
    total_application_count_cap: -1,
    single_application_leave_cap: -1,
    accumulation_limit: -1,
    is_proof_needed: true,
  },
  ccl: {
    yearly_addition: {},
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: LABEL_NONE,
    },
    total_leave_used_cap: -1,
    total_application_count_cap: -1,
    single_application_leave_cap: -1,
    accumulation_limit: -1,
    is_proof_needed: false,
  },
  dl: {
    yearly_addition: {},
    applicability: {
      staff_category: LABEL_NONE,
      gender_restriction: LABEL_NONE,
    },
    total_leave_used_cap: -1,
    total_application_count_cap: -1,
    single_application_leave_cap: -1,
    accumulation_limit: -1,
    is_proof_needed: false,
  },
};

import UniMonthlySalaryStructureModel from "../../models/uni_monthly_salary_structure";
import FacultySalaryCustomizationModel from "../../models/faculty_salary_customization";
import SalaryModel from "../../models/salary"

function getTypeFromArray(array, typeNeeded) {
  for (let item of array) {
    if (item.category.toLowerCase() === typeNeeded.toLowerCase()) {
      // check if obj is different
      return new Object(item);
    }
  }
  return null;
}

function getCategory(facultySalaryCustomization, categoryName) {
  var category = getTypeFromArray(facultySalaryCustomization.earnings, categoryName);
  if (category != null) 
    return category;
  
  category = getTypeFromArray(facultySalaryCustomization.deductions, categoryName);
  if (category != null)
    return category;

  return getTypeFromArray(facultySalaryCustomization.employer_contribution, categoryName);
}

// funqtion initializeArrayIfUndefined(salary, categoryName) {
// if this doesnt get added, check if it is due to const/var
function addCategoryToList(type, existingCategoryObj, facultySalaryCustomization) {
  var listToBeAddedTo;
  if (type === "earnings") {
    listToBeAddedTo = facultySalaryCustomization.earnings;
  }
  else if (type === "deductions") {
    listToBeAddedTo = facultySalaryCustomization.deductions;
  }
  else if (type === "employer_contribution") {
    listToBeAddedTo = facultySalaryCustomization.employer_contribution;
  }

  if (listToBeAddedTo == undefined) {
    listToBeAddedTo = [];
  }

  console.log("existingCategoryObj: " + existingCategoryObj);
  console.log("listToBeAddedTo: " + listToBeAddedTo);
  listToBeAddedTo.push(existingCategoryObj);
  console.log("listToBeAddedTo: ", listToBeAddedTo);
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
    let salary = new SalaryModel();
    salary.faculty_id = facultySalaryCustomization.faculty_id;
    salary.created_by = req.body.created_by;
    salary.month = uniMonthlySalaryStructure.month;
    salary.year = uniMonthlySalaryStructure.year;
    salary.total_working_days = 22;
    salary.days_worked = 22;
    salary.total_earnings = totalEarning;
    salary.total_deductions = totalDeduction;
    salary.total_net = netSalary;
    salary.earnings = [...earnings.values()];
    salary.deductions = [...deductions.values()];

    // console.log("===\n======", salary);

    return await salary.save();
  },

  async processOneFaculty(uniMonthlySalaryStructure, faculty, req) {
    console.log("curr faculty: ", faculty.faculty_id);
    // fetch faculty salary customization
    const facultySalaryCustomization = await this.getFacultySalaryCustomization(
      faculty.faculty_id
    );
    // console.log(facultySalaryCustomization);

    // calculate salary for month
    if (facultySalaryCustomization && faculty.is_active) {
      console.log("calculating salary for faculty: ", faculty.faculty_id);
      await this.calculateSalaryForMonthForOneFaculty(
        uniMonthlySalaryStructure,
        facultySalaryCustomization,
        req
      );
    } else {
      console.log(
        "Customization unavailable or faculty is not active: ",
        faculty.faculty_id
      );
    }
  },

  async calculateSalaryForMonthForAllFaculty(req, res) {
    // fetch uni monthly salary structure
    const uniMonthlySalaryStructure = await this.getUniSalaryStructure(
      req.body.month,
      req.body.year
    );
    // console.log(uniMonthlySalaryStructure);

    FacultyModel.find()
      .then((allFaculties) => {
        for (let faculty of allFaculties) {
          // TODO: Is faculty still working here??
          this.processOneFaculty(uniMonthlySalaryStructure, faculty, req);
        }
      })
      .catch((err) => {
        console.log("error while calculating salary for all faculties");
        // console.log(err);
      });
  },

  async updateSalaryCustomization(req, res) {
    // fetch faculty salary customization
    // const or var??
    var facultySalaryCustomizationFetched = await this.getFacultySalaryCustomization(
      req.body.faculty_id
    );
    // console.log(facultySalaryCustomizationFetched);
    var facultySalaryCustomization = new FacultySalaryCustomizationModel(facultySalaryCustomizationFetched);
    // console.log(facultySalaryCustomization);

    // TODO: what if no SalaryCustomization??

    // create edit history entry
    var editHistoryEntry = new Object();
    editHistoryEntry.edited_by = req.body.edited_by;
    editHistoryEntry.edited_on = req.body.edited_on;

    var existingCategoryObj = getCategory(facultySalaryCustomization, req.body.category);
    if (existingCategoryObj == null) {
      existingCategoryObj = new Object();
      /**
       * 2 Approaches
       *  a. Add category as they come
       *  b. Maintain empty category even if not needed i.e, have 0 value by default
       *      even in this case, a new category can be added in future, and that would have to handled
       */
      existingCategoryObj.category = req.body.category;
      existingCategoryObj.isPercentage = false;
      if (req.body.isPercentage) {
        existingCategoryObj.percentage = 0;
      }
      else {
        existingCategoryObj.amount = 0;
      }

      // see  if it can be directly be added, 
      //        else create new Customization Object to be saved at the end
      //    or add this functionality at the end
      // MIGHT NOT BE NEEDED AS WE NEED TO UPDATE THE HISTORY ANYWAY IN THE NEXT STEP
      addCategoryToList(req.body.category_type, existingCategoryObj, facultySalaryCustomization);
    }
    console.log("existingCategoryObj: ", existingCategoryObj);
    console.log("facultySalaryCustomization: ", facultySalaryCustomization);

    if (existingCategoryObj.isPercentage)
      editHistoryEntry.percentage = existingCategoryObj.percentage;
    else
      editHistoryEntry.amount = existingCategoryObj.amount;
    console.log("editHistoryEntry: ", editHistoryEntry);

    // add edit history to facultySalaryCustomization
    // updateEditHistoryAndCategoryObj();
    if (existingCategoryObj.edit_history == undefined) {
      existingCategoryObj.edit_history = [];
    }
    console.log("existingCategoryObj.edit_history: ", existingCategoryObj.edit_history);
    existingCategoryObj.edit_history.push(editHistoryEntry);
    console.log("existingCategoryObj.edit_history: ", existingCategoryObj.edit_history);
    existingCategoryObj.isPercentage = req.body.isPercentage;
    if (req.body.isPercentage) {
      existingCategoryObj.percentage = req.body.percentage;
      existingCategoryObj.amount = 0;
    }
    else {
      existingCategoryObj.amount = req.body.amount;
      existingCategoryObj.percentage = 0;
    }

    // create new before saving and save
    facultySalaryCustomization.last_edited_by = req.body.edited_by;
    // var updatedSalaryCustomization = new FacultySalaryCustomizationModel(facultySalaryCustomization);
    
    console.log(facultySalaryCustomization);
    await facultySalaryCustomization.save()
    .then((result) => {
      return res.status(201).json({
        status: "success",
        updatedSalaryCustomization: result
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: "error saving updated salaryCustomization",
      });
    });
  },

  async getFacultySalaryCustomization(faculty_id) {
    var id = faculty_id;
    // console.log(id);
    return await FacultySalaryCustomizationModel.findOne({
      faculty_id: id,
    })
      .then((result) => {
        // console.log(result);
        return result;
      })
      .catch((err) => {
        console.log("error fetching FacultySalaryCustomization");
        return err;
      });
  },

  async getUniSalaryStructure(month, year) {
    return await UniMonthlySalaryStructureModel.findOne({
      month: month,
      year: year,
    })
      .then((result) => {
        // console.log(result);
        return result;
      })
      .catch((err) => {
        console.log("error fetching UniSalaryStructure");
        return err;
      });
  },
};
