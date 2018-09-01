var request = require('request');
const INSURANCES_DATA_URL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5'
var userService = require(__srcpath + '/user/user.services');

module.exports.getAll = function() {
  console.log(2);
  return new Promise( function (resolve, reject) {
    getAllInsurances().then(insurances => {
      completeUsers(insurances).then( completeData => {
        resolve(completeData);
      });  
    }).catch(err => {
      reject(err);
    });
  })
}

const getAllInsurances = function () {
  return new Promise(function (resolve, reject) {
    request(INSURANCES_DATA_URL, { json: true } ,(err, response, body) => {
      if (err) {
          reject(err)
      } else {
        console.log('pasa')
        resolve(body.policies)
      }
    });
  });
}

function completeUsers(insurances){
  return new Promise(function (resolve, reject) {
    userService.getAll().then(clientList => {    
      for (insurance in insurances){
        for (client in clientList)
          if (clientList[client].id == insurances[insurance].clientId){
            insurances[insurance].userName = clientList[client].name;
          }
      }
      resolve(insurances);
    }).catch(err => reject(err));
  })
}