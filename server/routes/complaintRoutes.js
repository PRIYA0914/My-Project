const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Submit a new complaint
router.post('/', async (req, res) => {
    try {
        const complaint = new Complaint(req.body);
        await complaint.save();
        res.status(201).json({
            success: true,
            complaintId: complaint.complaintId,
            message: 'Complaint submitted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get complaint status
router.get('/:id/status', async (req, res) => {
    try {
        const complaint = await Complaint.findOne({ complaintId: req.params.id });
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }
        res.json({
            success: true,
            status: complaint.status,
            details: complaint
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;