import WeeklyLog from "../models/weeklyLogs.model.js";

export const getTaskByWeek = async (weekID) => {
  try {
    
    

    const weekTask = await WeeklyLog.findOne({ _id: weekID });

    

    if (!weekTask) {
      throw new Error("week not found");
    }

    return {
      start_date: weekTask.start_date,
      end_date: weekTask.end_date,
      daily_log: weekTask.daily_logs,
    };
  } catch (error) {
    console.error("error recuperando la semana ", error);
    throw new Error("bbdd error");
  }
};
