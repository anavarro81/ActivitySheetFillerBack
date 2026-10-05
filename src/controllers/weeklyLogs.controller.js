import * as weekLogServices from "../services/weeklyLogs.service.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

// export const downloadWord = async (req, res) => {
//

//   try {

//     // Cabeceras estandar para indicar que es un fichero binario y forzar su descarga.
//     // Indica que es un fichero descargable y se indica su nombre.
//     res.setHeader(
//       "content-disposition",
//       `attachment; filename=${filename}.docx`,
//     );

//     // Indica el tipo de archivo que se manda
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     );

//     return res.send(wordDonwload);

//     res.status(200).json(wordInfo);
//   } catch (error) {
//     console.error("error recuperando datos del word ", error);
//     const status = error.status || 500;
//     return res
//       .status(status)
//       .json({ message: error.message || "Internal server" });
//   }
// };

// -- Prueba pdf (inicio)

export const downloadWord = async (req, res) => {
  try {
    // Datos del estudiante (simulados, aquí los extraerías de tu base de datos)
    const weekId = req.params.id;

    const { PDFData, filename } = await weekLogServices.downloadWord(weekId);

    console.log("actividades >> ", PDFData.daily_logs);
    console.log("actividades (1) >> ", PDFData.daily_logs[0].tasks);

    const estudiante = {
      nombre: PDFData.name,
      apellido: PDFData.lastname,
      periodo: PDFData.internship_period,
      actividades: PDFData.daily_logs.map((taskDay) => ({
        fecha: taskDay.date,
        tareas: (taskDay.tasks || []).map((t) => t.description),
      })),

      
    };

    // 1. Inicializar el documento
    const doc = new jsPDF();

    // 2. Cabecera / Título principal
    doc.setFontSize(15);
    doc.setTextColor(31, 78, 120); // Azul corporativo (#1F4E78)
    doc.setFont("helvetica", "bold");
    doc.text("SEGUIMIENTO FORMACIÓN EN EMPRESA", 105, 20, { align: "center" });

    // 3. Tabla de Información del Alumno (Sin bordes, estilo limpio)
    autoTable(doc, {
      startY: 30,
      theme: "plain",
      styles: { fontSize: 11, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: "bold", textColor: [31, 78, 120], cellWidth: 25 },
        1: { textColor: [51, 51, 51] },
      },
      body: [
        ["ALUMNO:", `${estudiante.nombre} ${estudiante.apellido}`],
        ["SEMANA:", estudiante.periodo],
      ],
    });

    // 4. Mapear las actividades para convertirlas en filas con viñetas
    const filasActividades = estudiante.actividades.map((item) => {
      // Unimos las tareas con un salto de línea y un guion o punto visual
      const listaTareas = item.tareas.map((tarea) => `• ${tarea}`).join("\n");
      return [item.fecha, listaTareas];
    });

    // 5. Tabla Principal de Actividades
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10, // Comienza justo debajo de la tabla anterior
      theme: "grid",
      headStyles: {
        fillColor: [31, 78, 120],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
        textColor: [51, 51, 51],
        valign: "middle",
      },
      columnStyles: {
        0: {
          fontStyle: "bold",
          halign: "center",
          cellWidth: 35,
          fillColor: [249, 249, 249],
        },
        1: { cellWidth: "auto" }, // Ocupa el resto del ancho disponible
      },
      head: [["FECHA", "ACTIVIDADES DESARROLLADAS"]],
      body: filasActividades,
    });

    // 6. Generar nombre de archivo con guiones medios
    const cleanName = estudiante.nombre.toLowerCase().replaceAll(" ", "-");
    const cleanLastName = estudiante.apellido
      .toLowerCase()
      .replaceAll(" ", "-");

    // 7. Generar el buffer del PDF compatible con Node.js
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // 8. Configurar cabeceras y enviar descarga
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res
      .status(500)
      .json({ error: "No se pudo generar la hoja de seguimiento." });
  }
};
// -- Prueba pdf (fin)
