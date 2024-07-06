import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

async function baseConnection() {
  await mongoose.connect(uri);
}

function connect() {
  return baseConnection().then(() => {
    console.log("Connected to MongoDB");
  }
  ).catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });
}

export default connect;