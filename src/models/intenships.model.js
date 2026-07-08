import mongoose from "mongoose";
const Schema = mongoose.Schema;

const internshipSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    company_name: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "completed", "canceled"],
      default: "active",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "intenships",
  },
);



const Internship = mongoose.model("Intenships", internshipSchema);

export default Internship;
