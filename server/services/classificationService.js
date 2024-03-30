const db = require('./db')


async function getClassification() {
    const data = await db.query('select * from classification');
    return data;

}

module.exports = {
    getClassification
}