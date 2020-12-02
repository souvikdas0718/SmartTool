const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/team8-smart-tool'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/team8-smart-tool/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);