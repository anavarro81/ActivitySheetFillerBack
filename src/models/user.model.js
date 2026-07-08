import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true },
    dni: { type: String },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("Users", userSchema);

export default User;
