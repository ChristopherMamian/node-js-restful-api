var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to my api!'});
});

app.use('/api', router);

app.listen(port);
console.log('The good stuff happens on port ' + port);
