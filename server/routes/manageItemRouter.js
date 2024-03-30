const express = require('express');
const router = express.Router();
const manageItemService = require('../services/manageItemService');


router.post('/addnewitem',async (req, res) => {
    let result = await manageItemService.addItem(req.body);
    res.json(result);
})
router.put('/updateitem',async (req, res) => {
    const item = req.body;
    let result = await manageItemService.updateItem(item);
    res.json(result);
})

module.exports = router;