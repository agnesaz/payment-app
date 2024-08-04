const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const paymentProviderRoutes = require('./routes/paymentProviderRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const apiLogger = require('./middleware/apiLoggerMiddleware');


dotenv.config();

const app = express();

app.use(apiLogger);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// Connect to the database
db.connect();


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the payment app!');
});

app.use('/api/users', userRoutes);
app.use('/api/providers', paymentProviderRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
