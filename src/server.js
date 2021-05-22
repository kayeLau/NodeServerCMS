const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const initControllers = require('./controllers');
const mongoose = require('mongoose');
var cors = require('cors');

//mongo模塊
const mongoDB = 'mongodb://localhost/my_test';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));


const server = express();
const port = parseInt(process.env.PORT || 9000);
const publicDir = resolve('public'); //方法会将路径或路径片段的序列解析为绝对路径,即 00-static/
const mouldsDir = resolve('src/moulds');

async function bootstrap(){
    server.options('*', cors()) //允許 CORS Pre-Flight,複雜請求必需設置
    server.use(express.static(publicDir));
    server.use('/moulds',express.static(mouldsDir))
    server.use(await initControllers());
    await promisify(server.listen.bind(server,port))();
    console.log(`>Started on port ${port}`)
}

bootstrap();



