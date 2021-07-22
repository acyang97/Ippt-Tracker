import mongoose from "mongoose";
import config from "config";

const db: string = config.get("mongoURI");

export const connectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
