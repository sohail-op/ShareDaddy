const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  const constant = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.json({
        Title: "Validation Error",
        Message: err.message,
        StackTrace: err.stackTrace,
      });
      break;

    case constant.UNAUTHORIZED:
      res.json({
        Title: "Unauthorized",
        Message: err.message,
        StackTrace: err.stackTrace,
      });
      break;

    case constant.FORBIDDEN:
      res.json({
        Title: "Forbidden",
        Message: err.message,
        StackTrace: err.stackTrace,
      });
      break;

    case constant.NOT_FOUND:
      res.json({
        Title: "Not found",
        Message: err.message,
        StackTrace: err.stackTrace,
      });
      break;

    case constant.SERVER_ERROR:
      res.json({
        Title: "Server Error",
        Message: err.message,
        StackTrace: err.stackTrace,
      });
      break;

    default:
      console.log("No Error, Every Thing Working Fine");

      break;
  }
};

export default errorHandler;
