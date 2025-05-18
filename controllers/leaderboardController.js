const Game = require('../models/Game');
const User = require('../models/User');
const Avatar = require('../models/Avatar');

exports.getLeaderboard = async (req, res) => {
   try {
        const rawCategory = req.params.category || req.query.category;
        let filter = {};

        if (rawCategory) {
            if (rawCategory=== "-1") {
                const startOfDay = new Date();
                startOfDay.setUTCHours(0, 0, 0, 0); 
                const endOfDay = new Date();
                endOfDay.setUTCHours(23, 59, 59, 999);

                filter = {
                    category: "-1",
                    date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                    }
                };
            } else {
                filter.category = rawCategory;
            }
        } else {
            filter.category = { $ne: -1 };
        }
        const topGames = await Game.find(filter).sort({ score: -1, TPQ: 1 }).limit(10);
        const users = await User.find({});
        const avatars = await Avatar.find({});

        res.render('./main/leaderboard', {
            extraCSS: '/Stylesheets/profile.css',
            extraScript: null,
            rankings: topGames,
            userID: req.cookies.userID,
            users,
            path: `/images/${avatars.find(a => a.imgID == req.cookies.imgID)?.path}`
        });
    
    } catch (err) {
        console.error(err);
        res.status(500).send("Leaderboard error");
    }
};
