const Game = require('../models/Game');
const User = require('../models/User');
const Avatar = require('../models/Avatar');

exports.getProfile = async (req, res) => {
    const userID = req.cookies.userID;
    try {
        const user = await User.findById(userID);
        const games = await Game.find({ userId: userID }).sort({ date: -1 });
        const avatars = await Avatar.find({});
        res.render('./main/profile', {
            extraCSS: '/Stylesheets/profile.css', 
            extraScript:null,
            userID,
            userName: user.userName,
            games,
            path: `/images/${avatars.find(a=> a.imgID == (req.cookies.imgID)).path}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading profile");
    }
};
