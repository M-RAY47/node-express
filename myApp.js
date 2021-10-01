var express = require('express');
var app = express();

console.log("Hello World");
app.get("/", (req, res)=> {
	res.sendFile(__dirname + "/views/index.html");
})
// Implement the midlleware functions to print the method, the path and the ip
app.use((req,res,next)=>{
	let {method, path, ip} =req;
	let str = req.method + " " + req.path + " - " + req.ip;
	console.log(str);
	next();
})

// mount the full path of the style.css file
app.use("/public", express.static(__dirname + "/public"));


// Creating a REST API 
app.get("/json", (req, res)=> {
	res.json({
		"message": process.env["MESSAGE_STYLE"] == "uppercase" ? 
		"Hello json".toUpperCase()
		:  "Hello json"
	});
})
// Chaining two midwares function together app.METHOD(path, midware)
app.get("/now", (req, res, next)=> {
	req.time = new Date().toString();
	next();
},
	(req, res)=> {
		res.send({time: req.time});
	
})































 module.exports = app;
