const {MongoClient} = require('mongodb');

const mongoURL = 'mongodb+srv://smarttool:smarttool@smart-tool.ejimy.mongodb.net/SmartTool?retryWrites=true&w=majority'
const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err){
    if (err) throw err;
    else console.log("connected");
});
module.exports = client;