// import express from "express";

// const router = express.Router();

// router.post("/", (req, res) => {
//   const { ldr, led, servo, status } = req.body;

//   if (status !== undefined && status === 1) {
    
//   }

//   console.log("=== DADOS RECEBIDOS ===");

//   if (ldr !== undefined)
//     console.log("LDR:", ldr > 500 ? "Ambiente claro" : "Ambiente escuro");

//   if (status !== undefined) console.log("status: ", status)
  
    
//   if (led !== undefined && led === "verde") {
//     console.log("LED Ativado:", led);
//     console.log("LED Desativado: vermelho");
//   } else {
//     console.log("LED Ativado:", led);
//     console.log("LED Desativado: verde");
//   } // vermelho, verde, azul, etc.

//   if (servo !== undefined && servo === 180) {
//     console.log("Servo posição:", servo, "Cortina Fechada");
//   }else console.log("Servo posição:", servo, "Cortina Aberta"); // 0 ou 180

//   console.log("========================");

//   res.status(200).send("Dados recebidos");
// });
// export default router;

import express from "express";
import { SensorService } from "../service/sensor";

const router = express.Router();

let statusAnterior: number | null = null; // guarda o status anterior

const sensorService = new SensorService();

router.post("/", (req, res) => {
  const { ldr, led, servo, status } = req.body;

  // Verifica mudança de status
  if (status !== undefined && status !== statusAnterior) {
    sensorService.saveDataSensor({
      statusHambiente: status,
      servo: servo,
      ledVerde: led === "verde" ? 1 : 0,
      ledVermelho: led === "vermelho" ? 1 : 0,
      ldr: ldr,
    });
    statusAnterior = status; // Atualiza o status anterior
    console.log("Processo Salvo");
    
  }

  console.log("=== DADOS RECEBIDOS ===");

  if (ldr !== undefined)
    console.log("LDR:", ldr > 500 ? "Ambiente claro" : "Ambiente escuro");

  if (status !== undefined) console.log("status: ", status);

  if (led !== undefined && led === "verde") {
    console.log("LED Ativado:", led);
    console.log("LED Desativado: vermelho");
  } else {
    console.log("LED Ativado:", led);
    console.log("LED Desativado: verde");
  }

  if (servo !== undefined && servo === 180) {
    console.log("Servo posição:", servo, "Cortina Fechada");
  } else {
    console.log("Servo posição:", servo, "Cortina Aberta");
  }

  console.log("========================");

  res.status(200).send("Dados recebidos");
});

export default router;