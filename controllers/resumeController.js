const { generateAIResponse } = require('../aiBridge');
const PDFDocument = require('pdfkit');

exports.rateResume = async (req, res) => {
  const { resumeText } = req.body;
  const prompt = `Rate this resume...`;

  try {
    const rating = await generateAIResponse(prompt, "You are an ATS optimization expert.");
    res.json(JSON.parse(rating)); // This remains the same
  } catch (err) {
    res.status(500).json({ error: "AI Processing Failed" });
  }
};

exports.downloadReport = async (req, res) => {
  const { data } = req.body;
  const doc = new PDFDocument();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=resume-report.pdf');
  
  doc.fontSize(25).text('Resume Analysis Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`Overall Score: ${data.score}/100`);
  doc.fontSize(12).text(data.summary);
  // ... Add loops for improvements
  
  doc.pipe(res);
  doc.end();
};