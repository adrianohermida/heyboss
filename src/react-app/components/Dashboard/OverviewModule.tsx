// Manifesto: OverviewModule
// - Exibe estatísticas e atividades recentes do painel
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
import { Users, Scale, TrendingUp, MessageSquare, Zap, ChevronRight } from 'lucide-react';
const stats = [
  { label: 'Leads Hoje', value: '12', icon: Users, color: 'text-blue-400' },
  { label: 'Processos Ativos', value: '145', icon: Scale, color: 'text-brand-primary' },
  { label: 'Faturamento Mês', value: 'R$ 45k', icon: TrendingUp, color: 'text-green-400' },
  { label: 'Tickets Abertos', value: '8', icon: MessageSquare, color: 'text-yellow-400' },
];
const OverviewModule: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-brand-elevated p-6 rounded-3xl border border-white/5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}><stat.icon size={24} aria-hidden /></div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Tempo Real</span>
          </div>
          <p className="text-white/40 text-xs font-bold uppercase mb-1">{stat.label}</p>
          <p className="text-3xl font-extrabold">{stat.value}</p>
        </div>
      ))}
    </div>
    <div className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="relative z-10">
        <h3 className="text-2xl font-extrabold mb-6">Atividade Recente</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs"><Zap size={20} aria-hidden /></div>
              <div className="flex-1">
                <p className="text-sm font-bold">Novo lead capturado via Calculadora</p>
                <p className="text-xs text-white/40">Há 15 minutos • Maria Oliveira</p>
              </div>
              <ChevronRight size={18} className="text-white/20" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default OverviewModule;
