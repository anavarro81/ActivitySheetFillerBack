import * as internshipServices from "../services/internships.service.js";

export const newInternship = async (req, res) => {
  try {
    const { createdInternship, weeklyLogsData } =
      await internshipServices.newInternships(req.body);

    console.log(">> createdinternship ", createdInternship);
    console.log(">> weeklyLogsData ", weeklyLogsData);

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

    if (error.message == "STUDENT_NOT_EXISTS") {
      return res.status(400).json({ message: "El estudiante no existe" });
    }

    return res.status(500).json({ error: "error in database" });
    //   }
  }
};

export const getInternshipsByStudent = async (req, res) => {
  try {
    // accept student id from query, header or body for flexibility
    const student_id = req.query.student_id      

    if (!student_id) {
      return res.status(400).json({ message: "student_id is required" });
    }

    const  internshipWeeks =
      await internshipServices.getInternshipsByStudent(student_id);

    return res.status(200).json(internshipWeeks);
  } catch (error) {
    console.error("error getting internships", error);

    if (error.message == "STUDENT_NOT_EXISTS") {
      return res.status(400).json({ message: "El estudiante no existe" });
    }

    return res.status(500).json({ error: "error in database" });
  }
};
