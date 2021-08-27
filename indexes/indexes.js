/* Import data from persons.json
$ mongoimport persons.json -d contactData -c contacts --jsonArray
*/

/* Explain - find, update, delete */
db.collection_name.explain().find({ key: value });

/* Example */
db.contacts
  .explain()
  .find({ "dob.age": { $gt: 60 } })
  .pretty();

db.contacts
  .explain("executionStats")
  .find({ "dob.age": { $gt: 60 } })
  .pretty();

/* Create Index */
db.collection_name.createIndex({ key: value });

/* Example */
db.contacts.createIndex({ "dob.age": 1 });
db.contacts.createIndex({ gender: 1 });

/* Drop Index */
db.collection_name.dropIndex({ key: value });

/* Example */
db.contacts.dropIndex({ "dob.age": 1 });

/* Compound Index */
db.collection_name.createIndex({ key: value, key: value });

/* Example */
db.contacts.createIndex({ "dob.age": 1, gender: 1 });

/* Index for sorting - example */
db.contacts.explain().find({ "dob.age": 35 }).sort({ gender: 1 });

/* default Index */
db.collection_name.getIndexes();

/* Config index */
db.collection_name.createIndex({ key: value }, { unique: true });

/* Example */
db.contacts.createIndex({ email: 1 }, { unique: true });

/* Partial index */
db.collection_name.createIndex(
  { key: value },
  { partialFilterExpression: { field } }
);

/* Example */
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
);

db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { "dob.age": { $gt: 60 } } }
);

db.users.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);

/* Time-To-Live Index */
db.collection_name.createIndex({ key: value }, { expireAfterSeconds: "time" }); // remove the data after expiration

/* Example */
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 });

/* All plans execution */
db.collection_name.explain("allPlansExecution").find({ key: value });

/* Text index */
db.collection_name.createIndex({ key: "text" });
db.collection_name.createIndex({ key: "text", key2: "text" });

/* Example */
db.products.find({ $text: { $search: "awesome" } });
db.products.find({ $text: { $search: '"awesome book"' } });

/* default_language */
db.collection_name.createIndex(
  { key: "text" },
  { default_language: "language" }
);

/* Example */
db.products.createIndex(
  { title: "text", description: "text" },
  { default_language: "english", weights: { title: 1, description: 10 } }
);

db.products.find(
  { $text: { $search: "red" } },
  { score: { $meta: "textScore" } }
);

/* Using credit db and ratings collection */
/* Building index - credit-rating.js */
