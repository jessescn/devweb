import { Request, Response } from "express";
import database from "../db";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token";

const User = database.getCollection("users") || database.addCollection("users");

export default {
  async index(req: Request, res: Response) {
    const users = User.find();

    return res.json(users);
  },
  async create(req: Request, res: Response) {
    const user = req.body;

    const userExists = User.findOne({ email: user.email });

    if (userExists) {
      return res.json(userExists);
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return res.status(400).send();
      const newUser = User.insert({ ...user, password: hash });
      return res.json(newUser);
    });
  },
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400);

    const user = User.findOne({ email });

    if (!user) {
      return res.status(400).send();
    }

    const result = bcrypt.compareSync(password, user.password);

    const token = generateToken(user);

    if (result) return res.status(200).send({ token });

    return res.status(401).send();
  },
};
