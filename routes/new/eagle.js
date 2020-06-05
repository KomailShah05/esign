const app = module.exports = require('express')();
const hellosign = require('hellosign-sdk')({key: '716e224a390c9fd95840b9c82e50638389d408504635295529733141c4f654a5'});

app.post('/', function(req, res){
    let post = req.body;

    console.log(post);
    
    let opts = {
      test_mode: 1,
      clientId: 'dad04e2f07e609c35a9ac66fba86444a',
      template_id: 'ef1c57493e70f90c654fe2303932886c5934c6f2',
      subject: 'Eagle Purchase Agreement',
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