import Internship from "../models/intenships.model.js";
import WeeklyLog from "../models/weeklyLogs.model.js";
import User from "../models/user.model.js";
import { generateIntershipCalendar } from "../utils/calendar.js";

export const newInternships = async (InternshipsData) => {
  try {
    

    const { student_id, start_date, end_date } = InternshipsData;

    const student = await User.findOne({ _id: student_id });

    if (!student) {
      throw new Error("STUDENT_NOT_EXISTS");
    }

    const calendar = generateIntershipCalendar(start_date, end_date);

    

    const createdInternship = await Internship.create(InternshipsData);

    const internshipsID = createdInternship._id;

    

    const curretDate = new Date();

    const weeklyLogsData = calendar.map((weeklog) => {
      const wl = weeklog.dailyLogWeek.map((day) => ({
        date: day,
        tasks: [],
        absence: null,
      }));

      return {
        internship_id: internshipsID,
        week_number: weeklog.week,
        start_date: weeklog.dailyLogWeek[0],
        end_date: weeklog.dailyLogWeek[weeklog.dailyLogWeek.length - 1],
        status:
          curretDate < createdInternship.start_date ? "Pendiente" : "En Curso",
        daily_logs: wl,
      };
    });

    

    await Promise.all(weeklyLogsData.map((data) => WeeklyLog.create(data)));

    return { createdInternship, weeklyLogsData };
  } catch (error) {
    console.error("error creando las prácticas ", error);

    throw new Error("ERROR_CREATE_INTERNSHIP");
  }
};

export const getInternshipsByStudent = async (student_id) => {
  try {
    const student = await User.findOne({ _id: student_id });

    if (!student) {
      throw new Error("STUDENT_NOT_EXISTS");
    }

    const internships = await Internship.find({ student_id }).lean();

    const results = await Promise.all(
      internships.map(async (intern) => {
        const weeklyLogs = await WeeklyLog.find({
          internship_id: intern._id,
        })
          // Ordenar las semanas, si no las devuelve desorneadas.
          .sort({ week_number: 1 })
          .lean();

        // ensure dates are proper ISO strings when returned
        const weeklyLogsData = weeklyLogs.map((wl) => ({
          week_id: wl._id,
          week_number: wl.week_number,
          start_date: wl.start_date,
          end_date: wl.end_date,
          status: wl.status,
          
        }));

        
  

        return {
          weeklyLogsData
        };
      }),
    );

    return results;
  } catch (error) {
    console.error("error fetching internships by student", error);
    throw error;
  }
};
