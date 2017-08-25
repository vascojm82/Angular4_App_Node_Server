'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// Log an error if the connection fails
Mongoose.connection.on('error', error => {
	console.log('error', 'Mongoose connection error: ' + error);
});

// Create a Schema that defines the structure for storing post data
const postSchema = new Mongoose.Schema({
	userId: Number,
	id: Number,
	title: String,
	body: String
});

// Create a Schema that defines the structure for reading comments data
const commentsSchema = new Mongoose.Schema({
	postId: Number,
	id: Number,
	name: String,
	email: String,
	body: String
});

// Turn the schema into a usable model
let postModel = Mongoose.model('post', postSchema);
let commentModel = Mongoose.model('comment', commentsSchema);

module.exports = {
	Mongoose,
	postModel,
	commentModel
}
