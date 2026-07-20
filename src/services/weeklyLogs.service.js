import WeeklyLog from "../models/weeklyLogs.model.js";
import Internship from "../models/intenships.model.js";

export const getTaskByWeek = async (weekID, studentId) => {
  try {
    const weekTask = await WeeklyLog.findOne({ _id: weekID });

    if (!weekTask) {
      throw new Error("week not found");
    }

    // Obtengo las practicas
    const intenships = await Internship.findOne({
      _id: weekTask.internship_id,
    });

    if (!intenships) {
      throw new Error("intenships not found");
    }

    console.log("intenships.student_id ", intenships.student_id);
    console.log("studentId ", studentId);

    if (intenships.student_id != studentId) {
      throw new Error("Forbidden");
    }

    return {
      start_date: weekTask.start_date,
      end_date: weekTask.end_date,
      daily_log: weekTask.daily_logs,
    };
  } catch (error) {
    console.error("error recuperando la semana ", error.message);

    if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("error in database");
    }
  }
};
// Obtiene a que practicas pertenece la semana
export const getIntenshipsbyWeek = async (weekId) => {};
