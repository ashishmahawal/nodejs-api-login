const express = require("express");
const bodyParser = require("body-parser");
const utils = require("./utils/utils");
const userUtil = require('./utils/user')
const middleware = require('./middleware');
const auth = require('./auth/jwt')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger_output.json')
const cors = require('cors')

module.exports = {
    express,
    bodyParser,
    utils,
    userUtil,
    middleware,
    auth,
    swaggerUi,
    swaggerFile,
    cors
}