import express from "express";
import cors from "cors";
import { connect } from "./src/bd.js";

import { userRoutes } from "./src/routes/user.routes.js";
import { internshipRoutes } from "./src/routes/internships.routes.js";
import { weeklyLogsRoutes } from "./src/routes/weeklyLogs.routes.js";

const app = express();

// Conecta a la BBDD
connect();

app.use(
  cors({
    origin: 'http://localhost:5173',
    // Permite leer Content-Disposition desde Front).
    exposedHeaders: ['Content-Disposition'],
    credential: true,
  }),
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/internships", internshipRoutes);
app.use("/weekly-logs", weeklyLogsRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Backend funcionando" });
});


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
