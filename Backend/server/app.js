import express from "express";
import cors from "cors";
import routes from "../router/index.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(routes);

export default app;