const express = require('express');
const router = express.Router();
const classificationService = require('../services/classificationService');


router.get('/',async (req, res) => {
    let result = await classificationService.getClassification();
    res.json(result);
})

module.exports = router;