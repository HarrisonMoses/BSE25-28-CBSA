#include <SoftwareSerial.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// ---------- NPK SENSOR SETUP ----------
#define RE 8
#define DE 7
const byte npk[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x03, 0x65, 0xcd};
byte values[11];
SoftwareSerial mod(10, 11);

// ---------- TEMPERATURE SENSOR SETUP ----------
#define ONE_WIRE_BUS 14
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
float Celsius = 0;
float Fahrenheit = 0;

// ---------- MOISTURE SENSOR SETUP ----------
#define MOISTURE_PIN A0  // Pin connected to the analog output of the capacitive sensor

void setup() {
  // NPK setup
  Serial.begin(9600);
  mod.begin(4800);
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);
  delay(500);

  // Temperature sensor setup
  sensors.begin();
}

void loop() {
  // ---------- NPK SENSOR READ ----------
  int nitrogen_val = 0, phosphorus_val = 0, potassium_val = 0;
  if (readNPK()) {
    nitrogen_val   = (values[3] << 8) | values[4];
    phosphorus_val = (values[5] << 8) | values[6];
    potassium_val  = (values[7] << 8) | values[8];

    Serial.print("Nitrogen: ");
    Serial.print(nitrogen_val);
    Serial.println(" mg/kg");

    Serial.print("Phosphorus: ");
    Serial.print(phosphorus_val);
    Serial.println(" mg/kg");

    Serial.print("Potassium: ");
    Serial.print(potassium_val);
    Serial.println(" mg/kg");
  }

  // ---------- TEMPERATURE READ ----------
  sensors.requestTemperatures();
  Celsius = sensors.getTempCByIndex(0);
  Fahrenheit = sensors.toFahrenheit(Celsius);

  Serial.print("Temperature: ");
  Serial.print(Celsius);
  Serial.print(" °C  ");
  Serial.print(Fahrenheit);
  Serial.println(" °F");

  // ---------- MOISTURE READ ----------
  int moistureLevel = analogRead(MOISTURE_PIN);
  Serial.print("Soil Moisture Level: ");
  Serial.println(moistureLevel);  // Print the moisture level (0-1023)

  Serial.println("------------------------------------------------");

  delay(1000);  // Delay between full readings
}

bool readNPK() {
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);

  if (mod.write(npk, sizeof(npk)) == 8) {
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    mod.flush();

    unsigned long start = millis();
    while (mod.available() < 11 && (millis() - start) < 1000); // wait max 1s

    if (mod.available() >= 11) {
      for (byte i = 0; i < 11; i++) {
        values[i] = mod.read();
      }
      return true;
    }
  }
  return false;
}
