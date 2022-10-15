const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    dsa_score: {
      type: Number,
      required: true,
    },
    webdev_score: {
      type: Number,
      required: true,
    },
    react_score: {
      type: Number,
      required: true,
    },
    placement_status: {
      type: String,
      enum: ["Placed", "Not placed"],
      required: true,
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
