import React from 'react';
// ...tokenized CSS, mobile-first, accessible...
export default function FaturasExport({ faturas }) {
  const handleExport = () => {
    // lógica de exportação CSV/XLS
  };
  return (
    <button className="bg-primary text-white px-3 py-1 rounded" onClick={handleExport} aria-label="Exportar Faturas">Exportar Faturas</button>
  );
}
