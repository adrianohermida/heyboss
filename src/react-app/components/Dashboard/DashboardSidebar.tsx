// Manifesto: DashboardSidebar
// - Navegação entre módulos do painel admin
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
import { Users, Scale, CreditCard, MessageSquare, FileText, Bot, Settings, Calendar } from 'lucide-react';
interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const items = [
  { id: 'leads', label: 'CRM / Leads', icon: Users },
  { id: 'processos', label: 'Processos', icon: Scale },
  { id: 'faturas', label: 'Financeiro', icon: CreditCard },
  { id: 'tickets', label: 'Helpdesk', icon: MessageSquare },
  { id: 'publicacoes', label: 'Publicações', icon: FileText },
  { id: 'ai', label: 'IA Monitorada', icon: Bot },
  { id: 'chatbot', label: 'Chatbot IA', icon: Settings },
  { id: 'balcao', label: 'Balcão Virtual', icon: MessageSquare },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'config', label: 'Configurações', icon: Settings },
];
const DashboardSidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <aside className="w-full lg:w-64 shrink-0">
    <nav className="space-y-1" aria-label="Navegação do painel">
      {items.map(item => (
        <button
          key={item.id}
          aria-current={activeTab === item.id ? 'page' : undefined}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${activeTab===item.id?"bg-brand-primary text-white shadow-lg shadow-brand-primary/20":"text-white/40 hover:text-white hover:bg-white/5"}`}
        >
          <item.icon size={20} aria-hidden className={activeTab===item.id?"text-white":"text-white/20 group-hover:text-white/60"} />
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);
export default DashboardSidebar;
