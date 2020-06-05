const app = module.exports = require('express')();
const hellosign = require('hellosign-sdk')({key: 'f8bfbc4614bfe9a27a2d3dc30470134b1e14c7f817d68f21cae350269e8da1a4'});

app.post('/', function(req, res){
    let post = req.body;

    post.template = "6a9a4ae9c6fd8b5d726c9aa7ace87796fd7c21d9";

    console.log(post.email);

    let opts = {
      test_mode: 1,
      clientId: 'f32ba3bc527060803f3753f8baf1b312',
      template_id: post.template,
      subject: 'US Safe Room Purchase Agreement',
      message: 'Please sign this agreement to complete your purchase!',
      signers: [
        {
          email_address: post.email,
          name: post.name,
          role: 'Customer'
        }
      ],
      custom_fields: post.fields
    };

    hellosign.signatureRequest.sendWithTemplate(opts).then((response) => {
        res.type('json');
        res.json(response);
    }).catch((err) => {
        res.type('json');
        res.json(err);
    });


})