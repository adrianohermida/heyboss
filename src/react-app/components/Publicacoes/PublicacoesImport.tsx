import React from 'react';
// ...tokenized CSS, mobile-first, accessible...
export default function PublicacoesImport({ onImport }) {
  return (
    <div className="py-2">
      <label htmlFor="import-publicacoes" className="sr-only">Importar Publicações</label>
      <input id="import-publicacoes" type="file" accept=".csv,.xls,.xlsx" onChange={e => onImport && onImport(e.target.files[0])} className="border rounded px-2 py-1" />
    </div>
  );
}
