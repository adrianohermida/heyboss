
// Manifesto: ClientPortalOverview
// - Exibe saudação, resumo, atalhos para módulos
// - Mobile-first, acessível, tokenização CSS
// - Skeleton: loading
// - Props: user, summary, setActiveTab
import React from 'react';
import { ShieldCheck, Scale, CreditCard, MessageSquare, CalendarIcon } from 'lucide-react';
interface Props {
  user: { name?: string; email?: string };
  summary: { processos: number; faturas: number; tickets: number; appointments: number };
  setActiveTab: (tab: string) => void;
}
const ClientPortalOverview: React.FC<Props> = ({ user, summary, setActiveTab }) => (
  <section className="space-y-8 animate-fade-in">
    <div className="bg-brand-elevated p-8 sm:p-12 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full mb-6">
          <ShieldCheck size={16} className="text-brand-primary" aria-hidden />
          <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest">Ambiente Seguro LGPD</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Olá, {user?.name || user?.email?.split('@')[0]}!</h2>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
          Bem-vindo ao seu portal jurídico exclusivo. Aqui você tem controle total sobre o andamento do seu caso e comunicação direta com nossos especialistas.
        </p>
      </div>
    </div>
    {/* Skeleton: loading cards se summary for null */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <button aria-label="Acessar Processos" onClick={() => setActiveTab('processos')} className="bg-brand-elevated p-8 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all text-left group shadow-xl relative overflow-hidden">
        <div className="bg-brand-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
          <Scale size={28} aria-hidden />
        </div>
        <h3 className="font-bold text-xl mb-2">Processos</h3>
        <p className="text-sm text-white/40">Acompanhe suas ações judiciais.</p>
        {summary.processos > 0 && (
          <span className="absolute top-6 right-6 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
            {summary.processos}
          </span>
        )}
      </button>
      <button aria-label="Acessar Financeiro" onClick={() => setActiveTab('financeiro')} className="bg-brand-elevated p-8 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all text-left group shadow-xl relative overflow-hidden">
        <div className="bg-brand-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
          <CreditCard size={28} aria-hidden />
        </div>
        <h3 className="font-bold text-xl mb-2">Financeiro</h3>
        <p className="text-sm text-white/40">Faturas e pagamentos pendentes.</p>
        {summary.faturas > 0 && (
          <span className="absolute top-6 right-6 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            {summary.faturas}
          </span>
        )}
      </button>
      <button aria-label="Acessar Suporte" onClick={() => setActiveTab('tickets')} className="bg-brand-elevated p-8 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all text-left group shadow-xl relative overflow-hidden">
        <div className="bg-brand-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
          <MessageSquare size={28} aria-hidden />
        </div>
        <h3 className="font-bold text-xl mb-2">Suporte</h3>
        <p className="text-sm text-white/40">Tire suas dúvidas com a equipe.</p>
        {summary.tickets > 0 && (
          <span className="absolute top-6 right-6 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded-lg">
            {summary.tickets}
          </span>
        )}
      </button>
      <button aria-label="Acessar Agenda" onClick={() => setActiveTab('agenda')} className="bg-brand-elevated p-8 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all text-left group shadow-xl relative overflow-hidden">
        <div className="bg-brand-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
          <CalendarIcon size={28} aria-hidden />
        </div>
        <h3 className="font-bold text-xl mb-2">Agenda</h3>
        <p className="text-sm text-white/40">Consulte seus próximos horários.</p>
        {summary.appointments > 0 && (
          <span className="absolute top-6 right-6 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            {summary.appointments}
          </span>
        )}
      </button>
    </div>
  </section>
);
export default ClientPortalOverview;
