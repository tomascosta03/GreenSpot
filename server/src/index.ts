import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import UserRouter from "./routes/user";
import ParkRouter from "./routes/park";
import SpotRouter from "./routes/spot"
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');

//middleware 
app.use(express.json())

app.use(cors({
    origin: ['192.168.1.76:8081', 'http://localhost:8000']
  }));


app.use(morgan('tiny'));
app.use('/api/users', UserRouter);
app.use('/api/parks', ParkRouter);
app.use('/api/spots', SpotRouter);


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