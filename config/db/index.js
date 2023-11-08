const mongoose = require('mongoose');
async function connect() {
    try {
        mongoose
            .connect("mongodb+srv://lamhuetrung:LHT080103@bookstore.ij0bn43.mongodb.net/bookstore?retryWrites=true&w=majority")
            .then(() => console.log('Connected!'));
    } catch (error) {
        console.log(error);
    }
}
module.exports = { connect };
