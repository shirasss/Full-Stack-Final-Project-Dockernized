const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');


router.get('/',async (req, res) => {
    let result = await categoryService.getAllCategory();
    res.json(result);
})
router.get('/:classification',async (req, res) => {
    const classification = req.params.classification;
    let result = await categoryService.getClassification_Category(classification);
    res.json(result);
})

module.exports = router;