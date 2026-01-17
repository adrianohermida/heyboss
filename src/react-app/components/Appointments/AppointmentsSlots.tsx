import React from 'react';
import { Loader2 } from 'lucide-react';

type Slot = { id: string; hora_inicio: string };
type Props = {
  slots: Slot[];
  loading: boolean;
  selectedSlot: Slot|null;
  onSelect: (slot: Slot) => void;
};

const AppointmentsSlots: React.FC<Props> = ({ slots, loading, selectedSlot, onSelect }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-white/70">Horários Disponíveis</label>
    {loading ? (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin text-brand-primary" />
      </div>
    ) : slots.length > 0 ? (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => onSelect(slot)}
            className={`py-3 rounded-lg border text-sm font-bold transition-all ${selectedSlot?.id===slot.id?"bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20":"bg-brand-dark border-white/10 hover:border-brand-primary/50 text-white/60"}`}
          >
            {slot.hora_inicio}
          </button>
        ))}
      </div>
    ) : (
      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl text-center">
        <p className="text-sm text-red-400">Nenhum horário disponível para esta data. Tente outro dia ou profissional.</p>
      </div>
    )}
  </div>
);

export default AppointmentsSlots;
