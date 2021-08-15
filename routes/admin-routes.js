const express = require('express');

const router = express.Router();


router.get('', (req, res, next) => {
    res.status(200).send("<h1>Admin Page</h1>")
});

router.get('/users', (req, res, next) => {
    res.status(200).send("<h4>users: </h4><ul></ul>");
});

router.get('/user/:uid', (req, res, next) =>{
    const id = req.body.uid;
    res.status(200).json({"user": id});
})

router.post('/user/:uid', (req, res, next) => {
    const id = req.params.uid;
    res.status(200);
});

router.put('/user/:uid', (req, res, next) => {
    const id = req.params.uid;
    res.status(200);
});

router.delete('/user/:uid', (req, res, next) => {
    const id = req.params.uid;
    res.status(200);
});

router.get('/museums', (req, res, next) => {
    res.status(200).send("<h4>museums: </h4><ul></ul>");
});

router.post('/museum/:mid', (req, res, next) => {
    const id = req.params.mid;
    res.status(200).json({"museum": id});
});

router.put('/museum/:mid', (req, res, next) => {
    const id = req.params.mid;
    res.status(200).json({"museum": id});
});

router.delete('/museum/:mid', (req, res, next) => {
    const id = req.params.mid;
    res.status(200).json({"museum": id});
});

router.get('/sections', (req, res, next) => {
    res.status(200).send("<h4>sections: </h4><ul></ul>");
});

router.post('/section/:sid', (req, res, next) => {
    const id = req.params.sid;
    res.status(200).json({"section": id});
});

router.put('/section/:sid', (req, res, next) => {
    const id = req.params.sid;
    res.status(200).json({"section": id});
});

router.delete('/section/:sid', (req, res, next) => {
    const id = req.params.sid;
    res.status(200).json({"section": id});
});

router.get('/exhibits', (req, res, next) => {
    res.status(200).send("<h4>exhibits: </h4><ul></ul>");
});

router.post('/exhibit/:eid', (req, res, next) => {
    const id = req.params.eid;
    res.status(200).json({"exhibit": id});
});

router.put('/exhibit/:eid', (req, res, next) => {
    const id = req.params.eid;
    res.status(200).json({"exhibit": id});
});

router.delete('/exhibit/:eid', (req, res, next) => {
    const id = req.params.eid;
    res.status(200).json({"exhibit": id});
});

module.exports = router;