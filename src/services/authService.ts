// src/services/authService.ts
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (
  username: string,
  password: string
): Promise<string> => {
  // Check if user already exists
  const existingUser = (await User.findOne({ username })) as IUser | null;
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
  }) as IUser;

  // Save user to database
  await user.save();
  return "User registered successfully";
};

// Authenticate user and generate a JWT
export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  // Check if the user exists
  const user = (await User.findOne({ username })) as IUser | null;
  if (!user) {
    throw new Error("User not found");
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username }, // Payload
    process.env.JWT_SECRET as string, // Secret key
    { expiresIn: "1h" } // Token expiration
  );

  return token;
};
