const { info } = require("../utils/logger");

const requestLogger = (request, response, next) => {
  info("Time", new Date().toISOString());
  info("Method:", request.method);
  info("Path:  ", request.path);
  // info("Headers:", request.headers);
  info("Body:  ", request.body);
  info("---");
  next();
};

module.exports = requestLogger;
