const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const mavsSchema= Schema ({
    name: String,
    position: String,
    height: String,
    weight: Number,
    number: Number,
    img: String,
    stats: {
        ppg: Number,
        apg: Number,
        rpg: Number
    },
})

const Mavs = mongoose.model('Mavs', mavsSchema)
module.exports = Mavs 