require("dotenv").config();
const express = require("express");
const connectDB = require('./config/db');
const helmet = require("helmet");
const mongoSanitize = "express-mongo-sanitize";
const xss = require('xss');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app = express();
connectDB();


app.use(helmet(``));
app.use(mongoSanitize());
app.use(xss());
app.use(express.json());
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use(require('./middlewares/errorMiddleware'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running ob port ${PORT}`)
});