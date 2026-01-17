import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  daysInMonth: (Date|null)[];
  currentMonth: Date;
  selectedDate: string;
  isToday: (d: Date) => boolean;
  isPast: (d: Date) => boolean;
  onSelect: (date: string) => void;
  onPrev: () => void;
  onNext: () => void;
};

const weekDays = ['D','S','T','Q','Q','S','S'];

const AppointmentsCalendar: React.FC<Props> = ({ daysInMonth, currentMonth, selectedDate, isToday, isPast, onSelect, onPrev, onNext }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between mb-2">
      <label className="text-sm font-semibold text-white/70">Data da Consulta</label>
      <div className="flex items-center gap-4">
        <button onClick={onPrev} className="p-1 hover:bg-white/5 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
        <span className="text-sm font-bold capitalize">{currentMonth.toLocaleString('pt-BR',{month:'long',year:'numeric'})}</span>
        <button onClick={onNext} className="p-1 hover:bg-white/5 rounded-lg transition-colors"><ChevronRight size={20} /></button>
      </div>
    </div>
    <div className="grid grid-cols-7 gap-1 text-center mb-2">
      {weekDays.map(d=>(<div key={d} className="text-[10px] font-bold text-white/30 uppercase">{d}</div>))}
    </div>
    <div className="grid grid-cols-7 gap-1">
      {daysInMonth.map((date,idx)=>!date?
        <div key={`empty-${idx}`} className="aspect-square" />:
        <button
          key={date.toISOString()}
          disabled={isPast(date)}
          onClick={()=>onSelect(date.toISOString().split('T')[0])}
          className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all relative ${selectedDate===date.toISOString().split('T')[0]?"bg-brand-primary text-white shadow-lg shadow-brand-primary/20":isPast(date)?"text-white/10 cursor-not-allowed":"bg-brand-dark border border-white/5 hover:border-brand-primary/50 text-white/70"} ${isToday(date)&&selectedDate!==date.toISOString().split('T')[0]&&!isPast(date)?"border-brand-primary/50 text-brand-primary":""}`}
        >
          {date.getDate()}
          {isToday(date)&&<div className="absolute bottom-1 w-1 h-1 bg-brand-primary rounded-full" />}
        </button>
      )}
    </div>
  </div>
);

export default AppointmentsCalendar;
