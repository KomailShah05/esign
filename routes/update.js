const app = module.exports = require('express')();

app.post('/order/:id/contract', function(req, res){
    let id = req.params.id;
    let data = req.body;

    // This might be where want to send an email notification?

    console.log("new contract sent to "+id);

    res.type('json');
    res.send("new contract sent to "+id);
    
});