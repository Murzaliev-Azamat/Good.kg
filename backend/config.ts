import path from "path";
import * as dotenv from "dotenv";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";

dotenv.config({ path: envFile });

const rootPath = __dirname;

const config = {
  port: parseInt(process.env.PORT || "8000"),
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: process.env.MONGO_DB || "mongodb://127.0.0.1:27017/lirog",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
};

export default config;
