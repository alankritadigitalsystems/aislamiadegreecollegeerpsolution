import salaryService from"./service/salary";
import simpleSalaryGenerationService from"./service/simpleSalaryGenerationService";

module.exports = {
  async calculateSalaryForMonth(req, res) {
    // call service to calculate salary
    simpleSalaryGenerationService
      .calculateSalaryForMonthForOneFaculty(
        await salaryService.getUniSalaryStructure(
          req.body.month,
          req.body.year
        ),
        await salaryService.getFacultySalaryCustomization(req.body.faculty_id),
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
  },
};
