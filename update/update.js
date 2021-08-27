/* Update One */
db.collection_name.updateOne({ key: value }, { $set: { key: value } }); // first param Criteria | second param fields to update

/* Example */
db.users.updateOne(
  { _id: ObjectId("60e339ab50f5a0ed526dd53a") },
  {
    $set: {
      hobbies: [
        { title: "Sports", frequency: 5 },
        { title: "Cooking", frequency: 3 },
        { title: "Hiking", frequency: 1 },
      ],
    },
  }
);

/* Update Many */
db.collection_name.updateMany({ key: value }, { $set: { key: value } }); // first param criteria | second param fields to update

/* Example */
db.users.updateMany(
  { "hobbies.title": "Sports" },
  {
    $set: {
      isSporty: true,
    },
  }
);

/* $set just change many field that you want */

/* Incrementing  - you cannot inc and set the same field*/
db.collection_name.updateOne({ key: "value" }, { $inc: {}, $set?: {} });

/* Example */
db.users.updateOne({ name: "Manuel" }, { $inc: {age: 1}});

/* Operators */

/* $min - update if the values is lower than currently value */
db.users.updateOne({ name: "Chris" }, { $min: {age: 35}});

/* $max - update if the value is greater then the currently value */
db.users.updateOne({ name: "Chris" }, { $max: {age: 38}});

/* mul - multiple the value that you put */
db.users.updateOne({ name: "Chris" }, { $mul: {age: 1.1}});

/* unset - drop field */
db.users.updateMany({ isSporty: true }, { $unset: {phone: ""}});

/* rename */
db.users.updateMany({}, { $rename: {age: "totalAge"}});

/* upsert */
db.users.updateOne({name:"Maria"}, {$set: {age: 29, hobbies: [{title: "Good food", frequency: 3}], isSporty: true}}, {upsert: true});

/* Updating an element into an array */
db.users.updateMany({hobbies: {$elemMatch: {title: "Sports", frequency: {$gte:3}}}}, {$set: {"hobbies.$.highFrequency": true}})

/* Updating all documents in array */
db.users.updateMany({"hobbies.frequency": {$gt: 2}}, {$set: {"hobbies.$.goodFrequency": true}}) // just the first match
db.users.updateMany({totalAge: {$gt: 30}}, {$inc: {"hobbies.$[].frequency": -1 }}) // for all elements in array

/* Finding and updating specific field */
db.users.updateMany({"hobbies.frequency": {$gt: 2}}, {$set: {"hobbies.$[el].goodFrequency": true}}, {arrayFilters: [{"el.frequency": {$gt: 2}}] })

/* Adding elements to array */
db.users.updateOne({name: "Maria"}, {$push: {hobbies: {title: "Sports", frequency: 4}}})
db.users.updateOne({name: "Maria"}, {$push: {hobbies: {$each: [{title: "Sports", frequency: 4}, {title: "Hiking", frequency: 2}], $sort: {frequency: -1}, $slice: 1}}})

/* Removing elements to array */
db.users.updateOne({name: "Maria"}, {$pull: {hobbies: {title: "Hiking"}}})
db.users.updateOne({name: "Maria"}, {$pull: {hobbies: {title: "Good Wine"}}})

db.users.updateOne({name: "Chris"}, {$pop: {hobbies: 1}})

/* $addToSet - similar to push, however does not duplicate */
db.users.updateOne({name: "Maria"}, {$addToSet: {hobbies: {title: "Hiking", frequency: 2}}})