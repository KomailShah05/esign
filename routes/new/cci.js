const app = module.exports = require('express')();
// Original key used
//const hellosign = require('hellosign-sdk')({key: 'f8bfbc4614bfe9a27a2d3dc30470134b1e14c7f817d68f21cae350269e8da1a4'});
const hellosign = require('hellosign-sdk')({key: '716e224a390c9fd95840b9c82e50638389d408504635295529733141c4f654a5'});

app.post('/', function(req, res){
    let post = req.body;

    console.log(post);
    
    let opts = {
      test_mode: 1,
      // Orininal clientId used
      //clientId: 'f32ba3bc527060803f3753f8baf1b312',
      clientId: 'dad04e2f07e609c35a9ac66fba86444a',
      template_id: '5a047640fadd0209e3376db05f843982bdc07c58',
      subject: 'Carolina Carport Purchase Agreement',
      message: 'Please sign this agreement to complete your purchase!',
      signers: [
        {
          email_address: 'mrkdean028@gmail.com',
          name: post.name,
          role: 'Buyer'
        }
      ],
      custom_fields: post.fields
    };

    data = {};

    hellosign.signatureRequest.createEmbeddedWithTemplate(opts)
        .then(function(response){
            data = response;
            let signatureId = response.signature_request.signatures[0].signature_id;
            return hellosign.embedded.getSignUrl(signatureId);
        })
        .then(function(response){
            data = response.embedded;
        })
        .catch(function(err){
            data = err;
        })
        .finally(function(){
            res.type('json');
            res.json(data);
        });
});