/* Sessions */
const session = db.getMongo().startSession();
/* Starting transaction */
session.startTransaction();
/* Storing collection into a variable */
const usersCol = session.getDatabase("database_name").collection_name;
/* You can do any operations with constant that was create with collection. It won't effect the real data */
usersCol.deleteMany();

/* Finishing transaction OK */
session.commitTransaction();
/* Aborting changes made into transaction */
session.abortTransaction();
