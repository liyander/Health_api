const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/health_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const Profile = require('./models/UserProfile');

// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Health API Server Running');
});


app.post('/api/profiles', async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get profile endpoint
app.get('/api/profiles/:userId', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});