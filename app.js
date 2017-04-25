
var express = require('express')
var http = require("http");
var path = require("path");
var db = require('./db');
var dbLink=require("./json/config.json");
var url = dbLink.devServer.url;
var app = express();
var handlebars=require("express-handlebars").create({defaultLayout:"main"});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
var publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));

app.use(require('./routers/getMenuItems'));
app.use(require('./routers/getOrders'));
app.use(require('./routers/popMenu'));
app.use(require('./routers/processOrders'));
app.use(require('./routers/signupServer'));

db.connect(url, function(err) {
	if (err) {
		console.log('Unable to connect to Mongo.');
		process.exit(1)}
	else {
		var listener=http.createServer(app).listen(process.env.PORT||3000);
		console.log('Server is listening at port'+listener.address().port);
	};
});

app.get('/', function (req, res) {
	console.log("Coming a request!");
	res.sendFile(`${publicPath}/main.html`);
});

app.get('/main', function (req, res) {
	console.log("Coming a main request!");
	res.sendFile(`${publicPath}/main.html`);
});

app.get('/menu', function (req, res) {
	console.log("Coming a menu request!");
	res.sendFile(`${publicPath}/menu.html`);
});

app.get('/cart', function (req, res) {
	console.log("Coming a cart request!");
	res.sendFile(`${publicPath}/cart.html`);
});

app.get('/signup', function (req, res) {
	console.log("Coming a signup request!");
	res.sendFile(`${publicPath}/signup.html`);
});
