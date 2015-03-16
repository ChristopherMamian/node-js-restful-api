var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

var Client = require('./app/models/client');

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Its happening!');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to my api!'});
});

router.route('/clients')
	.post(function(req, res) {
		var client = new Client();
		client.name = req.body.name;
		client.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Client created'});
		});
	});

	.get(function(req, res){
		Client.find(function(err, clients){
			if (err)
				res.send(err);

			res.json(clients);
		});
	});

router.route('/clients/:client_id')

	.get(function(req, res){
		Client.findById(req.params.client_id, function(err, client) {
			if (err)
				res.send(err);
			res.json(client);
		});
	});

	.put(function(req, res){
		Client.findById(req.params.client_id, function(err, client){

			if (err)
				res.send(err);

			client.name = req.body.name;

			client.save(function(err){
				if (err)
					res.send(err);
				res.json({message: 'Client updated'});
			});
		});
	});

	.delete(function(req, res){
		Client.remove({
			_id: req.params.client_id
		}, function(err, client){
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted'});
		});
	});

app.use('/api', router);

app.listen(port);
console.log('The good stuff happens on port ' + port);
