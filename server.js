const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB Atlas connection error:', err));

// Load routes
const profileRoutes = require('./routes/profiles');
const medicalRecordRoutes = require('./routes/medicalRecords');
const medicationRoutes = require('./routes/medications');
const vitalSignsRoutes = require('./routes/vitalSigns');

// Middleware
app.use(cors());
app.use(express.json());

// Basic security middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Health API Server Running',
        version: '1.0.0',
        endpoints: {
            profiles: '/api/profiles',
            medicalRecords: '/api/medical-records',
            medications: '/api/medications',
            vitalSigns: '/api/vital-signs'
        }
    });
});

// Use routes
app.use('/api/profiles', profileRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/vital-signs', vitalSignsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
