import * as express from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: any, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "user not allowed to perform this action" });
  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(token, accessToken, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Something happened, try again later" });
    req.user = user;
    next();
  });
}
