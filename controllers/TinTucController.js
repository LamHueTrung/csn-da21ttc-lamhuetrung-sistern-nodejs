const Tintuc = require('../models/TinTuc');

class TintucController {
    static layThongBao(req, res) {
        Tintuc.find()
            .then((Tintucs) => res.json(Tintucs))
            .catch((err) => res.json('Lỗi slug/tintuc: ' + err));
    }
    static themThongBao(req, res) {
        const newData = req.body;

        Tintuc.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}

module.exports = TintucController;
