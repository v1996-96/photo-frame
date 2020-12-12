require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const errorHandler = require('./middlewares/error-handler');
const auth = require('./controllers/auth');
const gallery = require('./controllers/gallery');
const forismatic = require('./controllers/forismatic');

// Setup express server
let server;
const app = express();
const port = process.env.PORT || 3000;

// Setup DB connection
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB error:'));

// Setup express middlewares
app.use(compression());
app.use(express.static(process.env.STATIC_PATH));
app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use('/api/gallery', gallery);
app.use('/api/forismatic', forismatic);
app.use(errorHandler);

// Start server
mongoose.connection.once('open', () => {
    app.locals.db = mongoose.connection;

    server = app.listen(port, () => {
        console.log(`Photo frame app listening at http://localhost:${port}`);
        process.send('ready');
    });
});

// Close connection on process end
process.on('SIGINT', function () {
    mongoose.connection.close();

    if (server) {
        server.close();
    }
});
