import { connect, connection } from "mongoose";
import { MONGODB_URI } from "./config";

export async function connectToMongodb() {
  try{
    await connect(MONGODB_URI);
  }catch (err){
    console.log("ERROR",err);
  }
  }

  connection.on("connected", () => {
    console.log("Mongodb connected to:", connection.db.databaseName);
  });
    connection.on("error", (error) => {
    console.log("Error:", error);
  });

    connection.on("disconnected", () => {
    console.log("Mongodb disconnected");
  });
