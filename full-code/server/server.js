import express from 'express';
import cors from 'cors'
import apiRouter from './Routes/v1.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

// Listen at port 8000
app.listen(8000, () => {
    console.log("Server is running at port 8000");
});