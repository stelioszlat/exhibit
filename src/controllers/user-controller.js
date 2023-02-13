const User = require('../models/User');

const USERS_PER_PAGE = 10

exports.getUsers = async (req, res, next) => {
    const page = +req.query.page || 1;
    
    try {
        const countedUsers = await User.countDocuments();

        if (countedUsers === 0) {
            return res.status(404).json({ message: 'Could not find users' });
        }

        const users = await User.find()
            .skip((page - 1) * USERS_PER_PAGE)
            .limit(USERS_PER_PAGE);
        
    
        return res.status(200).json({
            users,
            hasNextPage: USERS_PER_PAGE * page < countedUsers,
            lastPage: Math.ceil(countedUsers / USERS_PER_PAGE)
        });
    } catch(err) {
        return next(err);
    };
};

exports.getUserById = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Could not find user' });
        }

        return res.status(200).json({ user });
    } catch (err) {
        return next(err);
    }
}

exports.addUser = async (req, res, next) => {
    const { name, role, password, rePassword } = req.body;

    if (!name) {
        return res.status(409).json({ message: 'You need to enter username'});
    }

    if (!password) {
        return res.status(409).json({ message: 'You need to enter password'});
    }

    if (!rePassword) {
        return res.status(409).json({ message: 'You need to re-enter password'});
    }

    if (password !== rePassword) {
        return res.status(409).json({ message: 'Re-entered password does not match' });
    }

    try {

        const existingUser = await User.findOne({
            name: name,
        });

        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
        }

        const apiToken = jwt.sign({
            name: name,
            password: password,
            role: role
        }, secret);

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username: username,
            email: email,
            active: true,
            apiToken: apiToken,
            password: hashedPassword,
        });
    
        const result = await user.save();

        if (!result) {
            return res.status(409).json({ message: 'Could not create user.'});
        }

        await util.setToCache(username, result);
        
        res.status(200).json({ user });

    } catch (err) {
        return next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            ...req.body
        });

        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
        }

        res.status(200).json({ user });
    
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        res.status(200).json({ user });
    
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

exports.hasValidId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
        return res.status(404).json({ message: 'Could not find user.' });
    }

    next();
}