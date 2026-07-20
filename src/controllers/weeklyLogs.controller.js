import * as weekLogServices from "../services/weeklyLogs.service.js";

export const getTaskByWeek = async (req, res) => {
  try {
    const weekId = req.params.id;

    const weekTasks = await weekLogServices.getTaskByWeek(
      weekId,
      req.student_id,
    );

    return res.status(200).json({ weekTasks });
  } catch (error) {
    console.error("error en la semana", error);

    if (error.message == "week not found") {
      return res.status(404).json({ message: "Semana no encontrada" });
    }

    if (error.message == "Forbidden") {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.status(500).json({ error: "error in database" });
  }
};

export const updateWeeklyTasks = async (req, res) => {
  try {
    const weekId = req.params.id;
    const weekData = req.body;

    const updatedLog = await weekLogServices.updateWeeklyTasks(
      weekId,
      weekData,
    );

    return res.status(200).json({ updatedLog });
  } catch (error) {
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
  }
};

export const completeWeeklyTasks = async (req, res) => {
  try {
    const weekId = req.params.id;
    const weekData = req.body;

    const completedWeek = await weekLogServices.completeWeeklyTasks(
      weekId,
      weekData,
    );

    res.status(200).json({ completedWeek });
  } catch (error) {
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
  }
};
