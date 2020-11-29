require('dotenv').config();
const cluster = require('cluster');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const errorHandler = require('./middlewares/error-handler');
const auth = require('./controllers/auth');
const gallery = require('./controllers/gallery');

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
    // Fork workers
    for (var i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    // Setup express server
    const app = express();
    const port = process.env.PORT || 3000;

    // Setup DB connection
    mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB error:'));

    // Setup express middlewares
    app.use(compression());
    app.use(bodyParser.json());
    app.use('/auth', auth);
    app.use('/gallery', gallery);
    app.use(errorHandler);

    // Start server
    mongoose.connection.once('open', () => {
        app.locals.db = mongoose.connection;

        app.listen(port, () => {
            console.log(`Photo frame app listening at http://localhost:${port}`);
        });
    });

    // Close connection on process end
    process.on('SIGINT', function () {
        mongoose.connection.close();
    });
}
