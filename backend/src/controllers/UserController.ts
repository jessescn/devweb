import { Request, Response } from "express";
import { generateToken } from "../utils/token";
import UserRepository from "../repositories/user-repository";
import { compare, encrypt } from "../utils/encrpt";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async index(req: Request, res: Response) {
    const users = this.userRepository.find();

    return res.json(users);
  }

  async register(req: Request, res: Response) {
    const user = req.body;

    const userExists = this.userRepository.findOne({ email: user.email });

    if (userExists) {
      return res.json(userExists);
    }

    const hash = await encrypt(user.password);

    const newUser = this.userRepository.insert({
      ...user,
      password: hash,
    });

    return res.json(newUser);
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).send();

      const user = this.userRepository.findOne({ email });

      if (!user) {
        return res.status(404).send();
      }

      const result = await compare(password, user.password);

      if (!result) {
        return res.status(401).send();
      }

      const token = generateToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      console.warn(error);
      return res.status(500).send();
    }
  }
}
