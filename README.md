# Box View + Annotations Example
A simple app made with the the Box Node SDK and Box View with Annotations

## Machine Setup
- Download and install [Sublime Text 3](https://www.sublimetext.com/3) if you don't already have it. Feel free to use your Text Editor of choice.
- Make a new Box View App (App Token) Token Application in your preferred Box demo account
- Install [Node.js](https://nodejs.org/en/download/)
- The installation of Node.js includes NPM which is the package manager for Node applications
  - Make sure to check Node is installed by running the terminal command: node -v
  - If a version number is returned, you're good. If you get an error that the command couldn't be found, try installing again

## Box Application Setup

1. Login to your Box Developer console
2. Create a new App Token Application
3. Generate a new App Token and save it somewhere
4. In the CORS domains configuration add <code>localhost:8080</code>

## Box View Application Setup

1. Open terminal and navigate to the project folder box_annotations_excercise. If you saved the folder to your Desktop then enter `cd ~/Desktop/box_annotations_excercise`
2. Install node dependencies with npm - `npm install --save express mustache-express box-node-sdk`
3. Open the box_annotations_excercise folder in Sublime text (or your preferred text editor)
4. Replace the variable placeholders in the app.js file

File ID:
```
const wrdFileId = 'YOUR_WORD_ID';
const pptFileID = 'YOUR_PPT_ID';
const xlsFileID = 'YOUR_EXCEL_ID';`
```
Client ID and App Token

```
// Initialize an instance of the Box SDK with the Client ID
const sdk = new BoxSDK({
	clientID: 'YOUR_CLIENT_ID',
	clientSecret: ''
});

// Set the Application Token as a variable

const appToken = 'YOUR_APP_TOKEN';

let client = sdk.getBasicClient(appToken);
```
Your Name (for Annotations)
```
let options = {
	actor: {
		id: '123456',
		name: 'Matt Behn'
	}
};
```

Scopes for the token, at least include item_preview and annotation_edit
```
const scopes = 'item_preview item_download annotation_edit';
```

5. In Terminal, in the box_annotations_excercise folder, run `node app` to start the app. You should get a message that the application is running on localhost:8080
6. Open localhost:8080 and you should be able to click the links to view your files and annotate!
