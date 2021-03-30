const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDb = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT;

// Connect to database
connectDb();

// Route files
const bootcamps = require('./routes/bootcampsRouter');
const courses = require('./routes/coursesRouter');

const app = express();

// Body parser
app.use(express.json());

// File uploading
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
