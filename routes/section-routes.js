const express = require('express');


const router = express.Router();

const sections = {
    section1 : {
        name: "section1"
    }
}

router.get('', (req, res, next) => {
    res.status(200).json({sections})
});

router.get('/section/:sid', (req, res, next) => {
    const section = req.params.sid;

    res.status(200).json({section});
})

module.exports = router;