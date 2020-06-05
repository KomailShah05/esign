const app = module.exports = require('express')();
const hellosign = require('hellosign-sdk')({key: 'f8bfbc4614bfe9a27a2d3dc30470134b1e14c7f817d68f21cae350269e8da1a4'});
const axios = require("axios")

const key = "36caa352-c560-4083-9576-2c0b44f14f51";

const Hubspot = require('hubspot')
const hubspot = new Hubspot({ 
  apiKey: key,
  checkLimit: false 
})


app.get('/contact/for/deal/:deal', (req, res) => {
    let deal = req.params.deal;

    axios
      .get(`https://api.hubapi.com/crm-associations/v1/associations/${deal}/HUBSPOT_DEFINED/3?hapikey=${key}`)
      .then( response => {
        if(response.data.results > 0){
          let id = response.data.results[0];

          axios.get(`https://api.hubapi.com/contacts/v1/contact/vid/${id}/profile?hapikey=${key}`)
          .then( contactRes => {
            res.json(contactRes.data);
          })
          .catch(err => {
            console.log(err);
            res.json({error: true, msg: err});
          });

          
        } else {
          res.json({error: true, msg: "no results"});
        }
      })
      .catch(err => {
        console.log(err);
        res.json({error: true, msg: err});
      })
      .finally( () => {
        
      });
})