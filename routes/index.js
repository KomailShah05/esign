const app = module.exports = require('express')();

app.get('/status', (req, res) => {
  res.send({status: "online"});
});

app.use('/event', require("./event"));
//app.use('/new', require("./new/"));
app.use('/update', require("./update"));
app.use('/util', require("./util"));

app.all('*', (req, res) => {
  res.status(404).send({msg: 'not found'});
});
