const NoRouteMatch = (req, res, next) => {
  const err = new Error("Route Not Fount Error");
  err.status = 404;

  next(err);
};

export default NoRouteMatch;
