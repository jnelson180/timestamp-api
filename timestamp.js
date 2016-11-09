var express = require('express');
var app = express();
var query;
// still have to get rid of needing to use query /?
app.get('', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  // GET URL WITHOUT '/?'
  var uri_enc = String(req.url.substring(2));
  
  // IF URL IS STRING, DECODE URI TO STRING
  if (uri_enc.indexOf("%") > -1) {
     query = decodeURIComponent(uri_enc);
  }
  
  // ELSE USE NUMBER PASSED TO uri_enc
  else { query = Number(uri_enc); }
  
  console.log(query);
  
  // CHECK IF 'query' CONTAINS A DATE
  var valid = new Date(query); 
  console.log(valid);
  
  if (valid == "Invalid Date") {
    res.send(JSON.stringify({ unix: null,  natural: null }));
  }
  else {
    res.send("Good date format received.");
  }
  res.send(query);
  
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

// NOTE: regex for natural date code ([A-Z]\w+%[0-9]\w+,%[0-3]{2}[0-9]{4})/g