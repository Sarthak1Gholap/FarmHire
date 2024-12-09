const dotenv = require('dotenv');

const loadEnv = () => {
    dotenv.config();
    console.log("Environment variables loaded.");
};

module.exports = loadEnv;
