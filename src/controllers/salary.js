import  salaryService from "./service/salary";
import  FacultySalaryCustomizationModel from "../models/faculty_salary_customization";
import  UniMonthlySalaryStructureModel from "../models/uni_monthly_salary_structure";
import  SimpleGeneratedSalaryModel from "../models/generated_simple_salary";
import  crud from "../middlewares/crud";

const calculateSalaryForMonth = async (req, res, modelObj) => {
  // fetch uni monthly salary structure
  const uniMonthlySalaryStructure = await salaryService.getUniSalaryStructure(
    req.body.month,
    req.body.year
  );
  // console.log(uniMonthlySalaryStructure);

  // fetch faculty salary customization
  const facultySalaryCustomization =
    await salaryService.getFacultySalaryCustomization(req.body.faculty_id);
  // console.log(facultySalaryCustomization);

  // call service to calculate salary
  salaryService
    .calculateSalaryForMonthForOneFaculty(
      uniMonthlySalaryStructure,
      facultySalaryCustomization,
      req
    )
    .then((result) => {
      console.log("salary calculated and saved");
      return res.status(201).json(result);
    })
    .catch((err) => {
      console.log("service error");
      // console.log(err);
      return res.status(500).json({
        error: "Error in saving salary",
        dump: err,
      });
    });
};

const calculateSalaryForAllForOneMonth = async (req, res) => {
  // call service to calculate salary
  salaryService
    .calculateSalaryForMonthForAllFaculty(req, res)
    .then((result) => {
      console.log("started calculating salaries");
      return res.status(201).json("started calculating salaries");
    })
    .catch((err) => {
      console.log("service error");
      // console.log(err);
      return res.status(500).json({
        error: "Error in saving salary",
        dump: err,
      });
    });
};

module.exports = {
  async setFacultySalaryCustomization(req, res) {
    FacultySalaryCustomizationModel.findOne(
      { faculty_id: req.body.faculty_id },
      function (err, result) {
        if (result) {
          res.status(400).json({
            error:
              "Faculty salary customization already exists for given faculty:" +
              req.body.faculty_id,
          });
        } else {
          crud.createEntry(req, res, FacultySalaryCustomizationModel);
        }
      }
    );
  },

  async setUniMonthlySalary(req, res) {
    // find if any simple salary exist for given month and year
    SimpleGeneratedSalaryModel.findOne(
      {
        month: req.body.month,
        year: req.body.year,
      },
      function (err, result) {
        if (result) {
          res.status(400).json({
            error:
              "Uni Monthly Salary cannot be set as it is already used to generate salaries for : " +
              req.body.month +
              ", " +
              req.body.year,
          });
        } else {
          UniMonthlySalaryStructureModel.findOneAndUpdate(
            {
              month: req.body.month,
              year: req.body.year,
            },
            req.body,
            { upsert: true },
            function (err, result) {
              if (err) {
                res.status(500).json({
                  error: "Error in saving uni monthly salary",
                });
              }

              if (result) {
                res.status(200).json({
                  message:
                    "Uni Monthly Salary saved for : " +
                    req.body.month +
                    ", " +
                    req.body.year,
                });
              }
            }
          );
        }
      }
    );
  },

  async updateSalaryCustomization(req, res) {
    // call service to calculate salary
    salaryService.updateSalaryCustomization(req, res);
  },

  async getUniMonthlySalary(req, res) {
    salaryService
      .getUniSalaryStructure(req.body.month, req.body.year)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            error: "No salary structure found for given inputs",
          });
        }
        return res.status(201).json(result);
      })
      .catch((err) => {
        console.log("error fetching UniSalaryStructure");
        return res.status(500).json({
          error: "Error in fetching UniSalaryStructure",
          dump: err,
        });
      });
  },

  async getSalaryCustomization(req, res) {
    salaryService
      .getFacultySalaryCustomization(req.body.faculty_id)
      .then((result) => {
        if (!result) {
          return res.status(500).json({
            error: "No salary customization found for given inputs",
          });
        }
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.log("error fetching FacultySalaryCustomization");
        return res.status(500).json({
          error: "Error in fetching FacultySalaryCustomization",
          dump: err,
        });
      });
  },
};
