import Internship from "../models/intenships.model.js";
import WeeklyLog from "../models/weeklyLogs.model.js";
import User from "../models/user.model.js";
import { generateIntershipCalendar } from "../utils/calendar.js";
import createError from "http-errors";

export const newInternships = async (InternshipsData) => {
  try {
    const { student_id, start_date, end_date } = InternshipsData;

    const student = await User.findOne({ _id: student_id });

    if (!student) {
      throw createError(404, "student not found");
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
        status: "Pendiente",
        daily_logs: wl,
      };
    });

    await Promise.all(weeklyLogsData.map((data) => WeeklyLog.create(data)));

    return { createdInternship, weeklyLogsData };
  } catch (error) {
    console.error("error creando las prácticas ", error);
    throw error;
  }
};

const calculateStatus = (referenceDate, weekStartDate, weekEndDate, status) => {
  // Se convierte a milsegundo para comparar las fechas de forma segura.

  // Resetea la hora a las 00:00:00 y convierte a milisegundos para convertir
  const ReferenceDateMls = new Date(referenceDate).setUTCHours(0, 0, 0, 0);
  const WeekStartDateMls = new Date(weekStartDate).setUTCHours(0, 0, 0, 0);
  const WeekEndDateMls = new Date(weekEndDate).setUTCHours(0, 0, 0, 0);

  if (isNaN(ReferenceDateMls)) {
    throw createError(400, "referenceDate not valid");
  }

  if (isNaN(WeekStartDateMls)) {
    throw createError(400, "week start date not valid");
  }

  if (isNaN(WeekEndDateMls)) {
    throw createError(400, "week end date not valid");
  }

  if (ReferenceDateMls < WeekStartDateMls) {
    return "Pendiente";
  }

  if (
    ReferenceDateMls >= WeekStartDateMls &&
    ReferenceDateMls <= WeekEndDateMls
  ) {
    return "En curso";
  }

  if (WeekStartDateMls > ReferenceDateMls) {
    return "Pendiente";
  }

  if (WeekEndDateMls > ReferenceDateMls) {
    if (status == "Completado") {
      return "Completado";
    } else {
      return "Pendiente";
    }
  }

  // Valido que me llegan fechas con formato correcto.

  // fecha actual < a fecInicioSem	Pendiente
  // fecha actual ≥ fecInicioSem ≤ fecFinSem 	En curso
  // fecInicioSem > fecha actual	Pendiente (semanas futuras)
  // fec actual > fecha fin semana	Pendiente (si no la cerró)
  //                                Completa si la cerro.

  return "Pendiente";
};

export const getInternshipsByStudent = async (
  student_id,
  referenceDate = new Date(),
) => {
  try {
    const student = await User.findOne({ _id: student_id });

    if (!student) {
      throw createError(404, "student not found");
    }

    const internships = await Internship.findOne({ student_id }).lean();

    const wlog = await WeeklyLog.find({ internship_id: internships._id })
      .sort({ week_number: 1 })
      .lean();

    const weeklyLog = wlog.map((wl) => ({
      week_id: wl._id,
      week_number: wl.week_number,
      start_date: wl.start_date,
      end_date: wl.end_date,
      status: calculateStatus(
        referenceDate,
        wl.start_date,
        wl.end_date,
        wl.status,
      ),
    }));

    return {
      start_date: internships.start_date,
      end_date: internships.end_date,
      weeklyLog: weeklyLog,
    };
  } catch (error) {
    console.error("error fetching internships by student", error);
    throw error;
  }
};
