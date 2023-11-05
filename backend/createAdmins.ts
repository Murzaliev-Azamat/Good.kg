import crypto from "crypto";
import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  // try {
  //   await db.dropCollection("users");
  //   console.log("Success drop collections users...");
  // } catch (e) {
  //   console.log("Collections were not present, skipping drop...");
  // }

  await User.create(
    {
      username: "Azamat",
      password: "12345",
      displayName: "Aza",
      token: crypto.randomUUID(),
    },
    {
      username: "Adilet",
      password: "333",
      displayName: "Adik",
      token: crypto.randomUUID(),
      role: "admin",
    },
    {
      username: "Azamat",
      password: "12345",
      displayName: "Aza",
      token: crypto.randomUUID(),
      role: "admin",
    },
    {
      username: "Yo",
      password: "12345",
      displayName: "Aza",
      token: crypto.randomUUID(),
      role: "admin",
    },
    {
      username: "Adilet",
      password: "333",
      displayName: "Adik",
      token: crypto.randomUUID(),
      role: "admin",
    }
  );

  await db.close();
};

void run();
