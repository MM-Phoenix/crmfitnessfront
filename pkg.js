const execSync = require('node:child_process').execSync;
const path = require('node:path');
const http = require('http-server');
const packageJson = require('./package.json');

// Inform that App is running
console.log(`Running App ${packageJson.name}. Version: ${packageJson.version}`);

// Specify the options for the server
const options = {
    root: path.join(__dirname, 'dist'),  // our project directory here is ./dist, change at will
    port: 8080,  // Port number, change at will
};

// Create the server
const server = http.createServer(options);

// Define the shell command to open Google Chrome programatically, depening on the OS we are on
const shellCommand = process.platform === "win32"
    ? `start chrome http://localhost:${options.port}` // on Windows
    : `open -a "Google Chrome" http://localhost:${options.port}`; // on Mac

// Start the Server and open Chrome
server.listen(options.port, () => {
    execSync(shellCommand);
    console.log(`Server is running on http://localhost:${options.port}`);
    console.log(`Do not close this terminal window as long as you run the app.`);
});