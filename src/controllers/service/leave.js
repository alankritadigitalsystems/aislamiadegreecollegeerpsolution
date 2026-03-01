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

const leaveService = {
  getLeaveCategories() {
    return leaveCategories;
  },

  async creditAnnualLeave(faculty) {
    let faculty_leaves = faculty.leave;

    Object.keys(faculty_leaves).forEach((leave_type) => {
      let faculty_type = faculty.is_technical
        ? LABEL_TEACHING
        : LABEL_NON_TEACHING;
      let no_of_leaves_to_credit =
        leaveCategories[leave_type]["yearly_addition"][faculty_type];

      if (!isNaN(no_of_leaves_to_credit)) {
        let available_leave_count =
          faculty_leaves[leave_type]["available_leave_count"];
        let max_leaves_of_type =
          leaveCategories[leave_type]["accumulation_limit"];

        if (max_leaves_of_type == -1) {
          faculty_leaves[leave_type]["available_leave_count"] +=
            no_of_leaves_to_credit;
        } else {
          if (
            available_leave_count + no_of_leaves_to_credit <=
            max_leaves_of_type
          ) {
            faculty_leaves[leave_type]["available_leave_count"] +=
              no_of_leaves_to_credit;
          } else {
            faculty_leaves[leave_type]["available_leave_count"] =
              max_leaves_of_type;
          }
        }
      }
    });

    let faculty_to_save = new FacultyModel(faculty);
    return await faculty_to_save.save().then((updated_faculty) => {
      return updated_faculty;
    });
  },

  async getLeavesInRange(
    created_by,
    starting_date,
    ending_date,
    leaveModelObj
  ) {
    console.log("in service");
    let query = {
      created_by: created_by,
      starting_date: { $lte: starting_date },
      ending_date: { $gte: starting_date },
    };

    if (starting_date != ending_date) {
      query = {
        created_by: created_by,
        $or: [
          {
            starting_date: {
              $gte: starting_date,
              $lte: ending_date,
            },
          },
          {
            ending_date: {
              $gte: starting_date,
              $lte: ending_date,
            },
          },
        ],
      };
    }

    // TODO: explore using await here to try returning only sucess while err can be set in res and used in calling method. this would mean adding res into the method call
    return await leaveModelObj.find(query);
    // .then((result) => {
    //   console.log("service result fetched");
    //   return result;
    // })
    // .catch((err) => {
    //   console.log("service error");
    //   // return err;
    // });
  },

  checkLeaveConditions(leaveReq, faculty) {
    let leave_type = leaveReq.body.leave_type;
    let leave_days = leaveReq.body.leave_days;

    // appicability
    if (
      leaveCategories[leave_type]["applicability"]["staff_category"] !=
      LABEL_NONE
    ) {
      if (
        leaveCategories[leave_type]["applicability"]["staff_category"] !=
        (faculty.is_technical ? LABEL_TEACHING : LABEL_NON_TEACHING)
      ) {
        return false;
      }
    }
 
    if (leaveCategories[leave_type]["applicability"]["gender_restriction"] != LABEL_NONE) {
      if (leaveCategories[leave_type]["applicability"]["gender_restriction"] != faculty.gender.toLowerCase()) {
        return false;
      }
    }

    // no of time this leave type is appied
    if (leaveCategories[leave_type]["total_application_count_cap"] != -1) {
      if (faculty.leave[leave_type]["applied_count"] >= leaveCategories[leave_type]["total_application_count_cap"]) {
        return false;
      }
    }

    // leave_days
    if (leaveCategories[leave_type]["total_leave_used_cap"] != -1) {
      if (faculty.leave[leave_type]["taken_leave_count"] >= leaveCategories[leave_type]["total_leave_used_cap"]) {
        return false;
      }
    }

    // single_application_leave_cap
    if (leaveCategories[leave_type]["single_application_leave_cap"] != -1) {
      if (leave_days > leaveCategories[leave_type]["single_application_leave_cap"]) {
        return false;
      }
    }

    // return true if all conditions are met
    return true;
  },

  async deductLeave(leaveCreated, faculty) {
    let leave_type = leaveCreated.leave_type;
    let leave_days = leaveCreated.leave_days;

    faculty.leave[leave_type]["available_leave_count"] -= leave_days;
    faculty.leave[leave_type]["taken_leave_count"] += leave_days;
    faculty.leave[leave_type]["applied_count"] += 1;

    let faculty_to_save = new FacultyModel(faculty);
    return await faculty_to_save.save();

  },

  async restoreLeaveCount(faculty, leave) {
    let leave_type = leave.leave_type;
    let leave_days = leave.leave_days;

    faculty.leave[leave_type]["available_leave_count"] += leave_days;
    if (leaveCategories[leave_type]["accumulation_limit"] != -1) {
      if (faculty.leave[leave_type]["available_leave_count"] > leaveCategories[leave_type]["accumulation_limit"]) {
        faculty.leave[leave_type]["available_leave_count"] = leaveCategories[leave_type]["accumulation_limit"];
      }
    }

    faculty.leave[leave_type]["taken_leave_count"] -= leave_days;
    if (faculty.leave[leave_type]["taken_leave_count"] < 0) {
      faculty.leave[leave_type]["taken_leave_count"] = 0;
    }

    faculty.leave[leave_type]["applied_count"] -= 1;
    if (faculty.leave[leave_type]["applied_count"] < 0) {
      faculty.leave[leave_type]["applied_count"] = 0;
    }

    let faculty_to_save = new FacultyModel(faculty);
    return await faculty_to_save.save();
  }
};
export default leaveService;
