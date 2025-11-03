const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    complaintCategory: {
        type: String,
        required: true
    },
    complaintSubCategory: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateOfIncident: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    urgencyLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending', 'under-review', 'in-progress', 'resolved', 'rejected'],
        default: 'pending'
    },
    complaintId: {
        type: String,
        unique: true
    },
    attachments: {
        type: String
    }
}, {
    timestamps: true
});

// Generate complaint ID before saving
complaintSchema.pre('save', function(next) {
    if (!this.complaintId) {
        this.complaintId = 'GRS' + Date.now();
    }
    next();
});

module.exports = mongoose.model('Complaint', complaintSchema);