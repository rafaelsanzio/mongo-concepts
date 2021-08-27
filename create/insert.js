/* Insert One */
db.collection_name.insertOne({ key: value });

/* Exemplo */
db.persons.insertOne({
  name: "Rafael",
  age: 26,
  hobbies: ["Sports", "Cooking"],
});

/* Insert Many */
db.collection_name.insertMany([{ key: value }]);

/* Examplo */
db.persons.insertMany([
  {
    name: "Rafael",
    age: 26,
    hobbies: ["Sports", "Cooking"],
  },
  { name: "Ana", age: 35, hobbies: ["Cooking"] },
  { name: "Maria", age: 35 },
]);

/* Insert - não recomendado */
db.collection_name.insert([{ key: value }]); // Many
db.collection_name.insert({ key: value }); // One

/* Exemplo */
db.persons.insert({
  name: "Rafael",
  age: 26,
});

/* Ordered */
db.collection_name.insertMany([{ key: value }], { ordered: false }); // insert everything till error.

/* Write Concern */
db.collection_name.insertOne({ key: value }, { writeConcern: { w: 0 } });
// w means write and the value the number of instances you are using 1 is default
db.collection_name.insertOne(
  { key: value },
  { writeConcern: { w: 0, j: false } }
);
// j of journal like a to-do file
db.collection_name.insertOne(
  { key: value },
  { writeConcern: { w: 0, j: false, wtimeout: 1 } }
);
// wtimeout: 1 is default

/* Atomicity */
//Like transaction to garantee that the data was inserted or rollback

/* Mongo Import */
/* 
    $ mongoimport file.json -d DB_NAME -c COLLECTION_NAME --jsonArray --drop
    Exemplo:
    $ mongoimport tv-shows.json -d movieData -c movies --jsonArray --drop 
*/
