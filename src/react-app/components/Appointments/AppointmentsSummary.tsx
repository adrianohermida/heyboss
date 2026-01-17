import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

type Prof = { nome: string };
type Slot = { hora_inicio: string };
type Props = {
  prof: Prof|null;
  date: string;
  slot: Slot|null;
  type: 'avaliacao'|'tecnica';
};

const AppointmentsSummary: React.FC<Props> = ({ prof, date, slot, type }) => (
  <div className="bg-brand-primary/5 p-6 rounded-2xl border border-brand-primary/20 mb-6 flex items-center gap-4">
    <div className="bg-brand-primary/20 p-3 rounded-xl">
      <CalendarIcon className="text-brand-primary" size={24} />
    </div>
    <div>
      <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Resumo do Agendamento</p>
      <p className="text-sm font-bold text-white">
        {prof?.nome} • {date && new Date(date).toLocaleDateString('pt-BR')} às {slot?.hora_inicio}
      </p>
      <p className="text-[10px] text-white/40 mt-1">{type==='tecnica'?'Consulta Técnica':'Avaliação Inicial'}</p>
    </div>
  </div>
);

export default AppointmentsSummary;
