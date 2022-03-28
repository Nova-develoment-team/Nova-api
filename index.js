const express = require('express');
const bodyParser = require("body-parser");
const deeznuts = require("./assets/8ball.json")
const gay = require("./assets/gay.json")
const joke = require("./assets/dadjokes.json")
const num = require("./assets/num.json")
const db = require('quick.db')
const keysList = require('./assets/keys.js').keys

console.log('Home page loaded')
console.log('8ball api loaded')
console.log('Number gen api loaded')
console.log('gay api loaded')
console.log('joke api loaded')

const max = 100

const app = express();
const PORT = 5377

app.use(bodyParser.json());

app.get('/8ball', (req, res) => {      
console.log('Someone put an invalid key in the 8ball api')
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: "invalid key" })
    
    rand_deeznuts = deeznuts[Math.floor(Math.random() * deeznuts.length)]
    res.json({ response: rand_deeznuts })
});

app.get('/gay', (req, res) => {   
console.log('Someone put an invalid key in the gay api')    
    
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: "invalid key" })
                                        
    rand_gay = gay[Math.floor(Math.random() * gay.length)]
    res.json({ response: rand_gay })
});

app.get('/joke', (req, res) => {       
console.log('Someone put an invalid key in the joke api')
    
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: "invalid key" })
  
    rand_joke = joke[Math.floor(Math.random() * joke.length)]
    res.json({ response: rand_joke })
});


app.get('/num', (req, res) => { 
console.log('Someone put an invalid key in the 8ball api')
    
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: "invalid key" })
  
    rand_num = num[Math.floor(Math.random() * num.length)]
    res.json({ response: rand_num })
});

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: __dirname })
});

require("./routes")(app)

app.get('/*',(req,res)=>{
res.send({error:"Hmmm invald endpoint"})
})

app.listen(PORT, () => console.log("Nova Api is on and linked and running on https://api.nova-bot.tk")) 