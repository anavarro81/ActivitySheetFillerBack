import { createReport } from "docx-templates";
import fs from "fs";

export const createWordDocument = async (wordData) => {
  const { name, lastname, internship_period, daily_logs } = wordData;

  const templatePath = "wordTemplate.docx";

  if (!fs.existsSync(templatePath)) {
    console.error(`No se encontró la plantilla ${templatePath} `);
    throw new Error("Template not found");
  }

  const template = fs.readFileSync(templatePath);

  const templateData = {
    name,
    lastname,
    internship_period,
    daily_logs,
  };

  console.log("templateData ", templateData);

  for (const day of daily_logs) {
    console.log("day ", day);
  }

  const buffer = await createReport({
    template,
    data: templateData,
  });

  return buffer;
};
