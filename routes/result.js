let Router = require('express').Router()
let controllers = require('../controllers/controllers')

Router.get('/:adminId/:quizId', controllers.result_get)
Router.get('/:adminId/:quizId/:participant' , controllers.result_get_specific)

module.exports = Router