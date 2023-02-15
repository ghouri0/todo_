import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    item: String,
    create: String,
    comp: String,
    status: String,
  });

export default mongoose.model("Todo", todoSchema);