// 1 - getting all documents that have two genres in array
db.moviestarts.find({ genre: { $size: 2 } });

// 2 - find all document with aired in 2018
db.moviestarts.find({ "meta.aired": 2018 });

// 3 - find all documents with rating greater than 8 and less than 10
db.moviestarts.find({ ratings: { $elemMatch: { $gt: 8, $lt: 10 } } });
