const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')

import router from './routing/index.js'

import * as dotenv from 'dotenv'

/*-------------------------- SETTINGS -------------------------*/

const app = express()

mongoose.set('strictQuery', true)
dotenv.config()
mongoose.connect('mongodb+srv://admin:admin@db.adx4jrh.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Successfully connected to DB")
    ).catch(() => console.log("Failed connection to DB"))

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use('/uploads', express.static('uploads'))
app.use('/api', router)


const storage = multer.diskStorage({
    destination:(_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, `${file.originalname}.jpg`)
    }
})

const upload = multer({storage})

app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200)
})

/*-------------------------- RUNNING SERVER --------------------------*/

app.listen(process.env.PORT, (err) => {
    if (err) console.log("Server doesn't work")
    else console.log(`Server started at port ${process.env.PORT}`)
})