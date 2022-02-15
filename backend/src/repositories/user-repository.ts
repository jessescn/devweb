import { Repository } from "./abstract-repository";

export default class UserRepository extends Repository {
  constructor() {
    super("users");
  }
}
