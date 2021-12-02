let dataFileURL = "data/data.json",
fullFileURL = __dirname.replace('controllers',dataFileURL);
const fs = require('fs');
const moment = require('moment');


exports.list = function(req, res){
    try {
        let rawdata = fs.readFileSync(fullFileURL);
        let data = JSON.parse(rawdata);
        if(data && data.playersData){

            var playersDataKeys = Object.keys(data.playersData);

            var playersArr = (playersDataKeys.length > 0) ? ([...playersDataKeys].map((key, idx) => {
                var tempObj = {
                    "playerId": key,
                    "PlayerLevel": data.playersData[key].progress.PlayerLevel
                };
                return tempObj;
            })) : ([]);

            res.status(200).json(playersArr);
        }else{
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }catch(err){
        res.status(400).send({msg:'There was an error reading the current database or data files'});
    }
}

exports.new_player = function(req, res){
    if(req && req.body && req.body['PlayerId']){
        const playerId = req.body['PlayerId'];
        try {
            let rawdata = fs.readFileSync(fullFileURL);
            let data = JSON.parse(rawdata);
            if(data && data.playersData){
                var playerdata = data.playersData;
                playerdata[playerId] = {
                    "lastUpdated": moment().format('DD/MM/YYYY - HH:mm:ss')+" HKT",
                    "progress": {
                        "PlayerLevel": 0,
                        "QuestPointsEarned": 0,
                        "TotalQuestPercentCompleted": 0,
                        "TotalChips": 0,
                        "MilestonesCompleted": []
                    }
                }
                fs.writeFileSync(fullFileURL, JSON.stringify(data, null, 4));
                res.status(200).json(playerdata[playerId]);
            }else{
                res.status(500).send({msg:'The player id “'+playerId+'” was unable to generate or be added to the database/datafile. Please tryb again later. Aplogies for any inconvenience.'});
            }
        }catch(err){
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }
}


exports.update_progress = function(req, res){
    if(req && req.body && req.body['PlayerId'] && req.body['PlayerLevel'] && req.body['ChipAmountBet']){
        const playerId = req.body['PlayerId'],
        playerLevel = req.body['PlayerLevel'],
        chipAmountBet = req.body['ChipAmountBet'];

        try {
            let rawdata = fs.readFileSync(fullFileURL);
            let data = JSON.parse(rawdata);

            if(data && data.playersData && data.playersData[playerId]){
                var currentPlayer = data.playersData[playerId],
                currentPlayerProgress = currentPlayer.progress;
                var rateFromBet = data.configuration["RateFromBet"],
                levelBonusRate = data.configuration["LevelBonusRate"],
                noOfQuests = data.configuration["NumberOfQuests"];

                /*    
                    Quest point accumulation is derived from the following formula:  
                    -> (ChipAmountBet * RateFromBet) + (PlayerLevel * LevelBonusRate)
                */

                // update the Player's Level
                currentPlayerProgress.PlayerLevel = playerLevel;

                // Calculate Player's Earned points and update
                currentPlayerProgress.QuestPointsEarned = calcPoints(chipAmountBet,rateFromBet,playerLevel,levelBonusRate);

                // Calculate Quest percentage complete
                currentPlayerProgress.TotalQuestPercentCompleted = ((currentPlayerProgress.QuestPointsEarned)/(data.configuration.NumberOfQuests))*100;

                currentPlayer.lastUpdated = moment().format('DD/MM/YYYY - HH:mm:ss')+" HKT"

                var progressObj = {
                    "QuestPointsEarned": currentPlayerProgress.QuestPointsEarned,
                    "TotalQuestPercentCompleted": currentPlayerProgress.TotalQuestPercentCompleted,
                    "MilestonesCompleted": currentPlayerProgress["MilestonesCompleted"]
                };

                fs.writeFileSync(fullFileURL, JSON.stringify(data, null, 4));
                res.status(200).json(progressObj)
            }else{
                res.status(500).send({msg:'The player id “'+playerId+'” does not currently exist'});
            }
        }catch(err){
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }
}



exports.check_state = function(req, res){
    if(req && req.params && req.params.playerid){
        var stateObj = { "TotalQuestPercentCompleted": null, "LastMilestoneIndexCompleted": null },
        playerid = req.params.playerid;

        try {
            let rawdata = fs.readFileSync(fullFileURL);
            let data = JSON.parse(rawdata);

            if(data && data.playersData && data.playersData[playerid] && data.playersData[playerid].progress){
                var currentPlayer = data.playersData[playerid],
                currentPlayerProgress = currentPlayer.progress;
 
                var curMilestonesIdx = (currentPlayerProgress["MilestonesCompleted"].length > 0) ? ([...currentPlayerProgress["MilestonesCompleted"]].map((key, idx) => {
                    return key["MilestoneIndex"];
                })) : ([0]);

                var biggestMilestonesIdx = Math.max.apply(Math, curMilestonesIdx);

                stateObj = {
                    "TotalQuestPercentCompleted": currentPlayerProgress.TotalQuestPercentCompleted+"%",
                    "LastMilestoneIndexCompleted":biggestMilestonesIdx
                } 
                res.status(200).json(stateObj)
            }else{
                res.status(500).send({msg:'The player id "'+playerid+'" does not currently exist'});
            }
        }catch(err){
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }
}



function calcPoints(ChipAmountBet, RateFromBet, PlayerLevel, LevelBonusRate){
    return ((ChipAmountBet*RateFromBet)+(PlayerLevel*LevelBonusRate));
}





/* ---- CONFIGURATION APIs ----*/

exports.change_questsno = function(req, res){
    if(req && req.params && req.params.val){
        const numberOfQuests = req.params.val;

        try {
            let rawdata = fs.readFileSync(fullFileURL);
            let data = JSON.parse(rawdata);

            if(data && data.configuration && numberOfQuests){
                data.configuration["NumberOfQuests"] = numberOfQuests;
                fs.writeFileSync(fullFileURL, JSON.stringify(data, null, 4));
                res.status(200).json(data.configuration);
            }else{
                res.status(400).send({msg:'There was an error reading the current database or data files'});
            }
        }catch(err){
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }
}

exports.change_betrate = function(req, res){
    if(req && req.params && req.params.val){
        const rateFromBet = req.params.val;

        try {
            let rawdata = fs.readFileSync(fullFileURL);
            let data = JSON.parse(rawdata);

            if(data && data.configuration && rateFromBet){
                data.configuration["RateFromBet"] = rateFromBet;
                fs.writeFileSync(fullFileURL, JSON.stringify(data, null, 4));
                res.status(200).json(data.configuration);
            }else{
                res.status(400).send({msg:'There was an error reading the current database or data files'});
            }
        }catch(err){
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }
}

exports.change_bonusrate = function(req, res){
    if(req && req.params && req.params.val){
        const levelBonusRate = req.params.val;
        try {
            let rawdata = fs.readFileSync(fullFileURL);
            let data = JSON.parse(rawdata);

            if(data && data.configuration && levelBonusRate){
                data.configuration["LevelBonusRate"] = levelBonusRate;
                fs.writeFileSync(fullFileURL, JSON.stringify(data, null, 4));
                res.status(200).json(data.configuration);
            }else{
                res.status(400).send({msg:'There was an error reading the current database or data files'});
            }
        }catch(err){
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }
}


exports.show_config = function(req, res){
    try {
        let rawdata = fs.readFileSync(fullFileURL);
        let data = JSON.parse(rawdata);

        if(data && data.configuration){
            res.status(200).json(data.configuration);
        }else{
            res.status(400).send({msg:'There was an error reading the current database or data files'});
        }
    }catch(err){
        res.status(400).send({msg:'There was an error reading the current database or data files'});
    }
}









