import crypto from "crypto";
import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  await User.create(
    {
      username: "admin1",
      password: "admin1",
      displayName: "admin1",
      token: crypto.randomUUID(),
      role: "admin",
    },
    {
      username: "admin2",
      password: "admin2",
      displayName: "admin2",
      token: crypto.randomUUID(),
      role: "admin",
    },
    {
      username: "admin3",
      password: "admin3",
      displayName: "admin3",
      token: crypto.randomUUID(),
      role: "admin",
    }
  );

  await db.close();
};

void run();
