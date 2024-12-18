// const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();

// const { UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
    // check header

    const authHeader = req.headers["authorization"]
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer") || authHeader === "undefined") {
        return res.send("authentication invalid")
    }
    let token;
    console.log("after token")
    try {
        token = authHeader.split(" ")[1]

    } catch (err) {

        return res.send("error on header")
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
        return res.status(404).send("non authorized");
    }

    req.user = {
        userID: payload.userId,
        name: payload.name
    }
    next();

}

module.exports = { auth }