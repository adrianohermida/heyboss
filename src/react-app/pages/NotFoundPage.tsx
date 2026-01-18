import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
      <p className="mb-8">A página que você procura não existe.</p>
      <a href="#/" className="text-blue-400 underline">Voltar para a Home</a>
    </div>
  );
}
