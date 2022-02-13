import loki from "lokijs";

const database = new loki("example.db", {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000,
});

export default database;
