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

app.post('/insert', (req, res) => {
    db.collection('szavak').insertOne(req.body, cucc => {
        res.sendStatus(201)
    })
})

app.post('/fordit', (req, res) => {
    let actualWord = req.body.szo
    db.collection('szavak').findOne({magyar : actualWord}).then(toAngol => {
        if(!toAngol){
            db.collection('szavak').findOne({angol : actualWord}).then(toMagyar => {
                if(!toMagyar){
                    res.send('404')
                    return
                } else {
                res.send(toMagyar.magyar)
                return
                }
            })
        } else {
            res.send(toAngol.angol)
        }
    })
    /* .toArray( (err,cucc) => {  
        console.log(cucc)
        res.send(cucc)
    }) */
})

app.listen(8082)