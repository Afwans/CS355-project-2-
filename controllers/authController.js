const User = require('../models/User');
const bcrypt = require('bcrypt');
const Avatar = require('../models/Avatar');

// GET: render signup
exports.getSignup = (req, res) => {
    res.render('./auth/signup', { msg: null, extraCSS: '/Stylesheets/auth.css', extraScript:null});
};

// POST: create account
exports.signup = async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.render('./auth/signup', { msg: "All fields are required." });
    }

    const existingEmail = await User.findOne({ email: email}).exec();
    const existingUser = await User.findOne({ userName: userName }).exec();

    if (existingEmail) return res.render('./auth/signup', { msg: "Email is already used." });
    if (existingUser) return res.render('./auth/signup', { msg: "Username already taken." });

    const hashed = await bcrypt.hash(password, 10);
    const newUser= await User.create({
        "userName":userName,
        "email":email,
        "password": hashed

    });
    const user = await User.findOne({ email });
    res.cookie("userID", ((user)._id.valueOf()));
    res.cookie("imgID", "0");
    res.cookie("userName", userName);
    res.cookie("userAvatar", "blankProfile.jpeg")
    res.cookie("loggin", "true");
    res.redirect("/quiz");
};

// GET: render signin
exports.getSignin = (req, res) => {
    res.render('./auth/signin', { msg: null, extraCSS: '/Stylesheets/auth.css', extraScript:null });
};

// POST: login
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.render('./auth/signin', { msg: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user) return res.render('./auth/signin', { msg: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('./auth/signin', { msg: "Invalid credentials." });

    const avatars = await Avatar.find({});
    res.cookie("userID", ((user)._id.valueOf()));
    res.cookie("userName", user.userName);
    res.cookie("imgID", user.imgID);
    res.cookie("userAvatar", avatars.find(a=> a.imgID === (user.imgID)).path);
    res.cookie("loggin", "true");
    res.redirect("/quiz");
};

// GET: logout
exports.logout = (req, res) => {
    res.clearCookie("userID");
    res.clearCookie("userAvatar");
    res.clearCookie("imgID");

    res.cookie("loggin", "false");
    res.redirect("/");
};
