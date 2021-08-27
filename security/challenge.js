/* use admin */
db.createUser({
  user: "rafel",
  pwd: "rafael",
  roles: ["userAdminAnyDatabase"],
});

db.auth("rafael", "rafael");

/* user database admin */
db.createUser({
  user: "globalAdmin",
  pwd: "admin",
  roles: ["dbAdminAnyDatabase"],
});

/* developer user */
db.createUser({
  user: "dev",
  pwd: "dev",
  roles: [
    { role: "readWrite", db: "customers" },
    { role: "readWrite", db: "sales" },
  ],
});
