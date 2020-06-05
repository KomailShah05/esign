const admin = require("firebase-admin");
const serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://usbuildings-be784.firebaseio.com"
});

var db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

module.exports = db;