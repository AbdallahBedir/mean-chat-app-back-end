var express     = require("express");
var http        = require("http");
var request     = require("request");
var path        = require("path");
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var cors        = require("cors");
var app         = require("express")();
//var server      = http.createServer(app).listen(3000);
const rooms     = require('./routes/rooms');
const chat      = require("./routes/chat");

//mongoose.Promise = global.Promise;

mongoose.connect('mongodb://AbdallahBedir:ng2-chat1234@ds121225.mlab.com:21225/ng2-chat',{ useMongoClient: true, promiseLibrary: global.Promise })
    .then(()=>console.log(`Successful connection to chat database`))
    .catch((err)=>console.log(`Error while connecting to database chat`,err))

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database chat');
});
  
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

// Port Number
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Body Parser Middleware
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use(cors());

app.use('/api/rooms', rooms);

app.use('/api/chat', chat);

app.get("/api",(req,res)=>{
    res.json({
        success:true,
        body:"Welcome to cyber chat backend room"
    });
});

app.get("*",(req,res)=> {
    res.sendFile(path.join(__dirname,'public/index.html'));    
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
});

console.log(`Express is running on port 3000...`);