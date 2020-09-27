const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')



// Database
const deprecatedDB = { useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect('mongodb://localhost/contacts-db',deprecatedDB)

const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database connection established')
})



// Route
const contactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')


//Express
const app = express()



//Middleware 
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api/contacts', contactRoute)
app.use('/api/users', userRoute)


// Main route
app.get('/',(req,res)=>{
    res.send('Hello world')
})


// Run server
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})