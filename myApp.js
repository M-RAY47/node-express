var express = require('express');
var app = express();

console.log("Hello World");
app.get("/", (req, res)=> {
	res.sendFile(__dirname + "/views/index.html");
})

// mount the full path of the style.css file
app.use("/public", express.static(__dirname + "/public"));
// Server the styles.css file
app.use(express.static(__dirname + "/public/style.css"));

// Creating a REST API 
app.get("/json", (req, res)=> {
	res.json(
		process.env["MESSAGE_STYLE"] === "uppercase" ? "Hello json" : "Hello json".toUpperCase()
	);
})




































 module.exports = app;
