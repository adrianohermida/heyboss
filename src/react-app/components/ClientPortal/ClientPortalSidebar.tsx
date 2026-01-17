
// Manifesto: ClientPortalSidebar
// - Exibe avatar, nome, botão exportar, navegação
// - Mobile-first, acessível, tokenização CSS
// - Skeleton: loading
// - Props: user, activeTab, setActiveTab, exporting, onExport
import React from 'react';
import { LayoutDashboard, Scale, MessageSquare, CreditCard, FileUp, Wallet, CalendarIcon } from 'lucide-react';
interface Props {
  user: { name?: string; email?: string };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  exporting: boolean;
  onExport: () => void;
}
const ClientPortalSidebar: React.FC<Props> = ({ user, activeTab, setActiveTab, exporting, onExport }) => (
  <aside className="w-full lg:w-72 space-y-2 shrink-0">
    <div className="bg-brand-elevated p-6 rounded-3xl border border-white/5 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl border-2 border-white/10" aria-label="Avatar do usuário">
          {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <p className="font-bold truncate">{user?.name || 'Cliente'}</p>
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Portal do Cliente</p>
        </div>
      </div>
      <div className="h-px bg-white/5 w-full mb-4" />
      <p className="text-xs text-white/40 leading-relaxed mb-4">Acompanhe seus processos e interaja com nossa equipe de forma segura.</p>
      <button aria-label="Exportar meus dados" onClick={onExport} disabled={exporting} className="w-full py-2 bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all text-white/40 hover:text-white flex items-center justify-center gap-2 disabled:opacity-50">
        {exporting ? 'Exportando...' : 'Exportar Meus Dados'}
      </button>
    </div>
    {/* Skeleton: loading nav se necessário */}
    <nav className="space-y-1" aria-label="Navegação do portal do cliente">
      {[
        { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
        { id: 'processos', label: 'Meus Processos', icon: Scale },
        { id: 'tickets', label: 'Suporte / Tickets', icon: MessageSquare },
        { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
        { id: 'documentos', label: 'Documentos', icon: FileUp },
        { id: 'plano', label: 'Plano de Pagamento', icon: Wallet },
        { id: 'agenda', label: 'Minha Agenda', icon: CalendarIcon },
      ].map(item => (
        <button
          key={item.id}
          aria-current={activeTab === item.id ? 'page' : undefined}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all group ${activeTab===item.id?"bg-brand-primary text-white shadow-lg shadow-brand-primary/20":"text-white/40 hover:text-white hover:bg-white/5"}`}
        >
          <item.icon size={20} aria-hidden className={activeTab===item.id?"text-white":"text-white/20 group-hover:text-white/60"} />
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);
export default ClientPortalSidebar;
