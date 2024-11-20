const editor = document.getElementById('editor');
const fontSizeSelect = document.getElementById('fontSize');

// Ustawienie domyślnego rozmiaru czcionki
let currentFontSize = '16px';

// Funkcja ustawiająca styl dla bieżącego zaznaczenia
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
  applyFontSize(currentFontSize);
  editor.focus(); // Utrzymanie fokusu na edytorze
});

// Nasłuch na wprowadzanie nowego tekstu
editor.addEventListener('input', () => {
  const children = editor.childNodes;
  children.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const span = document.createElement('span');
      span.style.fontSize = currentFontSize;
      span.textContent = child.textContent;
      editor.replaceChild(span, child);
    }
  });
});

// Obsługa zapisu
document.getElementById('saveBtn').addEventListener('click', async () => {
  const content = editor.innerHTML; // Pobranie treści edytora jako HTML
  const success = await window.electronAPI.saveFile(content);

  if (success) {
    alert('Plik zapisany pomyślnie!');
  } else {
    alert('Zapis anulowany.');
  }
});
