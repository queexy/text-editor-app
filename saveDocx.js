const { Document, Packer, Paragraph, TextRun } = require('docx');


function saveAsDocx(htmlContent, callback) {

  const lines = htmlContent.split(/<div>|<\/div>|<br>/).filter((line) => line.trim() !== '');

  
  const paragraphs = lines.map((line) =>
    new Paragraph({
      children: [new TextRun(line)],
    })
  );

  const doc = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });

  Packer.toBuffer(doc)
    .then(callback)
    .catch((err) => console.error('Błąd podczas tworzenia pliku DOCX:', err));
}

module.exports = { saveAsDocx };
