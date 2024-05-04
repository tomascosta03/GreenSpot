import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import UserRouter from "./routes/user/routes";


dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');

app.use(express.json())
app.use(morgan('tiny'));
app.use("/user", UserRouter);


// ligar a bd
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(port, () => {
            console.log(`Database connected successfully`);
            console.log(`The server is listening on: http://localhost:${port}`);
        });
    })
    .catch((error: any) =>{
        console.log(error)
    })