const Joi= require('joi');
const mongoose =require('mongoose');

const Rule_Object= new mongoose.Schema({
    1:{
        type: String,
    },
    2:{
        type: String
    },
    3:{
        type: String
    },
    4:{
        type: String
    }
});

const Society= mongoose.model('event_info', new mongoose.Schema({
    Society_Name: {
        type: String,
        required: true
    },
    Event_Name: {
        type: String,
        required: true
    },
    About:{
        type: String,
        required: true
    },
    Rules:{
        type: Rule_Object,
        required: true
    },
    Co_ordinator1: {
        type: String,
        required: true
    },
    Co_ordinator2: {
        type: String,
        required: true
    },
    Venue: {
        type: String,
        required: true
    },
    Competition_Type: {
        type: String,
        required: true
    },
    Event_Date: {
        type: String,
        required: true
    },
    Event_Time: {
        type: String,
        required: true
    }
})
);

function validateSociety(society){    
    const schema= {
        society: Joi.string().min(1).max(50).required(),
        event: Joi.string().min(1).max(50).required(),
        about: Joi.string().min(1).max(5000).required(),
        r1: Joi.string().min(0).max(100),
        r2: Joi.string().min(0).max(100),
        r3: Joi.string().min(0).max(100),
        r4: Joi.string().min(0).max(100),
        c1: Joi.string().min(1).max(50).required(),
        c2: Joi.string().min(1).max(50).required(),
        venue: Joi.string().min(1).max(50).required(),
        type: Joi.string().required(),
        date: Joi.string().required(),
        time: Joi.string().required()
    };
    return Joi.validate(society, schema);
}

module.exports.Society= Society;
module.exports.validate=validateSociety;