/* Getting people older than 50
  Groupping by gender and getting the number of persons
  Getting as well an average of age 
  Sorting by field that I created in group */
db.persons
  .aggregate([
    { $match: { "dob.age": { $gt: 50 } } },
    {
      $group: {
        _id: { gender: "$gender" },
        numPersons: { $sum: 1 },
        avgAge: { $avg: "$dob.age" },
      },
    },
    { $sort: { numPersons: -1 } },
  ])
  .pretty();
