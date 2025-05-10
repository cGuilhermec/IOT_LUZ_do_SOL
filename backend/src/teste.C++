#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Servo.h>

// Wi-Fi
const char* ssid = "GUILHERME-NOTE";
const char* password = "123456789";

// URL do backend
const char* serverUrl = "http://192.168.137.1:3000/sensor";

// Pinos
const int ldrPin = A0;         // Sensor LDR
const int ledRedPin = D5;      // LED vermelho
const int ledGreenPin = D6;    // LED verde
const int servoPin = D4;       // Servo motor

Servo myServo;

void setup() {
  Serial.begin(115200);

  pinMode(ldrPin, INPUT);
  pinMode(ledRedPin, OUTPUT);
  pinMode(ledGreenPin, OUTPUT);

  myServo.attach(servoPin);

  // Apaga os LEDs
  digitalWrite(ledRedPin, LOW);
  digitalWrite(ledGreenPin, LOW);

  // Conexão Wi-Fi
  Serial.println("Conectando ao Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado!");
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  String ledStatus;
  int servoPos;
  int statusGeral;

  if (ldrValue > 500) {
    // Ambiente escuro
    Serial.println("Ambiente escuro");
    digitalWrite(ledRedPin, LOW);
    digitalWrite(ledGreenPin, HIGH);
    ledStatus = "verde";
    statusGeral = 1;

    servoPos = 0;
    myServo.write(servoPos);
  } else {
    // Ambiente claro
    Serial.println("Ambiente claro");
    digitalWrite(ledRedPin, HIGH);
    digitalWrite(ledGreenPin, LOW);
    ledStatus = "vermelho";
    statusGeral = 0;

    servoPos = 180;
    myServo.write(servoPos);
  }

  // Envia dados para o backend
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{";
    json += "\"ldr\":" + String(ldrValue) + ",";
    json += "\"led\":\"" + ledStatus + "\",";
    json += "\"servo\":" + String(servoPos) + ",";
    json += "\"status\":" + String(statusGeral);
    json += "}";


    Serial.println("Enviando JSON:");
    Serial.println(json);

    int httpCode = http.POST(json);
    Serial.print("Código de resposta HTTP: ");
    Serial.println(httpCode);

    http.end();
  } else {
    Serial.println("Wi-Fi desconectado, tentando reconectar...");
    WiFi.begin(ssid, password);
  }

  delay(5000); // Envia a cada 5 segundos
}
