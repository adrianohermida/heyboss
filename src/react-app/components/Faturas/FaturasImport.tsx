import React from 'react';
// ...tokenized CSS, mobile-first, accessible...
export default function FaturasImport({ onImport }) {
  return (
    <div className="py-2">
      <label htmlFor="import-faturas" className="sr-only">Importar Faturas</label>
      <input id="import-faturas" type="file" accept=".csv,.xls,.xlsx" onChange={e => onImport && onImport(e.target.files[0])} className="border rounded px-2 py-1" />
    </div>
  );
}
