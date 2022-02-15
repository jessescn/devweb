import Loki from "lokijs";

const database = new Loki("paint.db", {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000,
  persistenceMethod: "fs",
});

export default database;
