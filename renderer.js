const paperContainer = document.getElementById('paperContainer');
const fontSizeSelect = document.getElementById('fontSize');
const saveBtn = document.getElementById('saveBtn');

let currentFontSize = '16px';

// Funkcja zmiany rozmiaru czcionki na zaznaczonym tekście
function applyFontSize(size) {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = size;
    range.surroundContents(span);
  }
}

// Obsługa zmiany rozmiaru czcionki
fontSizeSelect.addEventListener('change', (event) => {
  currentFontSize = event.target.value + 'px';
});

// Funkcja dodająca nową kartkę
function addNewPaper() {
  const newPaper = document.createElement('div');
  newPaper.classList.add('paper');
  newPaper.contentEditable = 'true';
  paperContainer.appendChild(newPaper);
  newPaper.focus();
}

// Funkcja sprawdzająca, czy ostatnia kartka jest pełna
function checkIfLastPaperFull() {
  const papers = document.querySelectorAll('.paper');
  const lastPaper = papers[papers.length - 1];

  // Jeśli zawartość ostatniej kartki wychodzi poza widoczny obszar, dodaj nową
  if (lastPaper.scrollHeight > lastPaper.offsetHeight) {
    addNewPaper();
    paperContainer.scrollTop = paperContainer.scrollHeight; // Przewiń na dół
  }
}

// Nasłuchiwanie na zmiany w edytorze
paperContainer.addEventListener('input', () => {
  checkIfLastPaperFull();
});

// Zapis treści do pliku DOCX
saveBtn.addEventListener('click', async () => {
  const papers = document.querySelectorAll('.paper');
  let content = '';

  papers.forEach((paper) => {
    content += `<div style="page-break-after: always;">${paper.innerHTML}</div>`;
  });

  const success = await window.electronAPI.saveFile(content);

  if (success) {
    alert('Plik zapisany pomyślnie!');
  } else {
    alert('Zapis anulowany.');
  }
});

// Dodajemy pierwszą kartkę przy starcie
addNewPaper();
