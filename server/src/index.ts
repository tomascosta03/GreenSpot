import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';  // Importar cors
import UserRouter from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

// Middleware
app.use(cors());  // Adicionar o middleware cors
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/users', UserRouter);

mongoose.connect(process.env.DB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connected successfully`);
      console.log(`The server is listening on: http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.log(error);
  });
