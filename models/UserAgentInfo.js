const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserAgentSchema = mongoose.Schema({
    ip:{
        type: Schema.Types.Mixed
    },
    searchengine:{
        type: Schema.Types.Mixed 
    },
    browser:{
        type: Schema.Types.Mixed      
    },
    os:{
        type: Schema.Types.Mixed      
    },
    device:{
        type: Schema.Types.Mixed      
    }
})
module.exports = mongoose.model('Useragent',UserAgentSchema);