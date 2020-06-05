const app = module.exports = require('express')();

app.use('/psg', require("./psg"));
app.use('/eagle', require("./eagle"));
app.use('/cci', require("./cci"));
app.use('/saferoom', require("./saferoom"));
app.use('/test', require("./test"));