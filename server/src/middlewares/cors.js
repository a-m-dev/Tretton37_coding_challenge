const CorsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("X-Powered-By", "@amdev");
  res.header("X-XSS-Protection", 0);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.header === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");

    return res.status(200).json({
      message: "__OK__",
    });
  }

  next();
};

export default CorsMiddleware;
