// Storing cursor
const dataCursor = db.movies.find();

dataCursor.next();
dataCursor.hasNext();

dataCursor.forEach((doc) => {
  printjson(doc);
});

// Sorting cursor
// -1 des - 1 asc
db.movies.find().sort({ "rating.average": 1 });
db.movies.find().sort({ "rating.average": 1, runtime: -1 });

// skipping documents
db.movies.find().sort({ "rating.average": 1 }).skip(10);

// limit documents
db.movies.find().sort({ "rating.average": 1 }).skip(10).limit(10);

// projection - shape - returning the data of document that you need
// 0 exclude, 1 include on return
db.movies.find({}, { name: 1, genres: 1, runtime: 1, rating: 1 });
db.movies.find({}, { name: 1, genres: 1, runtime: 1, rating: 1, _id: 0 });

db.movies.find(
  {},
  { name: 1, genres: 1, runtime: 1, rating: 1, "schedule.time": 1 }
);

// projection in array
db.movies.find({ genres: "Drama" }, { "genres.$": 1 });
db.movies.find({ genres: { $all: ["Drama", "Horror"] } }, { "genres.$": 1 });

db.movies.find(
  { genres: "Drama" },
  { genres: { $elemMatch: { $eq: "Horror" } } }
);

// $slice
db.movies.find(
  { "rating.average": { $gt: 9 } },
  { genres: { $slice: 2 }, name: 1 }
);
db.movies.find(
  { "rating.average": { $gt: 9 } },
  { genres: { $slice: [1, 2] }, name: 1 }
);
