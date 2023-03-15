const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')


const app = express()
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

const mavsSeed = require('./models/roster.js')
const Mavs = require('./models/schema.js')

// Home Page
app.get('/mavs', (req, res) => {
    res.render('index.ejs')
})

// Roster Page
app.get('/mavsroster', (req, res) => {
    Mavs.find({}).then((allMavs) => {
        res.render('roster.ejs', {
            mavs: allMavs
        })
    })
})

// Shows New Player Entry Page
app.get('/mavs/new', (req, res) => {
    res.render('newplayer.ejs')
})


// Show Stats Page
app.get('/mavs/:id', (req, res) => {
    Mavs.findById(req.params.id).then((aMav) => {
        res.render('stats.ejs', {
            mavs: aMav
        })
    })
})


app.get('/mavs/:id/edit', (req, res) => {
    Mavs.findById(req.params.id).then((foundMav) => {
        res.render('editplayer.ejs', {
            mavs: foundMav
        })
    })
})









///////////////////////
////  ACTION  PAGE ////
///////////////////////



/// ADDS NEW PLAYER TO THE ROSTER PAGE
app.post('/mavsroster', (req, res) => {
    Mavs.create(req.body).then(() => {
        res.redirect('/mavsroster')
    })
})



/// REMOVES PLAYER FROM ROSTER PAGE
app.delete('mavs/:id', (req, res) => {
    Mavs.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/mavsroster')
    })
})


//  UPDATES PLAYERS INFORMATION
app.put('/mavs/:id', (req, res) => {
    Mavs.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(() => {
        res.redirect('/mavsroster')
    })
})

// app.get('/mavsseed', (req, res) => {
//     Mavs.create(mavsSeed).then(() => {
//         res.send(mavsSeed)
//     })
// })

// Mavs.collection.drop()

mongoose.connect('mongodb://localhost:27017/mavs').then(() => {
    console.log('connection with mongo is up');
})


app.listen(3000, () => {
    console.log('listening');
})