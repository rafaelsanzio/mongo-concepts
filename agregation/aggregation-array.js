/* $unwind - pull out the element of array */
/* $push - put the field that was set into an array */
/* $addToSet - same as put, but remove duplicates */
db.friends
  .aggregate([
    { $unwind: "$hobbies" },
    { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } },
  ])
  .pretty();

/* $slice - take parts of array and returning an array */
db.friends
  .aggregate([
    { $project: { _id: 0, examScore: { $slice: ["$examScores", 2, 1] } } },
  ])
  .pretty();

/* $size - calculate the size of array */
db.friends
  .aggregate([{ $project: { _id: 0, numScores: { $size: "$examScores" } } }])
  .pretty();

/* $filter - filtering with condition
 input - array to filter
 as - alias
 conf - condition */
db.friends
  .aggregate([
    {
      $project: {
        _id: 0,
        scores: {
          $filter: {
            input: "$examScores",
            as: "sc",
            cond: { $gt: ["$$sc.score", 60] },
          },
        },
      },
    },
  ])
  .pretty();

/* Many operators together */
/* Getting the higher score */
db.friends
  .aggregate([
    { $unwind: "$examScores" },
    { $project: { _id: 1, name: 1, age: 1, score: "$examScores.score" } },
    { $sort: { score: -1 } },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        maxScore: { $max: "$score" },
      },
    },
    { $sort: { maxScore: -1 } },
  ])
  .pretty();

/* $bucket - take data into a buckets categorize your data 
 groupBy - field
 boundaries - categories 
 output - diplay field at final */
db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: "$dob.age",
        boundaries: [18, 30, 40, 50, 60, 120],
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        },
      },
    },
  ])
  .pretty();

/* $bucketAuto - create conditions itself 
buckets - how many buckets do you like */
db.persons
  .aggregate([
    {
      $bucketAuto: {
        groupBy: "$dob.age",
        buckets: 5,
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        },
      },
    },
  ])
  .pretty();

/* other operators */
db.persons
  .aggregate([
    { $match: { gender: "male" } },
    {
      $project: {
        _id: 0,
        gender: 1,
        name: { $concat: ["$name.first", " ", "$name.last"] },
        birthdate: { $toDate: "$dob.date" },
      },
    },
    { $sort: { birthdate: 1 } },
    { $skip: 10 },
    { $limit: 10 },
  ])
  .pretty();

/* Same as above */
/* $out - writing result inside an new collection */
db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: "$dob.date" },
        age: "$dob.age",
        location: {
          type: "Point",
          coordinates: [
            {
              $convert: {
                input: "$location.coordinates.longitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: "$location.coordinates.latitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
            {
              $substrCP: [
                "$name.first",
                1,
                { $subtract: [{ $strLenCP: "$name.first" }, 1] },
              ],
            },
            " ",
            { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
            {
              $substrCP: [
                "$name.last",
                1,
                { $subtract: [{ $strLenCP: "$name.last" }, 1] },
              ],
            },
          ],
        },
      },
    },
    { $out: "transformedPersons" },
  ])
  .pretty();

/* $geoNear */
db.transformedPersons
  .aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [-18.4, -42.8],
        },
        maxDistance: 1000000,
        num: 10,
        query: { age: { $gt: 30 } },
        distanceField: "distance",
      },
    },
  ])
  .pretty();
