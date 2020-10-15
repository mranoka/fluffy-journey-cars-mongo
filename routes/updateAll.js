module.exports = function (app) {
    const car = require('../controllers/cars.controller.js');
    app.put('/putAll', car.updateAll);
}