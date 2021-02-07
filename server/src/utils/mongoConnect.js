import mongoose from "mongoose";
import AppConfig from "./AppConfig";

const Connect = (options = {}) => {
  return mongoose.connect(
    `${AppConfig.mongoDB_URI}/${AppConfig.DBName}?authSource=admin`,
    {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      ...options,
    }
  );
};

export default Connect;
