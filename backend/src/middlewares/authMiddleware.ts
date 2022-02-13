import { NextFunction, Response } from "express";
import { verify } from "../utils/token";

export function authMiddleware(req, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send({ error: "header authorization not provided" });
  }

  const user = verify(token);

  if (!user) {
    res.status(401).send({ error: "invalid token" });
  }

  req.user = user;
  next();
}
