const express = require('express');
const router = express.Router();
const bagService = require('../services/bagService');


router.post('/addtobag', async (req, res) =>{
    const item = req.body;
    let result = await bagService.addToBag(item);
    res.json(result);
})
router.get('/getbag/:user_id', async (req, res)=>{
    let user_id = req.params.user_id;
    let result = await bagService.getBag(user_id);
    res.json(result);
})
router.put('/changeitembag/item_quantity', async (req, res) => {
    let item = req.body;
    let change_val = req.params.change_val;
    let result = await bagService.changeItemBagQuantity(item);
    res.json(result);
})
router.put('/changeitembag/item_size', async (req, res) => {
    let item = req.body;
    let change_val = req.params.change_val;
    let result = await bagService.changeItemBagSize(item);
    res.json(result);
})
router.post('/checkout', async (req, res) => {
    let order = req.body;
    let result = await bagService.checkOut(order);
    res.json(result);
})
module.exports = router;