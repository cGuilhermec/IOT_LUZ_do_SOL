# Sistema de Monitoramento e Controle Ambiental com ESP8266

![Project Banner](https://via.placeholder.com/800x200?text=Sistema+de+Monitoramento+Ambiental) <!-- Adicione uma imagem real do projeto aqui -->

Um sistema IoT que monitora condições ambientais usando um sensor LDR, controla LEDs indicadores e um servo motor, e envia dados para um backend Node.js com armazenamento em MongoDB.

## 📋 Tabela de Conteúdos

- [Visão Geral](#-visão-geral)
- [Componentes do Hardware](#-componentes-do-hardware)
- [Configuração do Hardware](#-configuração-do-hardware)
- [Configuração do Software](#-configuração-do-software)
- [Estrutura do Backend](#-estrutura-do-backend)
- [API Endpoints](#-api-endpoints)
- [Fluxo de Dados](#-fluxo-de-dados)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Instalação e Execução](#-instalação-e-execução)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🌐 Visão Geral

O sistema consiste em:
1. **Dispositivo ESP8266** que:
   - Lê valores de luminosidade de um sensor LDR
   - Controla LEDs (vermelho/verde) baseado nas condições ambientais
   - Move um servo motor para simular abertura/fechamento de cortinas
   - Envia dados para um servidor backend via HTTP

2. **Backend Node.js** que:
   - Recebe e processa dados do dispositivo
   - Armazena mudanças de estado no MongoDB
   - Fornece logs detalhados das operações

## 🔌 Componentes do Hardware

| Componente       | Quantidade | Descrição                          |
|------------------|------------|------------------------------------|
| ESP8266          | 1          | Microcontrolador WiFi              |
| Sensor LDR       | 1          | Sensor de luminosidade             |
| LED Vermelho     | 1          | Indicador de ambiente claro        |
| LED Verde        | 1          | Indicador de ambiente escuro       |
| Servo Motor      | 1          | Simula abertura de cortinas        |
| Resistores 220Ω  | 2          | Para os LEDs                       |
| Protoboard       | 1          | Para montagem do circuito          |
| Jumpers          | Vários     | Conexões entre componentes         |

## ⚙️ Configuração do Hardware

### Diagrama de Circuito
+---------------+ +---------------+
| Sensor LDR |-------| A0 (ESP8266) |
+---------------+ +---------------+
|
+---------------+ +---------------+
| LED Vermelho |-------| D5 (ESP8266) |
+---------------+ +---------------+
|
+---------------+ +---------------+
| LED Verde |-------| D6 (ESP8266) |
+---------------+ +---------------+
|
+---------------+ +---------------+
| Servo Motor |-------| D4 (ESP8266) |
+---------------+ +---------------+



### Conexões Detalhadas

- **LDR**: Conectado ao pino analógico A0
- **LED Vermelho**: Conectado ao pino digital D5 com resistor de 220Ω
- **LED Verde**: Conectado ao pino digital D6 com resistor de 220Ω
- **Servo Motor**:
  - Fio vermelho: +5V
  - Fio marrom: GND
  - Fio amarelo/laranja: D4 (sinal)


## 💻 Configuração do Software

### Firmware (ESP8266)

O código do ESP8266 realiza as seguintes funções:

1. Conecta-se à rede WiFi
2. Lê o sensor LDR a cada 5 segundos
3. Controla os LEDs e servo motor baseado na luminosidade:
   - LDR > 500: Ambiente escuro
     - LED Verde ligado
     - Servo em 0° (cortina aberta)
   - LDR ≤ 500: Ambiente claro
     - LED Vermelho ligado
     - Servo em 180° (cortina fechada)
4. Envia dados para o backend via HTTP POST

### Variáveis Ajustáveis

```cpp
// Wi-Fi
const char* ssid = "SUA_REDE_WIFI";
const char* password = "SENHA_WIFI";

// Backend
const char* serverUrl = "http://IP_DO_SERVIDOR:3000/sensor";

// Limiar de luminosidade
const int LIGHT_THRESHOLD = 500;

backend/
├── src/
│   ├── db/
│   │   └── connecting.ts        # Conexão com MongoDB
│   ├── models/
│   │   └── MovementModel.ts     # Modelo de dados
│   ├── routes/
│   │   └── sensor.ts            # Rotas da API
│   ├── service/
│   │   └── SensorService.ts     # Lógica de negócios
│   └── app.ts                   # Aplicação principal
├── .env                         # Variáveis de ambiente
└── package.json                 # Dependências do projeto

```

<br><br><br>

## 🌐 API Endpoints

### POST `/sensor`

Envia dados do sensor para o servidor.

**Request Body:**
```json
{
  "ldr": 650,
  "led": "verde",
  "servo": 0,
  "status": 1
}
```