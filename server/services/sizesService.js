const db = require('./db');

async function get_sizes_category(category_id) {
    const data = await db.query(`SELECT s.size_value,c.category_id
    FROM store.sizes s  join sizes_by_category c where s.size_id=c.size_id and category_id=${category_id}`);
    return data;
}
module.exports = {
    get_sizes_category
}