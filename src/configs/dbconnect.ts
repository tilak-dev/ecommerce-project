import mongoose from "mongoose";

type ConnectObject = {
  isConnected?: number;
};

const connection: ConnectObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("db is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log(db);
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
    console.log("db is connected");
  } catch (error) {
    console.log("error in db connection", error);
  }
}


export default dbConnect;//have to learn about this 