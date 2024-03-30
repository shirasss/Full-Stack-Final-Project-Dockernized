const db = require('./db');


async function addItem(item) {
    const data = await db.query(`insert into items values (default,${item.item_classification},${item.item_category},'${item.item_description}',${item.item_price},'${item.item_url}',${item.item_color})`);
    const res = await db.query(`select * from items where item_classification=${item.item_classification} and item_category=${item.item_category} and item_description='${item.item_description}' and item_price=${item.item_price} and item_url='${item.item_url}' and item_color=${item.item_color}`);
    let item_id = res[0].item_id;
    item.stock.map( async(element) => {
        await db.query(`insert into stock values(${item_id},${element.size},${element.quantity})`)
    })
    return data;
}

async function updateItem(item) {
    const res = await db.query(`update items set item_price=${item.item_price},item_color=${item.item_color},item_description='${item.item_description}' where item_id=${item.item_id}`);
    item.stock.map(async(element) => {
        await db.query(`update stock set item_quantity_in_stock=${element.quantity} where item_size=${element.size} and item_id=${item.item_id}`)
    })
    return res;
}



module.exports = {
    addItem,
    updateItem
}