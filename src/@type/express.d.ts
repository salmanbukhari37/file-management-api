import express from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: any; // You can replace `any` with a more specific type if you know the shape of `user`
      user?: JwtPayload | string;
    }
  }
}
