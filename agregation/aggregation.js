/* Aggregate */
db.collection_name.aggregate([
  { $match: { key: value } },
  {
    $group: {
      _id: { keyToGroup: valueToGroup },
      fieldToDisplay: { $operation: value },
    },
  },
  { $sort: { keyToSort: value } },
]);

/* Exemple */

/* $match */
db.persons.aggregate([{ $match: { gender: "female" } }]);

/* $group */
db.persons.aggregate([
  { $match: { gender: "female" } },
  {
    $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } },
  },
]);

/* $sort */
db.persons.aggregate([
  { $match: { gender: "female" } },
  {
    $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } },
  },
  { $sort: { totalPersons: -1 } },
]);

/* $project */
db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        //birthdate: { $convert: { input: "$dob.date", to: "date" } }, correct as well
        birthdate: { $toDate: "$dob.date" }, // shortcut
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
    {
      $group: {
        _id: { birthYear: { $isoWeekYear: "$birthdate" } },
        numPersons: { $sum: 1 },
      },
    },
    { $sort: { numPersons: -1 } },
  ])
  .pretty();
