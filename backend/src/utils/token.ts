import jwt from "jsonwebtoken";

export function generateToken(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: 90 * 60 * 60 * 24,
  });
}

export function verify(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
