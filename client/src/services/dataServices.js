// let url = 'localhost'
let url = '13.51.69.9'

async function getItemsByCategory(classification_id, category_id) {
    try {
        let res = await fetch(`http://${url}:8000/api/items/${classification_id}/${category_id}`);
        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}
async function getSingleItem(classification_id, category_id, item_id) {
    try {
        let res = await fetch(`http://${url}:8000/api/items/${classification_id}/${category_id}/${item_id}`);

        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}


async function add_Item(item) {
    try {
         
        let result = await fetch(`http://${url}:8000/api/manageitem/addnewitem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(item),
            mode: 'cors'
        });
    }
    catch (err) {
        throw err;
    }
}
async function get_All_category() {
    try {
        let res = await fetch(`http://${url}:8000/api/category`);
        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}
async function get_girls_category() {
    try {
        let res = await fetch(`http://${url}:8000/api/category/girls`);
        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}
async function get_boys_category() {
    try {
        let res = await fetch(`http://${url}:8000/api/category/boys`);
        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}
async function get_classification() {
    try {
        let res = await fetch(`http://${url}:8000/api/classification`);
        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}
async function Log_in(user) {
    try {
        let result = await fetch(`http://${url}:8000/api/connection/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(user),
            mode: 'cors'
        });
        result = await result.json();
        return result;
    }
    catch (err) {
        throw err;
    }
}
async function Sign_up(user) {
     
    try {
        let result = await fetch(`http://${url}:8000/api/connection/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(user),
            mode: 'cors'
        });
        return result;
    }
    catch (err) {
        throw err;
    }
}
async function add_to_bag(item) {
    try {
        let result = await fetch(`http://${url}:8000/api/bag/addtobag`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(item),
            mode: 'cors'
        });
        result = await result.json();
        return result;
    }
    catch (err) {
        throw err;
    }
}
async function get_item_stock(item_id) {
    try {
         
        let result = await fetch(`http://${url}:8000/api/items/stock/getstock/${item_id}`)
        result = await result.json();
        sort(result,"item_size")
        return result;
    }
    catch (err) {
        throw err;
    }
}
async function get_bag(user_id) {
    try {
        let result = await fetch(`http://${url}:8000/api/bag/getbag/${user_id}`)
        result = await result.json();
        return result;
    }
    catch (err) {
        throw err;
    }
}
async function get_sizes_by_category(category_id) {
    try {
        let result = await fetch(`http://${url}:8000/api/sizes/${category_id}`)
        result = await result.json();
        sort(result,"size_value");
        return result;
    }
    catch (err) {
        throw err;
    }
}
function sort(arr, key) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j][key] > arr[j + 1][key]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}
async function delete_item_from_bag(item) {
   try {
       let result = await fetch(`http://${url}:8000/api/items/deleteitemBag`, {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json', },
           body: JSON.stringify(item),
           mode: 'cors'
       });
       result = await result.json();
       return result;
   }
   catch (err) {
       throw err;
   }
}
async function delete_item_from_store(item) {
     
    try {
        let result = await fetch(`http://${url}:8000/api/items/delete/item/store/${item.item_id}`, {
            method: 'DELETE'
        });
        result = await result.json();
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function update_item(item) {
     
    try {
        let result = await fetch(`http://${url}:8000/api/manageitem/updateitem`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(item),
            mode: 'cors'
        });
        result = await result.json();
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function change_item_bag(item,change_val) {
     
    try {
        let result = await fetch(`http://${url}:8000/api/bag/changeitembag/${change_val}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(item),
            mode: 'cors'
        });
        result = await result.json();
        return result;
    }
    catch (err) {
        throw err;
    }
}
async function check_out(order) {
     
    try {
        let result = await fetch(`http://${url}:8000/api/bag/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(order),
            mode: 'cors'
        });
        result = await result.json();
        return result;
    }
    catch (err) {
        throw err;
    }
}
async function get_colors() {
    debugger
    try {
        let res = await fetch(`http://${url}:8000/api/items/colors`);
        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}
async function getAllItems(first_item, last_item) {
    try {
        let res = await fetch(`http://${url}:8000/api/items/manager/store/allProducts/${first_item}/${last_item}`);
        res = await res.json();
        return res;
    }
    catch (err) {
        throw err;
    }
}
module.exports = {
    getItemsByCategory,
    getSingleItem,
    get_classification,
    get_All_category,
    get_girls_category,
    get_boys_category,
    add_Item,
    Log_in,
    Sign_up,
    get_item_stock,
    add_to_bag,
    get_bag,
    delete_item_from_bag,
    delete_item_from_store,
    update_item,
    get_sizes_by_category,
    change_item_bag,
    check_out,
    get_colors,
    getAllItems
}