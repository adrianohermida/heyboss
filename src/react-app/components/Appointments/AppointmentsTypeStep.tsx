import React from 'react';
import { MessageSquare, Scale } from 'lucide-react';

type Props = { onSelect: (type: 'avaliacao' | 'tecnica') => void };

const AppointmentsTypeStep: React.FC<Props> = ({ onSelect }) => (
  <div className="space-y-4">
    <button
      onClick={() => onSelect('avaliacao')}
      className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-brand-dark hover:border-brand-primary/50 transition-all text-left group w-full"
    >
      <div className="bg-brand-primary/10 p-3 rounded-xl group-hover:bg-brand-primary/20 transition-colors">
        <MessageSquare className="text-brand-primary" size={24} />
      </div>
      <div>
        <h3 className="font-bold text-white text-lg">Avaliação de Caso Inicial</h3>
        <p className="text-white/50 text-sm mt-1">Para novos clientes que buscam orientação sobre superendividamento ou dívidas bancárias.</p>
        <p className="text-brand-primary text-xs font-bold mt-2 uppercase tracking-wider">Gratuito • Antecedência 48h</p>
      </div>
    </button>
    <button
      onClick={() => onSelect('tecnica')}
      className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-brand-dark hover:border-brand-primary/50 transition-all text-left group w-full"
    >
      <div className="bg-brand-primary/10 p-3 rounded-xl group-hover:bg-brand-primary/20 transition-colors">
        <Scale className="text-brand-primary" size={24} />
      </div>
      <div>
        <h3 className="font-bold text-white text-lg">Consulta Técnica / Processual</h3>
        <p className="text-white/50 text-sm mt-1">Análise de autos, dúvidas sobre processos em andamento ou pareceres técnicos.</p>
        <p className="text-brand-primary text-xs font-bold mt-2 uppercase tracking-wider">Sujeito a Honorários • Antecedência 72h</p>
      </div>
    </button>
  </div>
);

export default AppointmentsTypeStep;
