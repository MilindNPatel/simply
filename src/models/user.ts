import { Schema, model } from "mongoose";
import { CONSTANTS } from "../enum";

const userSchema: Schema = new Schema(
  {
    fn: { type: String }, //  Full Name
    un: { type: String }, //  User Name
    email: { type: String }, // Email
    pwd: { type: String }, // Password
    role: {
      type: String,
      enum: [
        CONSTANTS.ROLE.SUPER_ADMIN,
        CONSTANTS.ROLE.ADMIN,
        CONSTANTS.ROLE.USER,
      ],
      default: "USER",
    },
    add: { type: String }, // Address
    token: { type: String },
    expTime: { type: Number },
    isActive: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }, // soft delete
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
