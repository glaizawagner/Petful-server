const express = require('express');
//require('dotenv').config();
const userRouter = express.Router();
const jsonParser = express.Router();
const Queue = require('./queue');
const services = require('./cats/scratch');

let userQueue = services.userQueue;

userRouter
    .route('/')
    .get((req,res,next) => {
        let currUsr = services.currAnimal(userQueue);
        if(!currUsr){
            services.fillUserQueue();
            currUsr = services.currAnimal(userQueue);
        }
        res.status(200);
        res.json(currUsr);
    })
    .post(jsonParser,(req,res,next)=> {
        console.log(req.body);
        const { user } = req.body;
        services.addNewUser(user);
        res.status(201).json(userQueue);
    });
userRouter
    .route('/all')
    .get((req, res, next) => {
        if(userQueue.first === null){
            services.fillUserQueue();
        }
        let users = services.getAllUsers(userQueue);
        res.status(200);
        res.json(users);
    });


userRouter
    .route('/')
    .delete((req,res,next) => {
        services.removeUser();
        res.status(200).send({message: 'Successful Adoption'});
    });
    module.exports = userRouter;