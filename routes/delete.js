module.exports = function(app) {
    const car = require('../controllers/cars.controller.js');
    app.delete('/delete', car.deleteOne)
}