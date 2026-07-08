import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task_id: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
  },
  
);

const dailyLogSchema = new Schema(
  {
    date: { type: Date, required: true },
    tasks: { type: [taskSchema], default: [] },
    absence: { type: String, default: null },
  },
  
);

const weeklyLogSchema = new Schema(
  {
    internship_id: {
      type: Schema.Types.ObjectId,
      ref: "Intenships",
      required: true,
    },
    week_number: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Completado", "pendiente", "Cancelado"],
      default: "pendiente",
    },
    daily_logs: { type: [dailyLogSchema], default: [] },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "weeklyLogs",
  },
);

const WeeklyLog = mongoose.model("WeeklyLogs", weeklyLogSchema);

export default WeeklyLog;
