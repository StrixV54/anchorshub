import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coin: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models?.UserSchema ||
  mongoose.model("UserSchema", userSchema);
