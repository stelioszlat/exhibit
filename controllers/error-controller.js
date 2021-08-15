

exports.get404Page = (req, res, next) => {
    res.status(404).json({message: "Error: page not found"});
};

exports.get500Page = (req, res, next) => {
    res.status(500).json({message: "Error: internal server error"});
}