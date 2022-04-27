const express = require('express')
const app = express()
const CORS = require('cors')
const mongodb = require('mongodb')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
app.use(express.static(path.join(__dirname + '/public/style.css')))

var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, function (err, db) {
  if (err) throw err
  var dbo = db.db('Carly')
  var myobj = {
    id: 1,
    Brand: 'Toyota',
    model: 'Jeep',
    Price: '$2000',
    TUV: 'Bis 2024',
    Fuel: 'Benzin',
    Image:
      'https://images.pexels.com/photos/1149056/pexels-photo-1149056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  }
  dbo.collection('cars').insertOne(myobj, function (err, res) {
    if (err) throw err
    console.log('1 document inserted')
  })
})
const data = () =>
  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('Carly')
    dbo.collection('cars').find({}, function (err, result) {
      if (err) throw err
      console.log(result)
      db.close()
    })
  })
console.log(data())
app.get('/', (req, res) => {
  let newCar = data()
  console.log(newCar)
  res.sendFile(newCar)
})

app.listen(5000, () => console.log('server started on 8080'))
