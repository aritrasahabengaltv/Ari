const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/photovault';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.error('MongoDB connection error:', err));

// Photo Schema
const photoSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    category: String,
    headline: String,
    imageData: String, // base64
    fileSize: Number,
    createdAt: { type: Date, default: Date.now },
});

const Photo = mongoose.model('Photo', photoSchema);

// Storage Limit: 1GB = 1024 * 1024 * 1024 bytes
const STORAGE_LIMIT = 1024 * 1024 * 1024;

// ----- Routes -----

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Photo Vault API is running' });
});

// Get all photos for a category
app.get('/api/photos', async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }
        const photos = await Photo.find({ category }).select('id headline imageData createdAt');
        res.json({ photos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search photos by headline
app.get('/api/photos/search', async (req, res) => {
    try {
        const { category, headline } = req.query;
        if (!category || !headline) {
            return res.status(400).json({ error: 'Category and headline are required' });
        }
        const photos = await Photo.find({
            category,
            headline: { $regex: headline, $options: 'i' }
        }).select('id headline imageData createdAt');
        res.json({ photos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload photo
app.post('/api/photos', async (req, res) => {
    try {
        const { category, headline, imageData } = req.body;

        if (!category || !headline || !imageData) {
            return res.status(400).json({ error: 'Missing required fields: category, headline, imageData' });
        }

        // Calculate file size (base64 is roughly 4/3 of binary size)
        const fileSizeBytes = Math.ceil((imageData.length * 3) / 4);

        // Check storage limit
        const totalSize = await Photo.aggregate([
            { $group: { _id: null, totalSize: { $sum: '$fileSize' } } }
        ]);
        const currentUsage = totalSize[0]?.totalSize || 0;

        if (currentUsage + fileSizeBytes > STORAGE_LIMIT) {
            return res.status(413).json({
                error: 'Storage limit exceeded (1GB max). Please delete some photos.',
                currentUsageMB: Math.round(currentUsage / (1024 * 1024)),
                limitMB: 1024
            });
        }

        // Create photo document
        const photo = new Photo({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            category,
            headline: headline.trim(),
            imageData,
            fileSize: fileSizeBytes,
        });

        await photo.save();
        res.status(201).json({ id: photo.id, message: 'Photo uploaded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete photo
app.delete('/api/photos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Photo.findOneAndDelete({ id });
        if (!result) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        res.json({ message: 'Photo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get storage usage
app.get('/api/storage', async (req, res) => {
    try {
        const totalSize = await Photo.aggregate([
            { $group: { _id: null, totalSize: { $sum: '$fileSize' } } }
        ]);
        const usedBytes = totalSize[0]?.totalSize || 0;
        const usedMB = Math.round(usedBytes / (1024 * 1024));
        const limitMB = Math.round(STORAGE_LIMIT / (1024 * 1024));

        res.json({
            usedBytes,
            usedMB,
            limitMB,
            percentUsed: Math.round((usedBytes / STORAGE_LIMIT) * 100)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Photo Vault API running on port ${PORT}`);
    console.log(`📡 Database: ${MONGODB_URI}`);
    console.log(`💾 Storage limit: 1GB`);
});

module.exports = app;