require('dotenv').config();

const cors = require('cors');
const express = require('express');
const keycloak = require('./middlewares/keycloak');
const books = require('./routes/books');

const port = process.env.PORT;

const errorHandler = (error, req, res, next) => {
    const status = error.status || 422;
    res.status(status).send(error.message);
}

const app = express();

app.use(keycloak.middleware());
app.use(express.json());
app.use(cors());
app.use('/api', books);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});