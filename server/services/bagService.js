const db = require('./db');
const Email = require('../email')

async function addToBag(item) {
    let product = await db.query(`select * from bags where user_id=${item.user_id} and item_id=${item.item_id} and item_size=${item.item_size}`);
    if (product.length == 0) {
        const data = await db.query(`insert into bags values (default,${item.item_id},${item.user_id},${item.item_size},1)`);
        return data;
    }
    else {
        const data = await db.query(`update bags set item_quantity=${(product[0].item_quantity) + 1} where bag_item_id=${product[0].bag_item_id}`);
        return data
    }
}

async function getBag(user_id) {
    const data = await db.query(`select * from bags b join items i on b.item_id=i.item_id  join stock s on b.item_id=s.item_id and b.item_size=s.item_size where user_id = ${user_id}`);
    return data;
}

async function changeItemBagSize(item) {
    const bag_item_id = item.bag_item_id;
    const data = await db.query(`update bags set item_size=${item.item_size} where bag_item_id=${bag_item_id}`);
    return data;
}
async function changeItemBagQuantity(item) {
    const data = await db.query(`update bags set item_quantity=${item.item_quantity} where bag_item_id=${item.bag_item_id}`);
    return data;
}
async function checkOut(order) {
    const bagInStock = order.bagInStock;
    const data = await db.query(`insert into orders values(default,${order.user_id})`);
    let Id = await db.query(`select MAX(order_id) as orderId from orders`);
    order_id = Id[0].orderId;
    for (const item of bagInStock) {
        let data1 = await db.query(`insert into orders_items values (${order_id},${item.item_id},${item.item_size},${item.item_quantity})`);
        let data2 = await db.query(`delete from bags where user_id=${order.user_id} and item_id =${item.item_id} and item_size=${item.item_size}`);
        let data3 = await db.query(`update stock set item_quantity_in_stock=item_quantity_in_stock-${item.item_quantity} where item_id=${item.item_id} and item_size=${item.item_size}`)
    }
    let bagStock = order.bag;
    let sum = 0;
    let html_items = "";
    bagStock.forEach(element => {
        html_items += `<br></br> <h3>${element.item_description}  <split style="color:green" > size:</split> ${element.item_size}  ${element.item_price} nis</h3><img src='${element.item_url}'></img>`;
        sum += element.item_price;
    });
    let html = `<div><h1>order number #${order_id}</h1><h2> your order is on the way to you, total sum: ${sum} </h2><br></br></div>`
    html += html_items;
    Email.Email(order.user, html);
    return data;
}
module.exports = {
    addToBag,
    getBag,
    checkOut,
    changeItemBagQuantity,
    changeItemBagSize
}