const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./app");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
const mongodb = require("./app");

require('./Routes/Route.js')(app);
console.log(port);
app.listen(port, () => console.log("running on port 5000"));
// app.get("/login", function (req, res) {
//   mongodb.connect().then((user) => {
//     const db = user.db("smart-tool");
//     const collection = db.collection("User");
//     collection
//       .find({ emailId: req.body.emailId, password: req.body.password })
//       .toArray()
//       .then((result) => {
//         console.log(result);
//         if (result.length) {
//           res(result);
//         } else {
//           res(null, { success: false, message: "incorrect email or password" });
//         }
//       });
//   });
// });

//module.exports(app);
