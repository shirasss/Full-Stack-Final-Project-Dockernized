const express = require('express');
const router = express.Router();
const sizesService = require('../services/sizesService');


router.get('/:category_id', async (req, res) => {
    let category_id = req.params.category_id;
    let result = await sizesService.get_sizes_category(category_id);
    res.json(result);
})


module.exports = router;