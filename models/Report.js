const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['resume', 'interview'] },
  data: Object, // Stores scores, analysis, etc.
  downloadUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);