const PDFDocument = require('pdfkit');

exports.createBeautifulReport = (data, stream) => {
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(stream);

  // Styling
  doc.fillColor('#1e293b').fontSize(24).text('Interview Mastery Report', { align: 'center' });
  doc.moveDown();
  
  // Charts Summary (Textual representation for PDF)
  doc.fontSize(16).fillColor('#ec4899').text('Performance Metrics:');
  Object.keys(data.scores).forEach(key => {
    doc.fontSize(12).fillColor('#475569').text(`${key}: ${data.scores[key]}/100`);
  });

  doc.moveDown();
  doc.fontSize(16).fillColor('#ec4899').text('Detailed Feedback:');
  doc.fontSize(11).fillColor('#1e293b').text(data.feedback, { align: 'justify' });

  doc.end();
};