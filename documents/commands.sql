/* Use database */
use database_name

/* Insert into collection */
db.collection_name.insertOne(data)

db.collection_name.insertMany([data])

/* Return all documents in collection */
db.collection_name.find({filter}, {projection})
db.collection_name.findOne({filter})
db.collection_name.find({filter}).pretty()

/* Update */
db.collection_name.updateOne({filter}, {$set: {criteria} })
db.collection_name.updateMany({filter}, {$set: {criteria} })

db.collection_name.replaceOne()

/* Delete */
db.collection_name.deleteOne({filter})
db.collection_name.deleteMany({filter})

/* Lookup - Aggregate */
db.collection_name.aggregate({$lookup: {from: collection_name, localField: collection_name, foreignField: "_id", as: alias_name}})