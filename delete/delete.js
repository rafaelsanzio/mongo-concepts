/* Delete One */
db.collection_name.deleteOne({ key: value });

/* Example */
db.users.deleteOne({ name: "Chris" });

/* Delete Many */
db.collection_name.deleteMany({ key: value });

/* Example */
db.users.deleteMany({ totalAge: { $gt: 30 }, isSporty: true });
db.users.deleteMany({ totalAge: { $exists: false }, isSporty: true });

/* Delete all entries in collection */
db.users.deleteMany({});

/* Delete the collection */
db.users.drop();

/* Delete the database */
db.dropDatabase();
