import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

import { router } from "./app/routes";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandle } from "./app/middleware/globalErrorHandle";
import cookiePerse from 'cookie-parser'

const app: Application = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookiePerse())
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(globalErrorHandle);
app.use(notFound);
export default app;
