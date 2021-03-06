var mongoose = require("mongoose");
var express= require("express");
var app = express();
var bodyParser = require("body-parser");
const config= require('config');
const {Society}= require('./models/society');
const {Register}= require('./models/register');
const societies= require('./routes/societies');
const registers= require('./routes/registers');

mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> console.log(`Connected to ${config.get('db')}...`))
.catch(err => console.log(`Could not connect to ${config.get('db')}...`,err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/society',societies);
app.use('/register',registers);

require('./prod.js')(app);

app.set("view engine", "pug");

app.get('/',async function(req,res){
    let events= await Society.find();
    res.status(200).render('competition',{events:events});
});

app.get('/123admin456',async function(req,res){
    res.status(200).render('admin');
});

app.get('/details',async function(req,res){
    const events= await Society.find();
    res.status(200).render('details',{events:events});
});

app.get('/details/:event',async function(req,res){
    const registers= await Register.find({event_name:  req.params.event});
    res.status(200).render('info',{registers: registers,event: req.params.event});
});

app.get('/event/:item',async function(req,res){
    let event= await Society.find({Event_Name: req.params.item});
    res.status(200).render('event',{event:Object.assign({}, event)[0]});
});



const port=process.env.PORT || 3000;
console.log(port);
const server=app.listen(port, ()=> console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);
module.exports= server;