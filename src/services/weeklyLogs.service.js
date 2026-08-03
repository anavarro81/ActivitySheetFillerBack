import WeeklyLog from "../models/weeklyLogs.model.js";
import Internship from "../models/intenships.model.js";
import User from "../models/user.model.js";
import createError from "http-errors";
import { createWordDocument } from "../utils/createWord.js";
import { formatIntershipPeriod } from "../utils/calendar.js";

export const getTaskByWeek = async (weekID, studentId) => {
  try {
    const weekTask = await WeeklyLog.findOne({ _id: weekID });

    if (!weekTask) {
      throw createError(404, "week not found");
    }

    // Obtengo las practicas
    const intenships = await Internship.findOne({
      _id: weekTask.internship_id,
    });

    if (!intenships) {
      throw createError(404, "intenships not found");
    }

    if (intenships.student_id != studentId) {
      throw createError(403, "Access denied");
    }

    return {
      start_date: weekTask.start_date,
      end_date: weekTask.end_date,
      daily_log: weekTask.daily_logs,
    };
  } catch (error) {
    console.error("error recuperando la semana ", error.message);
    throw error;
  }
};

export const updateWeeklyTasks = async (weekId, weekData) => {
  try {
    const weekyLogs = await WeeklyLog.findOne({ _id: weekId });

    if (!weekyLogs) throw createError(404, "Week not found");

    // Reemplazamos los daily_logs con lo que viene del frontend
    weekyLogs.daily_logs = weekData.daily_logs;

    // Mongose crea los nuevos ids y se respetan los existentes
    const updatedLog = await weekyLogs.save();

    return updatedLog;
  } catch (error) {
    console.error("Error al actualizar las tareas ", error);
    throw error;
  }
};

export const completeWeeklyTasks = async (weekId, weekData) => {
  try {
    await updateWeeklyTasks(weekId, weekData);

    const week = await WeeklyLog.findOne({ _id: weekId });

    if (!week) throw createError(404, "week not found");

    week.status = "Completado";

    await week.save();
    return week;
  } catch (error) {
    throw error;
  }
};

export const downloadWord = async (weekID) => {
  try {
    const weekTasks = await WeeklyLog.findOne({ _id: weekID });

    if (!weekTasks) {
      throw createError(404, "week not found");
    }

    // Obtengo las practicas
    const intenships = await Internship.findOne({
      _id: weekTasks.internship_id,
    });

    if (!intenships) {
      throw createError(404, "intenships not found");
    }

    // Obtengo los datos del alumno
    const student = await User.findOne({ _id: intenships.student_id });

    const wordData = {
      name: student.first_name,
      lastname: student.last_name,
      internship_period: formatIntershipPeriod(
        intenships.start_date,
        intenships.end_date,
      ),
      daily_logs: weekTasks.daily_logs.map((task) => ({
        date: new Date(task.date).toLocaleDateString("es-ES"),
        tasks: task.tasks,
      })),
    };

    console.log("wordData ", wordData);

    const wordDonwload = await createWordDocument(wordData);

    

    return wordDonwload;
  } catch (error) {
    throw error;
  }
};
