const db = require('./db');

async function getItems(classification_id, category_id) {
    const data = await db.query(`select * from items where item_classification =${classification_id} and item_category=${category_id}`);
    return data;
}
async function getSingleItem(item_id) {
    const data = await db.query(`select * from items where  item_id=${item_id}`);
    return data;
}
async function getItemStock(item_id) {
    const data = await db.query(`select * from stock where item_id =${item_id}`);
    return data;
}
async function delteItemFromBag(item) {
    const data = await db.query(`delete from bags where bag_item_id=${item.bag_item_id}`);
    return data;
}
async function delteItemFromStore(item_id) {
    const res = await db.query(`delete from stock where item_id=${item_id}`)
    const data = await db.query(`delete from items where item_id =${item_id}`);
    return data;
}
async function getColors() {
    const data = await db.query(`select * from colors`)
    return data;
}
async function getAllItems(first_item, last_item) {
    const data = await db.query(`select * from items where item_id between ${first_item} and ${last_item}`);
    
    return data;
}

module.exports = {
    getItems,
    getSingleItem,
    getItemStock,
    delteItemFromBag,
    delteItemFromStore,
    getColors,
    getAllItems
}

