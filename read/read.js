/* findOne */
db.collection_name.findOne();

/* Exemplo */
db.movies.findOne();

/* find */
db.collection_name.find();

/* Exemplo */
db.movies.find();

/* Working with filters */
db.collection_name.find({ key: value });

/* Exemplo */
db.movies.find({ name: "The Last Ship" }); // using like this mongo is looking for equality
db.movies.findOne({ name: "The Last Ship" }); // using like this mongo is looking for equality, but just the first one

/* Operators */

// $eq - equivalent
db.movies.find({ runtime: { $eq: 60 } });
// $ne - non-equivalent
db.movies.find({ runtime: { $ne: 60 } });
// $gt - greater than
db.movies.find({ runtime: { $gt: 60 } });
// $gte - greater than or equal
db.movies.find({ runtime: { $gte: 60 } });
// $lt - less than
db.movies.find({ runtime: { $lt: 60 } });
// $lte - less than or equal
db.movies.find({ runtime: { $lte: 60 } });

// for embbeed documents
db.movies.find({ "rating.average": { $gt: 7 } });
// for array field
db.movies.find({ genres: "Drama" }); // check if value exists in array
db.movies.find({ genres: ["Drama"] }); // check if key is equals to value

// $in
db.movies.find({ runtime: { $in: [30, 42] } });
// $nin
db.movies.find({ runtime: { $nin: [30, 42] } });

// $or
db.movies.find({
  $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
});
// $nor
db.movies.find({
  $nor: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
});

// $and
db.movies.find({
  $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }],
});
db.movies.find({
  "rating.average": { $gt: 9 },
  genres: "Drama",
});

// $not
db.movies.find({ runtime: { $not: { $eq: 60 } } });
// same as
db.movies.find({ runtime: { $ne: 60 } });

// $exists - check if a key exists in documents
db.users.find({ age: { $exists: true } });
db.users.find({ age: { $exists: true, $gte: 30 } });
db.users.find({ age: { $exists: true, $ne: null } });

// $type - check the documents that have a key of the type selected
db.users.find({ phone: { $type: "number" } });
db.users.find({ phone: { $type: ["number", "string"] } });

// $regex - search for a text with regular expression - not good with performance
db.movies.find({ summary: { $regex: /musical/ } });

// $expr - compare two fields inside a document
db.sales.find({ $expr: { $gt: ["$volume", "$target"] } }); // check if volume is greater than target
// $conditions - if
db.sales.find({
  $expr: {
    $gt: [
      {
        $cond: {
          if: { $gte: ["$volume", 190] },
          then: { $subtract: ["$volume", 10] },
          else: "$volume",
        },
      },
      "$target",
    ],
  },
});

/* Querying arrays */

db.users.find({ "hobbies.title": "Sports" }); // use path to search

// $size - value of size should be the exactly number
db.users.find({ hobbies: { $size: 3 } });

// $all - order does not matter when you are using
db.moviestarts.find({ genre: { $all: ["action", "thriller"] } });

// $elemMatch - searching in array of documents satisfiyng the conditions, looking at all in array
db.users.find({
  hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } },
});
