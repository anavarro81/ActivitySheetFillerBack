import dotenv from "dotenv";
dotenv.config();

import { connect } from "../bd.js";
import { alumnos, practicas, tareas } from "../data.js";
import { createUser } from "../services/user.service.js";
import Internship from "../models/intenships.model.js";
import WeeklyLog from "../models/weeklyLogs.model.js";
import { generateIntershipCalendar } from "../utils/calendar.js";

const SERVER = process.env.SEED_SERVER || "http://localhost:3000";

const createUserViaEndpoint = async (alumno) => {
  if (typeof fetch === "undefined") {
    throw new Error("fetch not available in this Node runtime");
  }

  const res = await fetch(`${SERVER}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alumno),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
};

const main = async () => {
  await connect();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < alumnos.length; i++) {
    const alumno = alumnos[i];
    const practica = practicas[i];
    const tareasForStudent = tareas[i] || { daily_logs: [] };

    let studentId = null;
    try {
      console.log(
        `Intentando crear usuario vía endpoint ${SERVER}/users/register`,
      );
      const created = await createUserViaEndpoint(alumno);
      studentId = created.id || created._id;
      console.log("Usuario creado vía endpoint:", studentId);
    } catch (err) {
      console.warn(
        "No se pudo crear usuario vía endpoint, usando servicio local:",
        err.message,
      );
      const cu = await createUser(alumno);
      studentId = cu._id;
      console.log("Usuario creado localmente con id:", studentId);
    }

    // Crear la práctica para este alumno
    const internshipData = {
      student_id: studentId,
      company_name: practica.company_name,
      start_date: practica.start_date,
      end_date: practica.end_date,
      status: practica.status || "active",
    };

    const createdInternship = await Internship.create(internshipData);
    console.log(
      `Prácticas creadas para ${alumno.first_name}:`,
      createdInternship._id.toString(),
    );

    // Generar semanas y crear WeeklyLogs usando las tareas correspondientes
    const calendar = generateIntershipCalendar(
      practica.start_date,
      practica.end_date,
    );

    const weeklyDocs = calendar.map((week) => {
      const daily_logs = week.dailyLogWeek.map((d) => {
        const dateIso = new Date(d).toISOString().split("T")[0];
        const match = (tareasForStudent.daily_logs || []).find(
          (x) => x.date === dateIso,
        );

        return {
          date: new Date(d),
          tasks: match
            ? match.tasks.map((t) => ({
                description: t.description,
                order: t.order,
              }))
            : [],
          absence: match ? match.absence : null,
        };
      });

      const weekEnd = new Date(week.dailyLogWeek[week.dailyLogWeek.length - 1]);
      weekEnd.setHours(0, 0, 0, 0);

      const status = weekEnd < today ? "Completado" : "Pendiente";

      return {
        internship_id: createdInternship._id,
        week_number: week.week,
        start_date: new Date(week.dailyLogWeek[0]),
        end_date: weekEnd,
        status,
        daily_logs,
      };
    });

    const createdWeekly = await WeeklyLog.create(weeklyDocs);
    console.log(
      `Se han creado ${createdWeekly.length} semanas con tareas para ${
        alumno.first_name
      }.`,
    );
  }

  console.log("Seed finalizada.");
  process.exit(0);
  console.log("Seed finalizada.");
  process.exit(0);
};

main().catch((err) => {
  console.error("Error en seed:", err);
  process.exit(1);
});
