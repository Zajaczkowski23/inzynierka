import express from "express"
const { MongoClient } = require('mongodb')

const app = express();
const port = 46703;

const url = "mongodb+srv://admin:Krystian2@cluster.c6yyhpd.mongodb.net/?retryWrites=true&w=majority";


app.get('/', (req, res) => {
  res.send('Welocme to my server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = {
  connectToDb: (cb) => {
    MongoClient
  }
}