import ResponseGenerator from "../utils/ResponseGenerator";
import ValidationTypes from "../constants/ValidationTypes";
import RequestFailureReasons from "../constants/RequestFailureReasons";

const DataValidator = (schema, parseType) => {
  return (req, res, next) => {
    let dataToParse = null;

    switch (parseType) {
      case ValidationTypes.BODY:
        dataToParse = req.body;
        break;

      case ValidationTypes.PARAM:
        dataToParse = req.PARAM;
        break;

      case ValidationTypes.BODY_PARAM:
        dataToParse = { ...req.params, ...req.body };
        break;

      default:
        dataToParse = req.body;
        break;
    }

    const { valid, error } = schema.validate(dataToParse);

    console.log(`
      [SERVER:DATA_VALIDATOR]: ${JSON.stringify({ valid, error }, null, 2)}
    `);

    if (error !== undefined) {
      const errorMessage =
        error.hasOwnProperty("details") &&
        error.details.map((item) => item.message).join(", ");

      return res.status(422).json(
        ResponseGenerator.failure({
          code: 422,
          reason: RequestFailureReasons.VALIDATION_ERROR,
          message: errorMessage,
          error,
        })
      );
    } else next();
  };
};

export default DataValidator;
