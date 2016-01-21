// set up ========================
	var express  = require('express');
	var app      = express();                               							// create our app w/ express
	var mongoose = require('mongoose');													// mongoose for mongodb
	var Schema = mongoose.Schema;
	var morgan = require('morgan');             										// log requests to the console (express4)
	var bodyParser = require('body-parser');    										// pull information from HTML POST (express4)
	var methodOverride = require('method-override'); 									// simulate DELETE and PUT (express4)
	var fs = require('fs');
	var Grid = require('gridfs-stream');
	var multer  = require('multer');


	app.use('/uploads', express.static(__dirname + '/uploads'));
	app.use(multer({dest: './uploads/'}))

	Grid.mongo = mongoose.mongo;

	mongoose.connect('mongodb://localhost:27017/details');
	var conn = mongoose.connection;

	conn.once('open', function () {
	    console.log('open');
	    var gfs = Grid(conn.db);
	 
	    // streaming to gridfs
	    //filename to store in mongodb
	    var writestream = gfs.createWriteStream({
	        filename: 'mongo_file.txt'
	    });
	    fs.createReadStream('/public/sourcefile.txt').pipe(writestream);
	 
	    writestream.on('close', function (file) {
	        // do something with `file`
	        console.log(file.filename + 'Written To DB');
	    });

	    //write content to file system
		var fs_write_stream = fs.createWriteStream('write.txt');
		 
		//read from mongodb
		var readstream = gfs.createReadStream({
		     filename: 'mongo_file.txt'
		});
		readstream.pipe(fs_write_stream);
		fs_write_stream.on('close', function () {
		     console.log('file has been written fully!');
		});
	});


	app.listen(8000);
	console.log("App listening on port 8000");