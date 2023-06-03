const mongoose = require('mongoose')
require('../mongoose/mongoose')

const boxSchema = mongoose.Schema({
    box_no:{
        type: Number,
        required: true
    },
    box_status:{
        type: String,
        // required: true
    },
    city:{
        type: String,
        required: true
    },
    version_no:{
        type: Number,
        required: true
    },
    placement_date:{
        type: Date,
        required: true
    },
    collector_mumukshu_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    collector_mumukshu_no:{
        type: String,
        required: true
    },
    collector_mumukshu_name:{
        type: String,
        // required:true
    },
    cancel_reason:{
        type:String,
    },
    shop_name:{
        type: String,
        required: true
    },
    shop_type:{
        type:String,
        required: true
    },
    shop_owner_name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required: true
    },
    telephone:{
        type: Number,
    },
    shop_address_1:{
        type: String,
        required: true
    },
    shop_address_2:{
        type: String,
    },
    area:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    pincode:{
        type:String,
        required: true
    },
    visiting_card:{
        type:String,
        required: true
    },
    box_owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},
{
    timestamps: true
})

const Box = mongoose.model('Box', boxSchema)

module.exports = Box