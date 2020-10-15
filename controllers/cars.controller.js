const Cars = require('../models/cars.model.js');
const mongoose = require('mongoose');

exports.create = function (req, res) {
    let carNew = new Cars({
        model: req.body.model,
        make: req.body.make,
        color: req.body.color,
        reg_number: req.body.reg,
        owner: req.body.owner,
        address: req.body.address,
        section: req.body.section
    });

    carNew.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Error occured while adding car to database: Car not added!!!" })
        } else {
            console.log(data);
            res.send(data);
        }
    })
}

exports.findAll = function (req, res) {
    Cars.find({ section: "cars" }, function (err, cars) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving car list. Sorry :|" });
        } else {
            res.send(cars)
        }
    })
}

exports.updateDataOne = function (req, res) {
    let query = {}
    let query2 = {}
    switch (req.body.filter) {
        case 'model':
            query = { model: `${req.body.filterUpdate}` };
            break;
        case 'make':
            query = { make: `${req.body.filterUpdate}` };
            break;
        case 'color':
            query = { color: `${req.body.filterUpdate}` };
            break;
        case 'reg_number':
            query = { reg_number: `${req.body.filterUpdate}` };
            break;
        case 'owner':
            query = { owner: `${req.body.filterUpdate}` };
            break;
        case 'address':
            query = { address: `${req.body.filterUpdate}` };
            break;
        default:
            break;
    }
    switch (req.body.propNew) {
        case 'model':
            query2 = { model: `${req.body.propData}` };
            break;
        case 'make':
            query2 = { make: `${req.body.propData}` };
            break;
        case 'color':
            query2 = { color: `${req.body.propData}` };
            break;
        case 'reg_number':
            query2 = { reg_number: `${req.body.propData}` };
            break;
        case 'owner':
            query2 = { owner: `${req.body.propData}` };
            break;
        case 'address':
            query2 = { address: `${req.body.propData}` };
            break;
        default:
            break;
    }

    Cars.findOneAndUpdate(query, query2, { new: true }, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            res.send("ERROR: Not Updated. " + err);
        } else {
            res.send('Updated!');
        }
    })
}

exports.updateAll = function (req, res) {
    let query = {}
    let query2 = {}
    switch (req.body.filter) {
        case 'model':
            query = { model: `${req.body.filterUpdate}` };
            break;
        case 'make':
            query = { make: `${req.body.filterUpdate}` };
            break;
        case 'color':
            query = { color: `${req.body.filterUpdate}` };
            break;
        case 'reg_number':
            query = { reg_number: `${req.body.filterUpdate}` };
            break;
        case 'owner':
            query = { owner: `${req.body.filterUpdate}` };
            break;
        case 'address':
            query = { address: `${req.body.filterUpdate}` };
            break;
        default:
            break;
    }
    switch (req.body.propNew) {
        case 'model':
            query2 = { model: `${req.body.propData}` };
            break;
        case 'make':
            query2 = { make: `${req.body.propData}` };
            break;
        case 'color':
            query2 = { color: `${req.body.propData}` };
            break;
        case 'reg_number':
            query2 = { reg_number: `${req.body.propData}` };
            break;
        case 'owner':
            query2 = { owner: `${req.body.propData}` };
            break;
        case 'address':
            query2 = { address: `${req.body.propData}` };
            break;
        default:
            break;
    }

    Cars.updateMany(query, query2, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            res.send("ERROR: Not Updated. " + err);
        } else {
            res.send('All Updated!');
        }
    })
}

exports.deleteOne = function (req, res) {
    Cars.findOneAndRemove({reg_number: `${req.body.reg}` }, function (err) {
        if (err) {
            console.log("ERROR: Blogs NOT removed. " + err);
            res.send("ERROR: Blogs NOT removed. " + err);
        } else {
            res.send('deleted!');
        }   
    })
}
