
exports.getMuseums = async (req, res, next) => {
    try {
        const museums = await Museum.find();
        if (museums) {
            res.json(museums);
        }
        res.status(400);
    }
    catch (err) {
        res.status(500).json({err});
    }
}

exports.getMuseum = async (req, res, next) => {
    const museumId = req.params.mid;

    try {
        const museum = await Museum.findById(museumId);
        res.json({museum});
    }
    catch (err) {
        res.status(500).json({err});
    }
}