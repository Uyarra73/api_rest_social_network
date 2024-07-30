// Import dependencies
const jwt = require('jwt-simple');
const moment = require('moment');

// Secret key
const secretKey = 'your_secret_key_SOCIAL_NETWORK_1973';

// Create JWT token
const createToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    // Return encoded jwt token
    return jwt.encode(payload, secretKey);
}

module.exports = {
    secretKey,
    createToken
}