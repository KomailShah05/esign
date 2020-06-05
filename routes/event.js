const app = module.exports = require('express')();
const multer  = require('multer')
var upload = multer();
const db = require('../db')

app.post('/', upload.array(), (req, res, json) => {
  res.send("Hello API Event Received");

  let data = JSON.parse(req.body.json);
  console.log("received new signature event from API");
  console.log(data);

  if(data.event.event_type == "signature_request_signed"){
    console.log("signature signed");
    let sigId = data.signature_request.signature_request_id;
    console.log(sigId);

    db.collection("hazmat/cpq/signatures")
    .doc(sigId).get()
    .then(ref => {
      let data = ref.data();

      db.collection("hazmat/cpq/deals")
      .doc(data.deal).collection("quotes")
      .doc(data.id)
      .set({contract: {signed: true, signedOn: new Date() } }, {merge: true})
      .then( () => {
        res.json({status: "ok", deal: data.deal, id: data.id});
      } )
    })

    }
});