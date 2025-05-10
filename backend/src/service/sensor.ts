import mongoose from "mongoose";

interface ISensorData {
  statusHambiente: number;
  ledVerde: number;
  ledVermelho: number;
  servo: number;
  ldr: number;
}


const MovementSchema = new mongoose.Schema({
    statusHambiente: Number,
    servo: Number,
    ledVerde: Number,
    ledVermelho: Number,
    ldr: Number,
    timestamp: { type: Date, default: Date.now }, // Data e hora do movimento
});

const MovementModel = mongoose.model("Movement", MovementSchema);

export class SensorService {
    async saveDataSensor(sensor: ISensorData) {
        const newMovement = new MovementModel({
            statusHambiente: sensor.statusHambiente,
            servo: sensor.servo,
            ledVerde: sensor.ledVerde,
            ledVermelho: sensor.ledVermelho,
            ldr: sensor.ldr,
        })
        
        await newMovement.save();
  }
}
