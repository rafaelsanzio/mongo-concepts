/* Create a new collection and upsert two new documents */
db.sports.updateMany(
  {},
  { $set: { title: "Soccer", requiresTeam: true } },
  { upsert: true }
);

db.sports.updateMany(
  { title: "Running" },
  { $set: { requiresTeam: false } },
  { upsert: true }
);

/* Update all documents adding the min */
db.sports.updateMany({ requiresTeam: true }, { $set: { minPlayers: 11 } });

/* Update all documents increasing */
db.sports.updateMany({ requiresTeam: true }, { $inc: { minPlayers: 10 } });
