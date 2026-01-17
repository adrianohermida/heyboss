import React from 'react';
// ...tokenized CSS, mobile-first, accessible...
export default function PublicacoesExport({ publicacoes }) {
  const handleExport = () => {
    // lógica de exportação para relatórios externos (CSV/XLS)
  };
  return (
    <button className="bg-primary text-white px-3 py-1 rounded" onClick={handleExport} aria-label="Exportar Publicações">Exportar Publicações</button>
  );
}
