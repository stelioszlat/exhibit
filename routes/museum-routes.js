const express = require('express');

const router = express.Router();

const museums = {
    museum1 : {
        name: "museum1"
    },
    museum2 : {
        name: "museum2"
    }
}

router.get('', (req, res, next) => {
    res.status(200).json({museums});
})

module.exports = router;