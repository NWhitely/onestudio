import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Check if the JWT cookie exists
    const token = req.cookies?.jwt ? JSON.parse(req.cookies.jwt).jwt : null;
    if (!token) {
      return res.status(401).json({ error: "You are not authenticated!" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid!" });
      }

      // Attach user information to the request
      req.user = { id: payload?.userId };
      next();
    });
  } catch (error) {
    return res.status(400).json({ error: "Invalid request format." });
  }
};

export const verifyTokenAndRole = (requiredRole) => (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "You do not have the required permissions!" });
    }
    next();
  });
};