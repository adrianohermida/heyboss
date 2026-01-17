import React from 'react';
// ...tokenized CSS, mobile-first, accessible...
export default function PublicacoesIAExtract({ publicacao, onExtract }) {
  const handleExtract = () => {
    // lógica de extração automática de dados via IA
    if (onExtract) onExtract({ id: publicacao.id, dadosExtraidos: {} });
  };
  return (
    <button className="bg-secondary text-white px-3 py-1 rounded" onClick={handleExtract} aria-label="Extrair Dados IA">Extrair Dados IA</button>
  );
}
