import { createReport } from "docx-templates";
import fs from "fs";

const generateDocument = async () => {
  const templatePath = "wordTemplate.docx";
  if (!fs.existsSync(templatePath)) {
    console.error(`No se encontró ${templatePath} en la raíz del proyecto.`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath);

  const buffer = await createReport({
    template,
    data: {
      full_name: "Antonio Navarro",
    },
  });
  fs.writeFileSync("report.docx", buffer);
};

generateDocument();
