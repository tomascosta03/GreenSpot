import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import UserRouter from "./user/routes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan('tiny'));
app.use("/user", UserRouter);

app.listen(port, () => {
    console.log(`The server is listening on: http://localhost:${port}`);
});