import React from 'react';
import { Filter, User as UserIcon } from 'lucide-react';

type Prof = { id: string; nome: string; especialidade: string; avatar_url?: string };
type Props = {
  profissionais: Prof[];
  selectedProf: Prof | null;
  onSelect: (p: Prof) => void;
};

const AppointmentsProfessionalSelect: React.FC<Props> = ({ profissionais, selectedProf, onSelect }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
      <Filter size={16} className="text-brand-primary" />
      Selecione o Especialista
    </label>
    <div className="grid grid-cols-1 gap-3">
      {profissionais.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p)}
          className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${selectedProf?.id===p.id?"bg-brand-primary/10 border-brand-primary":"bg-brand-dark border-white/5 hover:border-white/20"}`}
        >
          <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-brand-primary/50 transition-all">
            {p.avatar_url ? <img src={p.avatar_url} alt={p.nome} className="w-full h-full object-cover" /> : <UserIcon className="text-brand-primary" />}
          </div>
          <div>
            <p className="font-bold text-white">{p.nome}</p>
            <p className="text-xs text-white/50">{p.especialidade}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default AppointmentsProfessionalSelect;
