// import data boxoffice.json
// $mongoimport boxoffice.json -d boxOffice -c moviestarts --drop --jsonArray

//getting the documents that the meta -> rating is greater than 9 AND meta -> runtime is lower than 100
db.moviestarts.find({
  "meta.rating": { $gt: 9 },
  "meta.runtime": { $lt: 100 },
});

// getting the documents that the genre includes drama or action
db.moviestarts.find({ $or: [{ genre: "drama" }, { genre: "action" }] });

// getting the documents that the number of visitors field is greater than expectedVisitors
db.moviestarts.find({ $expr: { $gt: ["$visitors", "$expectedVisitors"] } });
