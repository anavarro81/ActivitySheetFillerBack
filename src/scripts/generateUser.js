import dotenv from "dotenv";
dotenv.config();

import { connect } from "../bd.js";
import { createUser } from "../services/user.service.js";
import Internship from "../models/intenships.model.js";
import WeeklyLog from "../models/weeklyLogs.model.js";
import User from "../models/user.model.js";

const FIXED_USER = {
  first_name: "Elena",
  last_name: "Lopez Diaz",
  email: "elena.lopez.1788762790594543@email.com",
  dni: "42593901V",
  role: "student",
  password: "123Abc99@",
};

const PROGRAMMING_TASKS = [
  "Implement endpoint validations in Express",
  "Refactor service logic into reusable functions",
  "Create unit tests for controller methods",
  "Fix async bug in Mongo query handling",
  "Add pagination support to list endpoint",
  "Improve API error responses and status codes",
  "Design Mongoose schema for new feature",
  "Document API routes in OpenAPI format",
  "Optimize query performance with indexes",
  "Implement JWT auth middleware improvements",
  "Add input sanitization to request validators",
  "Write integration test for login flow",
  "Implement role-based route protection",
  "Create utility to normalize date handling",
  "Debug and fix race condition in update logic",
];

const randomFrom = (array) => array[Math.floor(Math.random() * array.length)];

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const getMonday = (date) => {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(d, diff);
};

const getWeekDays = (monday) => {
  const days = [];
  for (let i = 0; i < 5; i++) {
    days.push(addDays(monday, i));
  }
  return days;
};

const pickTwoTasks = () => {
  const first = randomFrom(PROGRAMMING_TASKS);
  let second = randomFrom(PROGRAMMING_TASKS);

  while (second === first) {
    second = randomFrom(PROGRAMMING_TASKS);
  }

  return [
    { description: first, order: 1 },
    { description: second, order: 2 },
  ];
};

const buildWeek = ({ internshipId, weekNumber, monday, status, withTasks }) => {
  const weekDays = getWeekDays(monday);

  return {
    internship_id: internshipId,
    week_number: weekNumber,
    start_date: weekDays[0],
    end_date: weekDays[4],
    status,
    daily_logs: weekDays.map((date) => ({
      date,
      tasks: withTasks ? pickTwoTasks() : [],
      absence: null,
    })),
  };
};

const main = async () => {
  await connect();

  // Si ya existe el usuario objetivo, eliminamos sus datos relacionados
  // para recrearlo siempre con el mismo estado inicial.
  const existingUser = await User.findOne({
    email: FIXED_USER.email,
    dni: FIXED_USER.dni,
  });

  if (existingUser) {
    const internships = await Internship.find({ student_id: existingUser._id });
    const internshipIds = internships.map((item) => item._id);

    if (internshipIds.length > 0) {
      await WeeklyLog.deleteMany({ internship_id: { $in: internshipIds } });
      await Internship.deleteMany({ _id: { $in: internshipIds } });
    }

    await User.deleteOne({ _id: existingUser._id });
  }

  const today = startOfDay(new Date());
  const currentWeekMonday = getMonday(today);

  const week1Monday = addDays(currentWeekMonday, -14);
  const week2Monday = addDays(currentWeekMonday, -7);
  const week3Monday = currentWeekMonday;
  const week4Monday = addDays(currentWeekMonday, 7);
  const week4Friday = addDays(week4Monday, 4);

  const createdUser = await createUser(FIXED_USER);

  const internship = await Internship.create({
    student_id: createdUser._id,
    company_name: "Indra",
    start_date: week1Monday,
    end_date: week4Friday,
    status: "active",
  });

  const weeklyLogs = [
    buildWeek({
      internshipId: internship._id,
      weekNumber: 1,
      monday: week1Monday,
      status: "Completado",
      withTasks: true,
    }),
    buildWeek({
      internshipId: internship._id,
      weekNumber: 2,
      monday: week2Monday,
      status: "Pendiente",
      withTasks: true,
    }),
    buildWeek({
      internshipId: internship._id,
      weekNumber: 3,
      monday: week3Monday,
      status: "En Curso",
      withTasks: false,
    }),
    buildWeek({
      internshipId: internship._id,
      weekNumber: 4,
      monday: week4Monday,
      status: "Pendiente",
      withTasks: false,
    }),
  ];

  await WeeklyLog.create(weeklyLogs);

  console.log("Usuario de prueba creado correctamente:");
  console.log({
    user_id: createdUser._id.toString(),
    internship_id: internship._id.toString(),
    email: FIXED_USER.email,
    dni: FIXED_USER.dni,
    password: "123Abc99@",
    weeks_summary: [
      "1a semana: Completado (2 tareas por dia)",
      "2a semana: Pendiente (2 tareas por dia)",
      "3a semana: En Curso (sin dias informados)",
      "4a semana: Pendiente (sin dias informados)",
    ],
  });

  process.exit(0);
};

main().catch((err) => {
  console.error("Error creando usuario de prueba:", err);
  process.exit(1);
});
