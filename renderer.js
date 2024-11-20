const editor = document.getElementById('editor');
const fontSizeSelect = document.getElementById('fontSize');

let currentFontSize = '16px';

function applyFontSize(size) {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = size;
    range.surroundContents(span);
  }
}


fontSizeSelect.addEventListener('change', (event) => {
  currentFontSize = event.target.value + 'px';
  applyFontSize(currentFontSize);
  editor.focus(); 
});

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

document.getElementById('saveBtn').addEventListener('click', async () => {
  const content = editor.innerHTML; 
  const success = await window.electronAPI.saveFile(content);

  if (success) {
    alert('Plik zapisany pomyślnie!');
  } else {
    alert('Zapis anulowany.');
  }
});
