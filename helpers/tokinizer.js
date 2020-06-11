const jwt = require('jsonwebtoken');

const {wordsEnum: {JWT_REFRESH_SECRET, JWT_SECRET}} = require('../constants');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '1d'});

    return{
        access_token,
        refresh_token
    }
}


