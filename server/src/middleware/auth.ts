import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
  id: number;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: verify the token exists and add the user data to the request object
  // Get token from authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "acess token required" });
  }

  // Verify token
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        console.error("JWT Verification Error: ", err.message);
        return res.status(403).json({ message: "Invalid or expired token " });
      }
      // Attach decoded payload
      req.user = decoded as JwtPayload;

      return next();
    }
  );
  return;
};
