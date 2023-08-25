import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import postRouter from "./routers/posts.router";
import registerRouter from "./routers/register.router";
import loginRouter from "./routers/login.router";

const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.disable("x-powered-by");

app.get("/health", (_, res) => {
  res.send("server is up and running.")
})

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use("/api/posts", postRouter);



export default app;
