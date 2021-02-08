import Joi from "@hapi/joi";
import RegExManager from "../utils/RegExManager";

const createEmployeeValidator = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string()
    .email({
      allowUnicode: false,
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .pattern(RegExManager.emailRegex)
    .message({ "any.required": "Email is Required" }),
  phoneNumber: Joi.string().pattern(RegExManager.phoneNumberRegex).allow(null),
  office: Joi.string().trim(),
  tagLine: Joi.string().allow(null),
  manager: Joi.string()
    .email({
      allowUnicode: false,
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .allow(null)
    .pattern(RegExManager.emailRegex)
    .message({ "any.required": "Managers Email is Required" }),
  orgUnit: Joi.string().allow(null),
  mainText: Joi.string().allow(null),
  gitHub: Joi.string().uri().allow(null),
  twitter: Joi.string().uri().allow(null),
  stackOverflow: Joi.string().uri().allow(null),
  linkedIn: Joi.string().allow(null),
  imagePortraitUrl: Joi.string().allow(null),
  imageBodyUrl: Joi.string().allow(null),
  imageWallOfLeetUrl: Joi.string().allow(null),
  highlighted: Joi.boolean(),
});

export default createEmployeeValidator;
