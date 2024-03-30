const db = require('./db');

async function checkIfUserExist(user) {
    const data = await db.query(`select * from store.users where user_name='${user.user_name}' and  user_password=${user.user_password}`);
    return data;
}
async function AddNewUser(user) {
    const data = await db.query(`insert into users values (default,'${user.user_name}',${user.user_password},'${user.user_email}',default)`);
    return data;
}
async function getUserId(user) {
    const data = await db.query(`select * from users where user_name='${user.user_name}' and user_password=${user.user_password} and user_email='${user.user_email}'`);
    return data;
}
module.exports = {
    checkIfUserExist,
    AddNewUser,
    getUserId
}