// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const dbURL = process.env.ATLAS_URI;
const dbName = "APP"; // Name of your MongoDB database
let db;

const connectToDB = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');
        db = mongoose.connection.db;
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

const getCollection = (collectionName) => {
    if (!db) {
        throw new Error('❌ DB connection not established. Call connectToDB() first.');
    }
    return db.collection(collectionName);
};

module.exports = {
    connectToDB,
    getCollection
};
