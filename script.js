document.addEventListener('DOMContentLoaded', () => {
    initializeSpreadsheet(5, 5);
});

function initializeSpreadsheet(rows, cols) {
    const spreadsheet = document.getElementById('spreadsheet');
    spreadsheet.innerHTML = '';
    spreadsheet.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = createCell(i, j);
            spreadsheet.appendChild(cell);
        }
    }
}

function createCell(row, col) {
    const cell = document.createElement('input');
    cell.type = 'text';
    cell.className = 'cell';
    cell.setAttribute('data-row', row);
    cell.setAttribute('data-col', col);
    cell.addEventListener('input', handleCellInput);
    return cell;
}

function handleCellInput(event) {
    const row = event.target.getAttribute('data-row');
    const col = event.target.getAttribute('data-col');
    updateCellDependencies(row, col);
}

function updateCellDependencies(row, col) {
    // Implement logic to update cell dependencies and recalculate formulas
}

function addRow() {
    const spreadsheet = document.getElementById('spreadsheet');
    const cols = spreadsheet.style.gridTemplateColumns.split(' ').length;
    const rows = spreadsheet.childNodes.length / cols;

    for (let j = 0; j < cols; j++) {
        const cell = createCell(rows, j);
        spreadsheet.appendChild(cell);
    }
}

function addColumn() {
    const spreadsheet = document.getElementById('spreadsheet');
    const cols = spreadsheet.style.gridTemplateColumns.split(' ').filter(Boolean).length + 1;
    const rows = spreadsheet.childNodes.length / (cols - 1);

    spreadsheet.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        const cell = createCell(i, cols - 1);
        spreadsheet.appendChild(cell);
    }
}

function deleteRow() {
    const spreadsheet = document.getElementById('spreadsheet');
    const cols = spreadsheet.style.gridTemplateColumns.split(' ').filter(Boolean).length;
    const rows = spreadsheet.childNodes.length / cols;

    for (let j = 0; j < cols; j++) {
        const cell = spreadsheet.querySelector(`.cell[data-row="${rows - 1}"][data-col="${j}"]`);
        if (cell) {
            spreadsheet.removeChild(cell);
        }
    }
}

function deleteColumn() {
    const spreadsheet = document.getElementById('spreadsheet');
    const cols = spreadsheet.style.gridTemplateColumns.split(' ').filter(Boolean).length - 1;
    const rows = spreadsheet.childNodes.length / (cols + 1);

    spreadsheet.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        const cell = spreadsheet.querySelector(`.cell[data-row="${i}"][data-col="${cols}"]`);
        if (cell) {
            spreadsheet.removeChild(cell);
        }
    }
}

function calculateSum() {
    const formula = document.getElementById('formula').value;
    const cells = parseFormula(formula);
    const sum = cells.reduce((acc, cell) => {
        const cellValue = parseFloat(document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`).value) || 0;
        return acc + cellValue;
    }, 0);
    alert(`Sum: ${sum}`);
}

function calculateDifference() {
    const formula = document.getElementById('formula').value;
    const cells = parseFormula(formula);
    if (cells.length < 2) {
        alert('Difference requires at least two cells.');
        return;
    }
    const difference = cells.reduce((acc, cell, index) => {
        const cellValue = parseFloat(document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`).value) || 0;
        return index === 0 ? cellValue : acc - cellValue;
    }, 0);
    alert(`Difference: ${difference}`);
}

function calculateAverage() {
    const formula = document.getElementById('formula').value;
    const cells = parseFormula(formula);
    const sum = cells.reduce((acc, cell) => {
        const cellValue = parseFloat(document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`).value) || 0;
        return acc + cellValue;
    }, 0);
    const average = sum / cells.length;
    alert(`Average: ${average}`);
}

function parseFormula(formula) {
    // Example formula parsing, assuming format "A1, B2, C3"
    const cellRefs = formula.split(',').map(ref => ref.trim());
    return cellRefs.map(ref => {
        const row = parseInt(ref.substring(1)) - 1; // Subtract 1 for zero-based index
        const col = ref.charCodeAt(0) - 'A'.charCodeAt(0); // Convert 'A' to 0, 'B' to 1, etc.
        return { row, col };
    });
}
