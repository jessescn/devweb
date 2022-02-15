import { Repository } from "./abstract-repository";

export default class ImageRepository extends Repository {
  constructor() {
    super("images");
  }
}
