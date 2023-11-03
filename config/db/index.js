const mongoose = require('mongoose');
async function connect() {

    try {
        mongoose.connect('mongodb://127.0.0.1:27017/sisntern')
        .then(() => console.log('Connected!'));

    } catch(error) {
        console.log(error);

    }
}
module.exports = {connect};



