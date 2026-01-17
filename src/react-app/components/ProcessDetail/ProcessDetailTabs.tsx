import React from 'react';
import { Clock, FileText, CreditCard, MessageSquare, Calendar, CheckSquare } from 'lucide-react';
import { cn } from '../../utils';

const tabs = [
  { id: 'movements', label: 'Andamentos', icon: Clock },
  { id: 'publicacoes', label: 'Publicações', icon: FileText },
  { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
  { id: 'suporte', label: 'Suporte', icon: MessageSquare },
  { id: 'hearings', label: 'Audiências', icon: Calendar },
  { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
  { id: 'documents', label: 'Documentos', icon: FileText },
];

const ProcessDetailTabs = ({ activeTab, setActiveTab, counts }: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  counts: Record<string, number>
}) => (
  <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/5">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
          activeTab === tab.id 
            ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
            : "text-white/40 hover:text-white hover:bg-white/5"
        )}
        aria-current={activeTab === tab.id}
      >
        <tab.icon size={18} />
        {tab.label}
        <span className={cn(
          "ml-1 px-2 py-0.5 rounded-md text-[10px]",
          activeTab === tab.id ? "bg-white/20 text-white" : "bg-white/5 text-white/20"
        )}>
          {counts[tab.id] || 0}
        </span>
      </button>
    ))}
  </div>
);

export default ProcessDetailTabs;
