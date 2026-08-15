import mongoose from "mongoose";
import dns from "node:dns";

const connect = () =>
  mongoose.connect(process.env.MONGODB_URI, { dbName: "careConnect" });

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Connection to MongoDB established! Welcome to CareConnect DB.")
  );

  try {
    await connect();
  } catch (error) {
    const isSrvDnsError =
      error?.syscall === "querySrv" &&
      ["ECONNREFUSED", "ETIMEOUT", "ESERVFAIL"].includes(error?.code);

    if (!isSrvDnsError) throw error;

    console.warn("Default DNS could not resolve MongoDB Atlas; retrying with public DNS.");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    await connect();
  }
};

export default connectDB;
