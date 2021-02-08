import mongoose from "mongoose";
import RegExManager from "../../utils/RegExManager";

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: RegExManager.emailRegex },
  phoneNumber: { type: String, required: true },
  office: { type: String, default: "Lund" },
  tagLine: { type: String, default: null },
  manager: { type: String, required: true, match: RegExManager.emailRegex },
  orgUnit: { type: String, required: true, default: "/Employees" },
  mainText: { type: String, required: true, default: "No Profile Description" },
  gitHub: { type: String },
  twitter: { type: String },
  stackoverflow: { type: String },
  linkedIn: { type: String },
  imagePortraitUrl: { type: String, required: true },
  imageBodyUrl: { type: String },
  imageWallOfLeetUrl: { type: String },
  highlighted: { type: Boolean, required: true, default: false },
});

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
export const propSocial = ["gitHub", "twitter", "linkedIn", "stackoverflow"];
