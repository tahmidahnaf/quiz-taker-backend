let Router = require('express').Router()
let controllers = require('../controllers/controllers')

Router.get('/:adminId' , controllers.admin_get)
Router.get('/:adminId/:quizId' , controllers.admin_get_specific)
Router.post('/:adminId/:quizId', controllers.admin_post)

module.exports = Router