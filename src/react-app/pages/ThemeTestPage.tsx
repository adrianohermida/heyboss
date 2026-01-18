import React from 'react';
import { useTheme } from '../../styles/ThemeProvider';

const ThemeTestPage: React.FC = () => {
  const { mode, setMode } = useTheme();
  return (
    <div style={{ padding: 32 }}>
      <h1>Teste de ThemeProvider</h1>
      <p>Modo atual: <b>{mode}</b></p>
      <button onClick={() => setMode(mode === 'clear' ? 'dark' : 'clear')}>
        Alternar tema
      </button>
      <div style={{ marginTop: 24, padding: 16, background: 'var(--color-card)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
        <p>Este bloco usa as variáveis do tema.</p>
      </div>
    </div>
  );
};

export default ThemeTestPage;
