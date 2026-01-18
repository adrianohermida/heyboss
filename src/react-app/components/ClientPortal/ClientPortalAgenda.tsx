import React from 'react';
import { useTheme } from '../../../styles/ThemeProvider';
import clsx from 'clsx';

const ClientPortalAgenda: React.FC = () => {
  const { mode } = useTheme();
  // TODO: Integrar lógica de agenda (fetch, exibição, agendamento, etc)
  return (
    <div
      className={clsx(
        'rounded-lg p-6 shadow',
        mode === 'clear'
          ? 'bg-white text-gray-900 border border-gray-200'
          : 'bg-card text-white border border-border'
      )}
    >
      <h2 className="text-2xl font-bold mb-4">Agenda</h2>
      {/* Adicione aqui a UI e lógica de agenda do cliente */}
      <p>Funcionalidade de agenda em desenvolvimento.</p>
    </div>
  );
};

export default ClientPortalAgenda;
