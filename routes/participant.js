let Router = require('express').Router()
let controllers = require('../controllers/controllers')

Router.get('/:adminId/:quizId/:participant', controllers.check_participant)
Router.post('/:adminId/:quizId/:participant', controllers.participate_post)

module.exports = Router