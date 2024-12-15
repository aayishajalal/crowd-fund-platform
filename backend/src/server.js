const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
  credentials: true, // Allow credentials if necessary (cookies, sessions, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());

// Import all routes from "src/routes/index.js"
const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
