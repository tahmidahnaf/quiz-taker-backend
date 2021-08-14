let Router = require('express').Router()
let controllers = require('../controllers/controllers')

Router.get('/:adminId/:quizId' , controllers.admin_get)
Router.post('/:adminId/:quizId', controllers.admin_post)

module.exports = Router