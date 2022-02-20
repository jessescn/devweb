import Loki from "lokijs";

const database = new Loki("paint.db", {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
});

const collections = ["users", "images"];

function databaseInitialize() {
  for (const key in collections) {
    const collection = database.getCollection(key);
    if (collection === null) {
      database.addCollection(key);
    }
    runProgramLogic(key);
  }
}

// example method with any bootstrap logic to run after database initialized
function runProgramLogic(collectionName) {
  const entryCount = database.getCollection(collectionName).count();
  console.log("number of entries in database : " + entryCount);
}

export default database;
