// Packages
const router = require("express").Router();
const Config = require('../../config/config');

//Mongoose Schemas
const mongoose = require("mongoose");
const Text = require('../../models/texts.js');


router.post('/comment', (req, res, next) => {
	console.log("post/comment")
	console.log(req.body)

	return true
})




module.exports = router;
