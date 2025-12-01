import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './database/db.js';
import cors from 'cors';
import userRoutes from './modules/api/auth/routes/authRoutes.js';
import eventRoutes from './modules/api/Event/routes/eventRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());


app.use(cors({
    origin:"http://localhost:3000",
    Credential:true
}))

app.use('/auth',userRoutes)
app.use('/event',eventRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running On ${process.env.PORT}`.bgCyan.white);
});

connectDB
