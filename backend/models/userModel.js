import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name value"],
    },
    email: {
      type: String,
      required: [true, "please add a email value"],
    },
    password: {
      type: String,
      required: [true, "please add a password value"],
    },
  },
  { timestamp: true }
);

export default mongoose.model("User", userSchema);
