import { Response } from "express";
import database from "../db";

const Image =
  database.getCollection("images") || database.addCollection("images");

export default {
  async index(req, res: Response) {
    const user = req.user;
    const allImages = Image.find({ userId: user.$loki });
    return res.status(200).send(allImages);
  },
  async save(req, res: Response) {
    const user = req.user;
    const { data } = req.body;

    const savedImage = Image.insert({ userId: user.$loki, image: data });

    return res.send(savedImage);
  },
};
