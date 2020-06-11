const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');

dotenv.config();
const {PORT} = require('./config')
const db = require('./dataBase').getInstance()
db.setModels();

const app = express();

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'));

const {authRouter ,userRouter} = require('./routes');


app.use('/auth', authRouter)
app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    let message = err.message;

    if (err.parent){
        message = err.parent.sqlMessage;
    }

    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listen ${PORT}...`);
    }
})

process.on("unhandledRejection", reason => {
    console.log('Unhandled error');

    process.exit(0);
})
