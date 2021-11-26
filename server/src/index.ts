import express, { Application } from "express";
import { client } from "./db/influx";
import MqttHandler from "./mqtt/handler";
import config from "./utils/config";

const app: Application = express();

const handler = new MqttHandler();

const PORT = 3000;

app.get("/", async (req, res) => {
  const queryApi = client.getQueryApi(config.ORG);
  const fluxQuery = `from(bucket:"my-bucket") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "DHT11-LDR")`;
  queryApi
    .collectRows(fluxQuery)
    .catch((err) => {
      console.log(err);
    })
    .then((data) => {
      res.json({ data });
    });
});

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
  handler.connect();
});
