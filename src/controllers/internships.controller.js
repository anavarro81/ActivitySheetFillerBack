import * as internshipServices from "../services/internships.service.js";

export const newInternship = async (req, res) => {
  try {
    const { createdInternship, weeklyLogsData } =
      await internshipServices.newInternships(req.body);

    return res.status(201).json({
      id: createdInternship._id,
      student_id: createdInternship.student_id,
      company_name: createdInternship.company_name,
      start_date: createdInternship.start_date,
      end_date: createdInternship.end_date,
      status: createdInternship.status,
      weeklyLogsData: weeklyLogsData,
    });
  } catch (error) {
    console.error("error registering  internship", error);
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
  }
};

export const getInternshipsByStudent = async (req, res) => {
  try {
    // accept student id from query, header or body for flexibility
    const student_id = req.student_id;

    if (!student_id) {
      return res.status(400).json({ message: "student_id is required" });
    }

    const internshipWeeks =
      await internshipServices.getInternshipsByStudent(student_id);

    return res.status(200).json(internshipWeeks);
  } catch (error) {
    console.error("error getting internships", error);
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
  }
};
