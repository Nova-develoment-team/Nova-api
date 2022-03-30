const express = require('express');
const bodyParser = require("body-parser");
const deeznuts = require("./assets/8ball.json")
const gay = require("./assets/gay.json")
const joke = require("./assets/dadjokes.json")
const num = require("./assets/num.json")
const db = require('quick.db')
const keysList = require('./assets/keys.js').keys
const { Canvas } = require('canvas-constructor/cairo')
const canvas = require('canvas')
const chalk = require('chalk')

console.log('Nsfw endpoints loaded')
console.log('Fun endpoints loaded')
console.log('misc endpoints loaded')
const max = 100

const app = express();

require("./routes")(app)

const PORT = 5377

app.use(bodyParser.json());

app.get('/fun/8ball', (req, res) => {      
console.log('Someone put an invalid key in the 8ball api')
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: require("./assets/utils.json").KeyError })
    
    rand_deeznuts = deeznuts[Math.floor(Math.random() * deeznuts.length)]
    res.json({ response: rand_deeznuts })

    db.add("reqs_fun",1)
    db.add("reqs_8ball",1)
});

app.get('/fun/gay', (req, res) => {   
console.log('Someone put an invalid key in the gay api')    
    
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: require("./assets/utils.json").KeyError })
                                        
    rand_gay = gay[Math.floor(Math.random() * gay.length)]
    res.json({ response: rand_gay })

        db.add("reqs_fun",1)
    db.add("reqs_gay",1)
});

app.get('/fun/joke', (req, res) => {       
console.log('Someone put an invalid key in the joke api')
    
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: require("./assets/utils.json").KeyError })
  
    rand_joke = joke[Math.floor(Math.random() * joke.length)]
    res.json({ response: rand_joke })

    db.add("reqs_fun",1)
    db.add("reqs_joke",1)
});


app.get('/misc/num', (req, res) => { 
console.log('Someone put an invalid key in the num api')
    
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: require("./assets/utils.json").KeyError })
  
    rand_num = num[Math.floor(Math.random() * num.length)]
    res.json({ response: rand_num })

    db.add("reqs_misc",1)
    db.add("reqs_num",1)
});

app.get('/fun/twiter/:feed', async (req, res) => {

    console.log('Someone put an invalid key in the twiter api')
    
const {key} = req.query;
if (!key || !keysList.includes(key)) return res.json({ error: require("./assets/utils.json").KeyError })
    
    const img = await canvas.loadImage('https://teckspace.files.wordpress.com/2011/08/twitter1.jpg')

    let image = new Canvas(550, 267)
    .printImage(img, 0, 0, 550, 267)
    .setTextFont('28px Impact')
    .printText(req.params.feed, 40, 145)
    .toBuffer();

    res.set({'Content-Type': 'image/png'})//setting content type as png image!
    res.send(image)//sending the image!

    db.add("reqs_fun",1)
    db.add("reqs_twiter",1)
});

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: __dirname })
});

app.get('/*',(req,res)=>{
res.send({error:"Hmmm invald endpoint"})
})

const static = chalk.grey// Staticstics and lines color


app.listen(PORT, () => {
  console.log(static("+-------------- [ Staticstics ] --------------+"));
  console.log(static("| ------------------------------------------- |"));
  console.log(static("| Successfully loaded all elements and codes  |"));
  console.log(static("| ------------------------------------------- |"));
  console.log(static("| Nova api is up! ✅                           |"));
  console.log(static("| ------------------------------------------- |"));
  console.log(static("| Connected to - https://api.nova-bot.tk ✅    |"));
  console.log(static("| ------------------------------------------- |"));
  console.log(static("| Keys '' and '' loaded         |"));
  console.log(static("+---------------------------------------------+"));
})
