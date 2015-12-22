// set up ========================
	var express  = require('express');
	var app      = express();                               							// create our app w/ express
	
	var mongoose = require('mongoose');													// mongoose for mongodb
	var Schema = mongoose.Schema;
	
	var autoIncrement = require('mongoose-auto-increment');	
	
	var morgan = require('morgan');             										// log requests to the console (express4)
	var bodyParser = require('body-parser');    										// pull information from HTML POST (express4)
	var methodOverride = require('method-override'); 									// simulate DELETE and PUT (express4)
	
	var multer  = require('multer');
	
	
	

// configuration =================

	var connection = mongoose.createConnection('mongodb://localhost:27017/details');     // connect to mongoDB database locally
	
	autoIncrement.initialize(connection);
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './public/uploads')
		},
		filename: function (req, file, cb) {
			//cb(null, file.fieldname + '-' + Date.now())
			cb(null, "ZBR-" + file.originalname)
		}
	});

	var upload = multer({ storage: storage });

	app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
	app.use(morgan('dev'));                                         // log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
	app.use(bodyParser.json());                                     // parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());

// define schema =================
var customerPropertiesSchema = new Schema({
	text : String,
	phone: Number,
	first_name: String,
	last_name: String,
	dob: String,
	address: String,
	photoId: Number
});

	

// define model =================
    var CUSTOMER_PROPERTIES = connection.model('CUSTOMER_PROPERTIES', customerPropertiesSchema, 'customer_properties');
	
	customerPropertiesSchema.plugin(autoIncrement.plugin, { 
	model: 'CUSTOMER_PROPERTIES', 
	field: 'photoId',
	startAt: 1001
});
	

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/customer_properties', function(req, res) {

        // use mongoose to get all todos in the database
        CUSTOMER_PROPERTIES.find(function(err, customer_properties) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(customer_properties); // return all todos in JSON format
        });
    });
	

    // create todo and send back all todos after creation
    app.post('/api/customer_properties', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        CUSTOMER_PROPERTIES.create({
            text : req.body.text,
			phone : req.body.phone,
			first_name : req.body.first_name,
			last_name : req.body.last_name,
			dob : req.body.dob,
			address : req.body.address
        }, function(err, customer_property) {
            if (err)
                res.send(err);
	
            // get and return all the todos after you create another
            CUSTOMER_PROPERTIES.find(function(err, customer_properties) {
                if (err)
                    res.send(err)
                res.json(customer_properties);
            });
        });

    });
	
	app.post('/upload', upload.single('file'), function(req, res){
		console.log(req.body);
		console.log(req.file);
		res.json({success: true});
	});

    // delete a todo
    app.delete('/api/customer_properties/:customer_properties_id', function(req, res) {
        CUSTOMER_PROPERTIES.remove({
            _id : req.params.customer_properties_id
        }, function(err, customer_properties) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            CUSTOMER_PROPERTIES.find(function(err, customer_properties) {
                if (err)
                    res.send(err)
                res.json(customer_properties);
            });
        });
    });
	
	
	
// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// listen (start app with node server.js) ======================================
	app.listen(8000);
	console.log("App listening on port 8000");