const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const router = require('./routes/userrouter');
const ApiError = require('../utils/apiError');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(router)

app.all('*', (req, res, next) => {
    next(new ApiError('Routes does not exist', 404))
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
