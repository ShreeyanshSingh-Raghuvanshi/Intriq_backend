const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for OAuth users
  googleId: String,
  isPremium: { type: Boolean, default: false },
  subscriptionPlan: { type: String, enum: ['none', 'monthly', 'half-yearly', 'yearly'], default: 'none' },
  profileContext: {
    resumeUrl: String,
    skills: [String],
    jobRole: String,
    experienceLevel: String,
    targetInterviewType: String // hr, tech, behavioural
  },
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);