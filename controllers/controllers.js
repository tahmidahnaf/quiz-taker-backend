let mongoose = require('mongoose');
let schema = require('../schema/admin');
let Quiz = mongoose.model('quiz', schema)


module.exports.admin_get = async (req, res) => {
    let adminData = await Quiz.findOne({"admin.name" : req.params.adminId , id : req.params.quizId}, { "id": 0 , "_id" : 0 , "__v" : 0 , "admin._id" : 0 , "participants" : 0 })
    if (adminData != null) {
        res.end(JSON.stringify(adminData))
    }
    else {
        res.status(403).end("Invalid admin id or quiz id")
    }
}


module.exports.admin_post = async (req, res) => {
    try {
        let quizDocument = new Quiz({
            id: req.params.quizId,
            admin: {
                name: req.params.adminId,
                time: req.body.time,
                questions: req.body.questions 
            },
            participants : []
        })
        await quizDocument.save()
        res.end()
    }
    catch (err) {
        if (err.code === 11000) {
            res.status(403).end('Admin of same id can\'t make quizzes of same id')
        }
    }
}

module.exports.check_participant = async (req, res) => {
    let participants = await Quiz.findOne({ "admin.name": req.params.adminId, "participants.name": req.params.participant }, { "id": 0, "_id": 0, "__v": 0, "admin": 0 })
    let participantAvailable
    try {
        participantAvailable = Boolean(Object.values(JSON.parse(JSON.stringify(participants)))[0].filter(participant => participant.name == req.params.participant)[0])
    }
    catch (err) {
        participantAvailable = false
    }
    res.status(403).end(JSON.stringify(participantAvailable))
}

module.exports.participate_post = async (req, res) => {
    let admin = await Quiz.findOne({ "admin.name": req.params.adminId }, { "id": 0, "_id": 0, "__v": 0, "admin._id": 0, "participants": 0 })
    let participants = await Quiz.findOne({ "admin.name": req.params.adminId, "participants.name": req.params.participant }, { "id": 0, "_id": 0, "__v": 0, "admin": 0 })
    let participantAvailable
    try {
        participantAvailable = Boolean(Object.values(JSON.parse(JSON.stringify(participants)))[0].filter(participant => participant.name == req.params.participant)[0])
    }
    catch (err) {
        participantAvailable = false
    }

    if (!participantAvailable) {
        let participantValues = {
            name: req.params.participant,
            time: req.body.time,
            questions: req.body.questions,
            marks : 0
        }
        participantValues.questions.forEach(participantQuestion => {
            admin.admin.questions.forEach(adminQuestion => {
                if (participantQuestion.question == adminQuestion.question && JSON.stringify(participantQuestion.options) == JSON.stringify(adminQuestion.options)) {
                    participantQuestion.mark = (Number(participantQuestion.answer === adminQuestion.answer))
                    participantValues.marks += Number(participantQuestion.answer === adminQuestion.answer)
                }
            })
        });
        
        await Quiz.updateMany({"admin.name" : req.params.adminId} , {$push : {participants : participantValues}})
        res.end()
    }
    else {
        res.status(403).send('This participant already exist .')
    }
}

module.exports.result_get = async (req, res) => {
    let participants = await Quiz.findOne({ "admin.name": req.params.adminId }, { "id": 0, "_id": 0, "__v": 0, "admin": 0 })
    res.end(JSON.stringify(participants.participants))
}

module.exports.result_get_specific = async (req, res) => {
    let participants = await Quiz.findOne({ "admin.name": req.params.adminId,id : req.params.quizId, "participants.name": req.params.participant }, { "id": 0, "_id": 0, "__v": 0, "admin": 0 })
    let specificParticipant
    try {
        specificParticipant = Object.values(JSON.parse(JSON.stringify(participants)))[0].filter(participant => participant.name == req.params.participant)[0]
    }
    catch (err) {
        specificParticipant = 'No participant Found'
    }
    res.end(JSON.stringify(specificParticipant))
}