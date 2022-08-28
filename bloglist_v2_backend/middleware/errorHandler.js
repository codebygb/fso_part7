const logger = require("../utils/logger");
const errorHandler = (error, _request, response, next) => {
  logger.error(error.name, error?.message, error?.code, error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "CastError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "MongoServerError" && error?.code === 11000) {
    return response.status(400).json({ error: "username already in use" });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  }
  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: error.message });
  }
  if (error.name === "TokenError") {
    return response.status(401).json({ error: error.message });
  }
  if (error.name === "SyntaxError") {
    return response
      .status(400)
      .json({ error: "invalid json or invalid token" });
  }
  next(error);
};

module.exports = { errorHandler };
