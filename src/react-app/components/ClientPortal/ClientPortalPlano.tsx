import React from 'react';
import { useTheme } from '../../../styles/ThemeProvider';
import clsx from 'clsx';

const ClientPortalPlano: React.FC = () => {
  const { mode } = useTheme();
  // TODO: Integrar lógica de planos (fetch, exibição, simulação, etc)
  return (
    <div
      className={clsx(
        'rounded-lg p-6 shadow',
        mode === 'clear'
          ? 'bg-white text-gray-900 border border-gray-200'
          : 'bg-card text-white border border-border'
      )}
    >
      <h2 className="text-2xl font-bold mb-4">Plano de Repactuação</h2>
      {/* Adicione aqui a UI e lógica de planos do cliente */}
      <p>Funcionalidade de plano em desenvolvimento.</p>
    </div>
  );
};

export default ClientPortalPlano;
