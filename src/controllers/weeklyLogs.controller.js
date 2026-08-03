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
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
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

export const downloadWord = async (req, res) => {
  const weekId = req.params.id;

  try {
    
    const wordDonwload = await weekLogServices.downloadWord(weekId);

    
    
    // Cabeceras estandar para indicar que es un fichero binario y forzar su descarga. 
    // Indica que es un fichero descargable y se indica su nombre. 
    res.setHeader(
      "content-disposition",
      "attachment; filename=hoja_actividad.docx",
    );
    
    // Indica el tipo de archivo que se manda
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );

    return res.send(wordDonwload);

    res.status(200).json(wordInfo);
  } catch (error) {
    console.error("error recuperando datos del word ", error);
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
  }
};
