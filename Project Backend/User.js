const { response } = require("express");
var mongodb = require("./app.js");

exports.login = (req, res) => {
  mongodb.connect().then((user) => {
    console.log(req.body.emailId + " " + req.body.password);
    const db = user.db("SmartTool");
    const collection = db.collection("User");
    collection
      .findOne({ emailId: req.body.emailId, password: req.body.password })
      .then((result) => {
        console.log(result);
        if (result) {
          res.status(200).json({
            success: true,
            message: result,
          });
        } else {
          res
            .status(200)
            .json({ success: false, message: "incorrect email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.changePassword = (req, res) => {
  mongodb.connect().then((user) => {
    console.log(req.body.emailId + " " + req.body.password);
    const db = user.db("SmartTool");
    const collection = db.collection("User");
    collection
      .findOneAndUpdate(
        { emailId: req.body.emailId, password: req.body.password },
        { $set: { password: req.body.newPassword } },
        { upsert: false }
      )
      .then((result) => {
        console.log(result);
        if (result.lastErrorObject.updatedExisting) {
          res.status(200).json({
            success: true,
            message: result,
          });
        } else {
          res
            .status(200)
            .json({ success: false, message: "error occured while inserting User" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
exports.register = (req, res) => {
  const emailId = req.body.emailId;
  const confirmEmail = req.body.confirmEmailId;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  mongodb.connect().then((user) => {
    console.log(req.body.emailId + " " + req.body.password);
    const db = user.db("SmartTool");
    let collection = db.collection("User");
    if (emailId === confirmEmail && password === confirmPassword) {
      collection
        .insertOne({ emailId: emailId, password: password, companyName: req.body.companyName })
        .then((result) => {
          console.log(result);
          if (result) {
            collection = db.collection("CompanyDetails");
          collection
            .insertOne({ companyName: req.body.companyName, numberOfEmployees : req.body.numberOfEmployees, avgSalary : req.body.avgSalary})
            .then((response) => {
              console.log(response);
              if (response) {
                res.status(200).json({
                  success: true,
                  message: {result, response},
                });
              } else {
                res
                  .status(200)
                  .json({
                    success: false,
                    message: "error occured while inserting company details",
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
          } else {
            res
              .status(200)
              .json({ success: false, message: "incorrect email or password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

exports.InsertRevenueDetails = (req, res) => {
  mongodb.connect().then((user) => {
    console.log(req.body.emailId + " " + req.body.password);
    const db = user.db("SmartTool");
    const collection = db.collection("RevenueDetails");
    collection
            .insertOne({ companyName: req.body.companyName, revenue : req.body.revenue, date: Date(req.body.date), productOperationCost: req.body.productOperationCost,
            officeRelatedCost: req.body.officeRelatedCost, wageCost: req.body.wageCost, marketingCost: req.body.marketingCost,
            otherCost: req.body.otherCost, clientsGained: req.body.clientsGained, clientsLossed: req.body.clientsLossed  })
            .then((response) => {
              console.log(response);
              if (response) {
                res.status(200).json({
                  success: true,
                  message: {response},
                });
              } else {
                res
                  .status(200)
                  .json({
                    success: false,
                    message: "error occured while inserting company details",
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
  });
};