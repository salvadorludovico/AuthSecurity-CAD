const express = require('express');
const {connectDB} = require('./config/db');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/authentication', require('./routes/tokenValidation'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;