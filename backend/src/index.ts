import express from "express";
import dotenv from "dotenv";
import sensorRoutes from "./routes/sensor";
import connectDB from "./db/concting";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/sensor", sensorRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
