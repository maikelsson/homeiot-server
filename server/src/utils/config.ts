require("dotenv").config();

const PORT = process.env.PORT || 3001;
const TOKEN = process.env.INFLUX_TOKEN || "";
const URI = process.env.INFLUX_URI || "";
const BUCKET = process.env.INFLUX_BUCKET || "";
const ORG = process.env.INFLUX_ORG || "";

export default {
  PORT,
  TOKEN,
  URI,
  BUCKET,
  ORG,
};
