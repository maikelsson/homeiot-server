"use strict";

import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { hostname } from "os";
import { SensorItem } from "../types/types";
import config from "../utils/config";

export const client = new InfluxDB({ url: config.URI, token: config.TOKEN });

export const items: any[] = [];

export const writeData = async (payload: SensorItem) => {
  const { data, name } = payload;
  console.log("hostname: ", hostname());

  const writeApi = client.getWriteApi(config.ORG, config.BUCKET, "ms");
  writeApi.useDefaultTags({ location: hostname() });
  const point = new Point(name)
    .tag(name, "write")
    .floatField("temperature", data.temperature)
    .floatField("brightness", data.brightness)
    .floatField("humidity", data.humidity);
  writeApi.writePoint(point);

  writeApi
    .close()
    .then(() => {
      console.log("finished!");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getData = async () => {
  const queryApi = client.getQueryApi(config.ORG);
  const result: any[] = [];
  const fluxQuery = `from(bucket:"my-bucket") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "DHT11-LDR")`;
  queryApi
    .collectRows(fluxQuery)
    .catch((err) => {
      console.log(err);
    })
    .then((data) => {
      data?.forEach((x) => {
        result.push(x);
      });
    });

  return result;
  // console.log("*** QUERY ROWS ***");
  // const fluxObserver = {
  //   next(row: string[], tableMeta: FluxTableMetaData) {
  //     const o = tableMeta.toObject(row);
  //     items.push(o);
  //   },
  //   error(error: Error) {
  //     console.error(error);
  //   },
  //   complete() {
  //     console.log("Finished success!");
  //   },
  // };

  // const rows = queryApi.queryRows(fluxQuery, fluxObserver);
  // console.log("rows", rows, result);
};
