const express = require('express');
const router = express.Router();
const itemsService = require('../services/itemsService');

router.get('/:classification_id/:category_id', async (req, res) => {
    const classification_id = req.params.classification_id;
    const category_id = req.params.category_id;
    let result = await itemsService.getItems(classification_id, category_id);
    res.json(result);
})
router.get('/colors', async (req, res) => {
    let result = await itemsService.getColors();
    res.json(result);
})
router.get('/:classification_id/:category_id/:item_id', async (req, res) => {
    const classification_id = req.params.classification_id;
    const category_id = req.params.category_id;
    const item_id = req.params.item_id;
    let result = await itemsService.getSingleItem(item_id);
    res.json(result);
})
router.delete('/deleteitemBag', async (req, res) => {
    const item=req.body;
    let result = await itemsService.delteItemFromBag(item);
    res.json(result);
})
router.delete('/delete/item/store/:item_id',async (req, res) => {
    const item_id = req.params.item_id;
    let result = await itemsService.delteItemFromStore(item_id);
    res.json(result);
})
router.get('/manager/store/allProducts/:first_item/:last_item', async (req, res) => {
    const first_item = req.params.first_item;
    const last_item = req.params.last_item;
    let result = await itemsService.getAllItems(first_item, last_item);
    res.json(result);
})
module.exports = router;
