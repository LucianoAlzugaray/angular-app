var path = require('path');
var InsuranceServices = require('./insurances.services');

/*
  FindAll
  Devuelve a todos los seguros
*/
module.exports.findAll = function(req, res, next) {
  console.log('1');
  InsuranceServices.getAll().then(data => {
    if(data){
      console.log(data);
      res.json(data);
    }else{
      res.send('No hay datos')
    }
    
  }).catch(err =>{
    console.log(err);
    res.end();
  })

}
