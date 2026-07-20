import WeeklyLog from "../models/weeklyLogs.model.js";
import Internship from "../models/intenships.model.js";
import createError from "http-errors";

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
