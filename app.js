const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const Avatar = require('./models/Avatar')
const Game = require('./models/Game')
const User = require('./models/User')
const { decode } = require('html-entities');

// Load .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// MongoDB connection (using native MongoClient)
const { connectToDB } = require('./config/db');

// Start MongoDB
(async () => {
    try {
        await connectToDB();
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
})();

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'baseLayout'); // ✅ default layout
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/quiz', require('./routes/quiz'));
app.use('/profile', require('./routes/profile'));
app.use('/leaderboard', require('./routes/leaderboard'));
app.use('/settings', require('./routes/settings'));

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found', error: {} });
});

module.exports = app;
