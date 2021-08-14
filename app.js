let express = require('express');
let mongoose = require('mongoose');
require('dotenv').config()
let adminRoute = require('./routes/admin');
let participateRoute = require('./routes/participant');
let resultRoute = require('./routes/result');

let app = express()

app.use(express.json())

app.use('/admin/', adminRoute)
app.use('/participate/', participateRoute)
app.use('/result/', resultRoute)


mongoose.connect(`mongodb+srv://tahmid:g8gYEKgu3plGKjmT@cluster0.mv3ei.mongodb.net/quiz-taker`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    app.listen(3000)
})