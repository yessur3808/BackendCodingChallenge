let router = require('express').Router();


// Set default API response
router.get('/test', function (req, res) {
    res.json({
        status: "This API is Working",
        message: "Welcome to PlayStudio's Api",
    });
});

// Import contact controller
var dataController = require('./../controllers/dataController');

/* ----- KYC Application routes ----- */
router.route('/progress').post(dataController.update_progress);

router.route('/state/:playerid').get(dataController.check_state);


// APIs used to test 
router.route('/players/list/').get(dataController.list);

router.route('/players/new').post(dataController.new_player);



// Configuration APIs - Change Configuration
router.route('/config/questsno/:val').post(dataController.change_questsno);
router.route('/config/betrate/:val').post(dataController.change_betrate);
router.route('/config/bonusrate/:val').post(dataController.change_bonusrate);

// Show Configuration
router.route('/config/show').get(dataController.show_config);


module.exports = router;
