import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { rootRouter } from "./app/routes";

// create app
const app: Application = express();

// use middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// default route
app.get("/", (req, res) => {
  res.json({ message: "Travel buddy server is running..." });
});

// use routes
app.use("/api", rootRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
