import mongoose from "mongoose";
import RegExManager from "../../utils/RegExManager";

const employeeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      match: RegExManager.emailRegex,
      unique: true,
      required: true,
    },
    phoneNumber: { type: String },
    office: { type: String, default: "Lund" },
    tagLine: { type: String, default: null },
    manager: { type: String, match: RegExManager.emailRegex },
    orgUnit: { type: String, required: true, default: "/Employees" },
    mainText: {
      type: String,
      default: "No Profile Description",
    },
    gitHub: { type: String },
    twitter: { type: String },
    stackOverflow: { type: String },
    linkedIn: { type: String },
    imagePortraitUrl: { type: String },
    imageBodyUrl: { type: String },
    imageWallOfLeetUrl: { type: String },
    highlighted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    retainKeyOrder: true,
  }
);

export const EmployeeModel = mongoose.model("Employee", employeeSchema);
export const propMini = [
  "name",
  "email",
  "office",
  "phoneNumber",
  "imagePortraitUrl",
  "highlighted",
];
export const propImages = [
  "imagePortraitUrl",
  "imageBodyUrl",
  "imageWallOfLeetUrl",
  "highlighted",
];
export const propSocial = ["gitHub", "twitter", "linkedIn", "stackOverflow"];
