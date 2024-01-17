const mongoose = require('mongoose');
async function connect() {
    try {
        mongoose
            .connect(
                'mongodb+srv://lamhuetrung:Lht080103@sistern.ajxyvai.mongodb.net/sistern?retryWrites=true&w=majority',
            )
            .then(() => console.log('Connected!'))
            .catch((atlasError) => {
                console.error('Lỗi kết nối đến MongoDB Atlas:', atlasError);
                console.log(
                    'Đang kết nối với mini server, xin đợi trong giây lát',
                );
                setTimeout(() => {
                    mongoose
                        .connect('mongodb://localhost:27017/sistern-v0', {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                        })
                        .then(() =>
                            console.log(
                                'Kết nối thành công mini server MongoDB!',
                            ),
                        )
                        .catch((localError) =>
                            console.error(
                                'Error connecting to local MongoDB:',
                                localError,
                            ),
                        );
                }, 15000);
            });
    } catch (error) {
        console.error('Lỗi kết nối đến MongoDB Atlas:', atlasError);
        console.log('Đang kết nối với mini server, xin đợi trong giây lát');
        setTimeout(() => {
            mongoose
                .connect('mongodb://localhost:27017/sistern-v0', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then(() =>
                    console.log('Kết nối thành công mini server MongoDB!'),
                )
                .catch((localError) =>
                    console.error(
                        'Error connecting to local MongoDB:',
                        localError,
                    ),
                );
        }, 15000);
    }
}
module.exports = { connect };
