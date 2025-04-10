import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface JwtPayload {
  username: string;
  id: number; // Include user ID for potential future use
}

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Password doesn't match
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ token });
    return;
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login" });
    return;
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
