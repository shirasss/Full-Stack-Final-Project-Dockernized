const db = require('./db')

async function getAllCategory(){
    const data = await db.query('select * from category');
    return data;
}
async function getClassification_Category(classification){
    const data = await db.query(`select * from ${classification}_category`);
    return data;
}

module.exports = {
    getAllCategory,
    getClassification_Category
}