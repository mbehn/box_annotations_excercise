/*
	- Require in the dependencies
*/
const BoxSDK = require('box-node-sdk');
const express = require('express');
const mustacheExpress = require('mustache-express');

/*
	 - Setting the express instance for our server with express().
*/
let app = express();

/*
	- Setting the port for the application
*/
let port = process.env.PORT || 8080;

/* 
	 - Set Templating Engine engine of our express instance (app) to mustacheExpress()
*/
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

/*
	- Set the views directory, where our static .mustache files will live.
*/

app.set('views', './views');

/*
	- Set the static files directory. This while hold any Javascript (.js) or CSS files (.css)
*/
app.use(express.static('static'));

/*
	- Assign your example file IDs to variables. Feel free to add any other example files here and assign them to a unique variable.s	
*/
const wrdFileId = '<YOUR_WORD_FILE_ID>';
const pptFileID = '<YOUR_PPT_FILE_ID>';
const xlsFileID = '<YOUR_EXCEL_FILE_ID>';

/* ###################### Setup the Box SDK ######################*/


// Initialize an instance of the Box SDK with the Client ID
const sdk = new BoxSDK({
	clientID: '<CLIENT_ID>',
	clientSecret: ''
});

// Set the Application Token as a variable

const appToken = '<APP_TOKEN>';

let client = sdk.getBasicClient(appToken);

// Annotator token options

let options = {
	actor: {
		id: '123456',
		name: '<YOUR_NAME>'
	}
};

/*
	- Setup Views and their logic.
*/
app.get('/', (req, res) => {
	res.render('index');
});

// Set the scopes for Token Exchange

/*
	- We will use the exchangeToken() method from the Node SDK to get our Annotator Token
*/

const scopes = '';

// Word File
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

// PowerPoint file

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

// Excel file

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