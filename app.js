import express from "express";
import cors from "cors";
import { connect } from "./src/bd.js";

import { userRoutes } from "./src/routes/user.routes.js";

const app = express();

// Conecta a la BBDD
connect();

app.use(
  cors({
    origin: "*",
    credential: true,
  }),
);

app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});