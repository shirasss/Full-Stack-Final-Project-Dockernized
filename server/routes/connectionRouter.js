const express = require('express');
const router = express.Router();
const connectionService = require('../services/connectionService');

router.post('/login', async (req, res) => {
    let result = await connectionService.checkIfUserExist(req.body);
    res.json(result);
});

router.post('/signup', async (req, res) => {
    let result = await connectionService.checkIfUserExist(req.body);
    if (result.length > 0) {
        res.status(400).send();
    }
    else {
        await connectionService.AddNewUser(req.body);
        let user = await connectionService.getUserId(req.body);
        res.send(user);
    }

})
router.get('/getuserid', async (req, res) => {
    let user = await connectionService.getUserId(req.body);
    res.send(user);
})


module.exports = router;