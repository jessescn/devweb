import { Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import ImageRepository from "../repositories/image-repository";
export default class ImageController {
  constructor(private imageRepository: ImageRepository) {}

  async index(req: CustomRequest, res: Response) {
    const { $loki } = req.user;

    const images = this.imageRepository.find({ userId: $loki });

    return res.send(images);
  }

  async save(req: CustomRequest, res: Response) {
    const { $loki } = req.user;
    const { data } = req.body;

    const newImage = this.imageRepository.insert({
      userId: $loki,
      image: data,
    });

    return res.json(newImage);
  }

  async delete(req: CustomRequest, res: Response) {
    const { id } = req.params;

    const deletedImage = this.imageRepository.remove(parseInt(id));

    return res.json(deletedImage);
  }
}
