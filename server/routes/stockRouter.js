const express = require('express');
const router = express.Router();
const itemsService = require('../services/itemsService');

router.get('/getstock/:item_id', async (req, res) => {
    const item_id = req.params.item_id;
    let result = await itemsService.getItemStock(item_id);
    res.json(result);
})

module.exports = router;