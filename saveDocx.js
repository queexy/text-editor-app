const { Document, Packer, Paragraph, TextRun } = require('docx');

/**
 * Zamienia HTML na dokument docx
 * @param {string} htmlContent - Treść w HTML (z edytora)
 * @param {function} callback - Funkcja zwrotna z buforem
 */
function saveAsDocx(htmlContent, callback) {
  // Rozbij HTML na linie, ignorując tagi <br>
  const lines = htmlContent.split(/<div>|<\/div>|<br>/).filter((line) => line.trim() !== '');

  // Tworzy akapity z treści
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
