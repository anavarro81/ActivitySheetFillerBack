import { createReport } from "docx-templates";
import fs from "fs";
import path from 'path';

export const createWordDocument = async (wordData) => {
  const { name, lastname, internship_period, daily_logs } = wordData;

  const templatePath = "wordTemplate.docx";

  const isProd = process.env.NODE_ENV === "production";
  const URL_TEMPLATE =
    process.env.TEMPLATE_URL ||
    "https://res.cloudinary.com/dxm9rdtus/raw/upload/v1789051512/wordTemplate_nksqcx.docx";
  let template;

  if (isProd) {
    const response = await fetch(URL_TEMPLATE);

    

    if (!response.ok) {
      throw new Error(`No se pudo cargar la plantilla: ${response.status}`);
    }

    template = Buffer.from(await response.arrayBuffer());

    

  } else {
    const templatePath = path.resolve(process.cwd(), "wordTemplate.docx");
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    template = fs.readFileSync(templatePath);
  }



  const templateData = {
    name,
    lastname,
    internship_period,
    daily_logs,
  };

  const buffer = await createReport({
    template,
    data: templateData,
  });

  return buffer;
};
