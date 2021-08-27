/* connecting with auth */
//$ mongod --auth
// mongo -u username -p password
// mongo -u username -p password --authenticationDatabase admin

/* Create User */
db.createUser({
  user: "username",
  pwd: "password",
  roles: ["userAdminAnyDatabase"],
});

/* To authorize */
db.auth("username", "password");

/* Logout */
db.logout();

/* Update User */
db.updateUser("username", { roles: ["types"] });

/* SSL */
//openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
