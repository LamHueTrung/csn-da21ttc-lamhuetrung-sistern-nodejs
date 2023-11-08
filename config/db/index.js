const mongoose = require('mongoose');
async function connect() {
    try {
        mongoose
            .connect('mongodb+srv://lamhuetrung:Lht080103@sistern.ajxyvai.mongodb.net/sistern?retryWrites=true&w=majority')
            .then(() => console.log('Connected!'));
    } catch (error) {
        console.log(error);
    }
}
module.exports = { connect };
