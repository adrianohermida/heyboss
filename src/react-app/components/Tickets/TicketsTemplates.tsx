// Manifesto: TicketsTemplates
// - Respostas predefinidas (templates) e pastas temáticas
// - Governança: auditável, compliance LGPD
// - Supabase: tickets, audit_logs
// - D3 Workers: tickets_templates_cache
// - Schema: tickets-schema.json
// - SQL: tickets.sql
import React from 'react';

const TicketsTemplates = ({ onSelect }: { onSelect: (template: string) => void }) => {
  const templates = [
    { id: 'welcome', label: 'Boas-vindas', content: 'Olá! Como podemos ajudar?' },
    { id: 'followup', label: 'Acompanhamento', content: 'Estamos acompanhando seu chamado.' },
    { id: 'close', label: 'Encerramento', content: 'Seu ticket foi encerrado. Obrigado!' }
  ];
  return (
    <div className="space-y-2">
      {templates.map(t => (
        <button key={t.id} onClick={() => onSelect(t.content)} className="w-full bg-brand-primary/90 text-white py-2 rounded-xl font-bold">{t.label}</button>
      ))}
    </div>
  );
};

export default TicketsTemplates;
