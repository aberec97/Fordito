const express=require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var db
app.use(cors())
app.use(bodyParser.json())
MongoClient.connect('mongodb://localhost:27017/', {
            useNewUrlParser: true
        }, (err, client) => {
    if (err) throw err
    db = client.db('legyen')
})


app.get('/', 
    (req, res) => {
        db.collection('ujKollekcio').find().toArray( (err, cucc) => {
            res.send(cucc)
        })
    }
)

app.post('/keres',
(req, res) => {
    db.collection('ujKollekcio').find({wordHun: req.body.translateWord}).toArray( (err,cucc) => {  
        res.send(cucc.wordEng)
    })
    
})


app.post('/',
    (req, res) => {
        console.log(req.body)
        db.collection('ujKollekcio').insertOne(req.body, cucc => {
            res.send( cucc )
        })
    }
)

app.listen(8082)