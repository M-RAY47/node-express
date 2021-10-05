var express = require('express');
var app = express();
 //import body-parser
 let bodyParser = require('body-parser');

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

app.get("/:word/echo", (req,res) => {
	//creating the params
	let {word} = req.params;
	res.json({
		echo: req.params.word
	});
})

app.get("/name", (req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
// Using template literature
	 res.json({
      name: `${firstName} ${lastName}`
	});
})

  // using body-parser to parse some string values
app.use(bodyParser.urlencoded({extended: false}));

app.post("/name", (req, res) => {
	 let firstName = req.body.first;
	 let lastName = req.body.last;
	 res.json({
		 name: `${firstName} ${lastName}`
	});
})































 module.exports = app;
