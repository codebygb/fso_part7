const jwt = require("jsonwebtoken");

function getToken(request, response, next) {
  delete request.token;
  delete request.userId;
  if (request.path === "/api/login" && request.method === "POST") {
    next();
    return;
  }
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    next({ name: "TokenError", message: "User not authorized.", code: 400 });
  }
  next();
}

const userExtactor = (request, response, next) => {
  const token = request.token;
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      request.userId = decodedToken.id;
      request.username = decodedToken.username;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getToken,
  userExtactor,
};
