import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDb connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;
