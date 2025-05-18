const express = require('express');
const router = express.Router();

// GET Home Page
router.get('/', (req, res) => {
    res.render('main/index', {
        extraCSS: '/Stylesheets/homepage.css'
    });
});

router.get("/getUser", (req, res) => {
  res.send(req.cookies.userName);
});

module.exports = router;
