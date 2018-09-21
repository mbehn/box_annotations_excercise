const BoxSDK = require('box-node-sdk');
const express = require('express');
const mustacheExpress = require('mustache-express');

let app = express();
let port = process.env.PORT || 8080;

// Set app engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
// Set Views Directory
app.set('views', './views')
// Set static directory
app.use(express.static('static'));

const wrdFileId = '<YOUR_WORD_FILE_ID>';
const pptFileID = '<YOUR_PPT_FILE_ID>';
const xlsFileID = '<YOUR_EXCEL_FILE_ID>';

let scopes = "item_preview annotation_edit";

const sdk = new BoxSDK({
	clientID: '<CLIENT_ID>',
	clientSecret: ''
});

const appToken = '<CLIENT_SECRET>';

let client = sdk.getBasicClient(appToken);

let options = {
	actor: {
		id: '123456',
		name: '<YOUR_NAME>'
	}
};

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/boxviewword', (req, res) => {
client.exchangeToken(scopes, `https://api.box.com/2.0/files/${wrdFileId}`, options)
	.then(tokenInfo => {
		token = tokenInfo.accessToken;
		res.render('boxviewword', {
			fileId: wrdFileId,
			token: token
		})
	})
});

app.get('/boxviewppt', (req, res) => {
client.exchangeToken(scopes, `https://api.box.com/2.0/files/${pptFileID}`, options)
	.then(tokenInfo => {
		token = tokenInfo.accessToken;
		res.render('boxviewppt', {
			fileId: pptFileID,
			token: token
		})
	})
});

app.get('/boxviewxls', (req, res) => {
client.exchangeToken(scopes, `https://api.box.com/2.0/files/${xlsFileID}`, options)
	.then(tokenInfo => {
		token = tokenInfo.accessToken;
		res.render('boxxls', {
			fileId: xlsFileID,
			token: token
		})
	})
});

app.listen(port,() => {
	console.log(`Listening on localhost:${port}`);
});