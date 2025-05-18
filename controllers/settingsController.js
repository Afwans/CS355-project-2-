const User = require('../models/User');
const Avatar = require('../models/Avatar');
const bcrypt = require('bcrypt');

exports.getSettings = async (req, res) => {
    const user = await User.findById(req.cookies.userID);
    console.log(req.cookies.userAvatar);
    res.render('./main/settings', {
        extraCSS: '/Stylesheets/settings.css',
        extraScript: '/JavaScript/profileSettings.js',
        userName: user.userName,
        email: user.email,
        password: user.password,
        bio: user.bio,
        path: `/images/${req.cookies.userAvatar}`,
        msg: null
    });
};

exports.updateAvatar = async (req, res) => {
    let choice = req.body.picRadio;
    const avatars = await Avatar.find({});
    const user = await User.findById(req.cookies.userID);
    res.cookie("imgID", choice);
    res.cookie("userAvatar", (avatars.find(a=> a.imgID === (choice)).path));
    console.log(req.cookies.imgID);
    console.log(req.cookies.userAvatar);
    console.log(choice);
    user.imgID = choice;
    await user.save();
    res.redirect('/settings');
};

exports.changeBio = async (req, res) => {
    const bio = req.body.bio.replace(/(\r\n|\n|\r)/gm, "");
    const user = await User.findById(req.cookies.userID);
    user.bio = bio;
    await user.save();
    res.redirect('/settings');
};

exports.changeUsername = async (req, res) => {
    const newUser = req.body.userName;
    const exists = await User.findOne({ userName: newUser });

    if (exists) {
        return res.render('./main/settings', { msg: "Username taken", ...await getUserData(req) });
    }

    const user = await User.findById(req.cookies.userID);
    user.userName = newUser;
    await user.save();
    res.redirect('/settings');
};

exports.changeEmail = async (req, res) => {
    const newEmail = req.body.email;
    const exists = await User.findOne({ email: newEmail });

    if (exists) {
        return res.render('./main/settings', { msg: "Email already used", ...await getUserData(req) });
    }

    const user = await User.findById(req.cookies.userID);
    user.email = newEmail;
    await user.save();
    res.redirect('/settings');
};

exports.changePassword = async (req, res) => {
    const newPass = await bcrypt.hash(req.body.password, 10);
    const user = await User.findById(req.cookies.userID);
    user.password = newPass;
    await user.save();
    res.redirect('/settings');
};

// Helper to reduce duplication
async function getUserData(req) {
    const user = await User.findById(req.cookies.userID);
    const avatars = await Avatar.find({});
    return {
        userName: user.userName,
        email: user.email,
        password: user.password,
        bio: user.bio,
        path: `/images/${req.cookies.userAvatar}`
    };
}
