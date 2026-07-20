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
