"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var PORT = process.env.PORT || 3001;
var TOKEN = process.env.INFLUX_TOKEN || "";
var URI = process.env.INFLUX_URI || "";
var BUCKET = process.env.INFLUX_BUCKET || "";
var ORG = process.env.INFLUX_ORG || "";
exports.default = {
    PORT: PORT,
    TOKEN: TOKEN,
    URI: URI,
    BUCKET: BUCKET,
    ORG: ORG,
};
