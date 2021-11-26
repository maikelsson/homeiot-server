import mqtt, { MqttClient } from "mqtt";
import { writeData } from "../db/influx";

class MqttHandler {
  public mqttClient?: MqttClient;
  host: string = "broker.hivemq.com";
  port: number = 1883;
  topic: string = "node/test";

  public async connect() {
    this.mqttClient = mqtt.connect({
      clientId: "test-id",
      clean: false,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
      protocol: "mqtt",
      host: this.host,
    });

    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient?.end();
    });

    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected to topic: ${this.topic}`);
    });

    this.mqttClient.subscribe(this.topic, { qos: 0 });

    this.mqttClient.on("message", async function (topic, message) {
      const payloadObj = JSON.parse(message.toString());
      // console.log("message payload: ", payloadObj);
      console.log(payloadObj);

      if (payloadObj.name === "DHT11-LDR") {
        await writeData(payloadObj);
      }
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }
}

export default MqttHandler;
