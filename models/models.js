var mongoose = require('mongoose');
var moment = require('moment');


const stateDataschema = new mongoose.Schema({
    "TotalQuestPercentCompleted":{
        type: Integer,
        required: true,
        trim: true,
        default: 0
    },
    "LastMilestoneIndexCompleted":{
        type: Integer,
        required: true,
        trim: true,
        default: 0
    },
});
const progressDataschema = new mongoose.Schema({
    lastUpdated:{
        type: String,
        required: true,
        trim: true,
        default: (moment('DD/MM/YYYY - HH:mm:ss ') + ' HKT')
    },
    "PlayerId":{
        type: String,
        required: true,
        trim: true
    },
    "PlayerLevel":{
        type: Integer,
        required: true,
        trim: true,
        default: 1
    },
    "ChipAmountBet":{
        type: Integer,
        required: true,
        trim: true,
        default: 100
    }
});

const playerDataschema = new mongoose.Schema({
    [playerid]:
    {
        "progress": progressDataschema
    }

});

var playersData = module.exports = mongoose.model('playerData', playerDataschema);

playersData.get = function(callback, limit){
    playersData.find(callback).limit(limit);
}

module.exports  = {
    playersData: playersData
};