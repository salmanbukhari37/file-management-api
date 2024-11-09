// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const message = await authService.registerUser(username, password);
    res.status(201).send(message);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);
    res.json({ _token: token });
  } catch (error) {
    next(error);
  }
};
