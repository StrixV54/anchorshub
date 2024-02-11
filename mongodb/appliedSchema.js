import mongoose, { Schema } from "mongoose";

const appliedSchema = new mongoose.Schema({
  experienceLevel: String,
  title: String,
  salary: String,
  companyName: String,
  url: String,
  publishedAt: String,
  id: String,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.models?.AppliedSchema ||
  mongoose.model("AppliedSchema", appliedSchema);
