import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema({
  experienceLevel: String,
  title: String,
  salary: String,
  companyName: String,
  url: String,
  publishedAt: String,
  id: String,
});

export default mongoose.models?.JobSchema ||
  mongoose.model("JobSchema", jobSchema);
