import { NextFunction, Response, Request } from "express";
import { User } from "../protocols/User";
import { verify } from "../utils/token";

export type CustomRequest = Request & {
  user?: User;
};

export function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send({ error: "header authorization not provided" });
  }

  const user = verify(token);

  if (!user) {
    res.status(401).send({ error: "invalid token" });
  }

  req.user = user as User;
  next();
}
