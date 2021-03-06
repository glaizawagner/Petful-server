const express = require('express');
//require('dotenv').config();
const dogRouter = express.Router();
const Queue = require('./queue');
const services = require('./cats/scratch');

// endpoints for getting Dogs

let dogQueue = services.dogQueue;

dogRouter
    .route('/')
    .get((req, res, next) => {
        let currDog = services.currAnimal(dogQueue);
        if (!currDog) {
            services.fillDogQueue();
            currDog = services.currAnimal(dogQueue);
        }
        dogQueue.dequeue();
        res.status(200);
        res.json(currDog);
    });

dogRouter
    .route('/')
    .delete((req, res, next) => {
        dogQueue.dequeue();
        res.status(200).send({ message: 'Successful Adoption' });
    });

// endpoints for deleting dogs

module.exports = dogRouter;