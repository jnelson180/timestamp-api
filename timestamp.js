var express = require('express');
var app = express();
var query;
var months = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October",
  "November", "December"];

app.get('*', function (req, res) {
  // declare unix and natural inside get so they are new each time
  var unix = "";
  var natural = "";
  
  // GET URL string without '/'- but still with %20s, etc
  var uri_enc = String(req.url.substring(1));

  // IF URL IS STRING, DECODE URI TO STRING
  if (uri_enc.indexOf("%") > -1) {
     query = decodeURIComponent(uri_enc);
     console.log("query is " + query);
     natural = query;
     unix = (Date.parse(natural)) / 1000;
     console.log("unix is " + unix);
  }
  
  // ELSE USE NUMBER PASSED TO uri_enc
  else { 
  	query = Number(uri_enc); 
  	unix = query;
  	natural = conDate(unix);
  }
  
  console.log("Received a request for " + query);
  
  // CHECK IF 'query' CONTAINS A DATE
  var valid = new Date(query); 
  if (valid == "Invalid Date") {
  	console.log(JSON.stringify({ unix: null,  natural: null }))
    res.end(JSON.stringify({ unix: null,  natural: null }));
  }
  else {
    console.log(JSON.stringify({ unix: unix, natural: natural }));
    res.end(JSON.stringify({ unix: unix,  natural: natural }));
  }
});

app.listen(8080, function () {
  console.log('Timestamp microservice listening on port 8080!');
});

function conDate(thetime) {
  var tempDate = new Date(thetime * 1000);
  var month = months[tempDate.getMonth()];
  var day = tempDate.getDate();
  var year = tempDate.getFullYear();
  return(month + " " + day + ", " + year);
}