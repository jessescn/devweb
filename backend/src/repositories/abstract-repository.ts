import { Collection } from "lokijs";
import database from "../db";

export abstract class Repository {
  private db: Collection;

  constructor(databaseName: string) {
    this.db =
      database.getCollection(databaseName) ||
      database.addCollection(databaseName);
  }

  find(query?: any) {
    return this.db.find();
  }

  findOne(query?: any) {
    return this.db.findOne(query);
  }

  insert(value: any) {
    return this.db.insert(value);
  }

  remove(id: number) {
    return this.db.remove(id);
  }
}
