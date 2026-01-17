import React from 'react';
import { User, MapPin } from 'lucide-react';
import { cn } from '../../utils';

const ProcessDetailHeader = ({ processo }: { processo: any }) => (
  <div className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl mb-8">
    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
    <div className="relative z-10">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-brand-primary/20">
              {processo.area || 'Jurídico'}
            </span>
            <span className={cn(
              "text-[10px] font-bold uppercase px-3 py-1 rounded-full",
              processo.status === 'Concluído' ? "bg-green-500/10 text-green-400" : "bg-brand-primary/10 text-brand-primary"
            )}>
              {processo.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{processo.titulo}</h1>
          <p className="text-white/40 font-mono text-lg">{processo.numero_cnj}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 shrink-0">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <User size={16} className="text-brand-primary" />
              <span className="text-[10px] font-bold text-white/40 uppercase">Cliente</span>
            </div>
            <p className="text-sm font-bold">{processo.cliente_email}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <MapPin size={16} className="text-brand-primary" />
              <span className="text-[10px] font-bold text-white/40 uppercase">Tribunal</span>
            </div>
            <p className="text-sm font-bold">{processo.tribunal || 'Não informado'}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProcessDetailHeader;
