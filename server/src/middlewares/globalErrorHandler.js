import ResponseGenerator from "../utils/ResponseGenerator";

const GlobalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json(
    ResponseGenerator.failure({
      code: err.status || 500,
      message: err.message,
      error: err,
    })
  );
};

export default GlobalErrorHandler;
