const mongoose = require('mongoose')
require('../mongoose/mongoose')

const collectionDataSchema = mongoose.Schema({
    box_no:{
    type:String, 
    required:true //autopoulated on the basis of collector mumukshu
    },

    city:{
    type:String, 
    // required:true // autopopulated from user auth
    },
    
    shopname:{
    type: String, 
    required: true //autopopulated from box_no
    },

    area:{
    type:String, 
    required: true  //autopopulated from box_no
    },

    currency:{
    type: String, 
    // required: true  //lov symbols
    },

    amount:{
    type: Number, 
    required: true
    },

    collector:{
        type: String,
        required: true
    },

    date:{
    type: Date,
    required: true //default with current date
    }
})
    const collectionData = new mongoose.model("collectiondata",  collectionDataSchema)
    
    module.exports = collectionData