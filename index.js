const express = require('express');
const app = express();
const fetch = require('node-fetch');

function getCryptos(code) {
	return fetch('https://api.nexchange.io/en/api/v1/currency/')
		.then(cryptoData => cryptoData.json())
		.then(cryptoData => {
			return code ? cryptoData.filter(crypto => crypto.code == code) : cryptoData;
		})
		.catch(err => console.log(err));
}
app.get('/', (req, res) => {
	const code = req.query.code;
	console.log(code);
	getCryptos(code)
		.then(cryptoData => {
			res.render('home', { cryptoData: cryptoData });
		})
		.catch(err => console.log(err));
});

app.set('view engine', 'ejs');

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
