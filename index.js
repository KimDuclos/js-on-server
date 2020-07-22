const express = require('express'); // require express in app
const app = express(); // app is express as a function
const fetch = require("node-fetch");

function getCryptos(code) {
    return fetch('https://api.nexchange.io/en/api/v1/currency/')
        .then(cryptoData => cryptoData.json())
        .then(cryptoData => {
            return cryptoData.filter(crypto => crypto.code == code); // remember filter syntax => if crypto.code = code, return that data
        })        
        .catch(err => console.log(err));
}
app.get('/', (req, res) => {
    const code = req.query.code; // set code to requested code from API 
    getCryptos(code)  // call getCryptos function
        .then(cryptoData => {  // render home.ejs with filtered data from function
            res.render('home', { cryptoData: cryptoData });
        })
        .catch(err => console.log(err))
});

app.listen(3000, () => {
	// app is listening on port 3000 and using function handleIndexRequest
	console.log('Example app listening on port 3000!');
});

app.set('view engine', 'ejs'); // app calls ejs dependency
