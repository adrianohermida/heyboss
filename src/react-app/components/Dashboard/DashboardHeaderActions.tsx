// Manifesto: DashboardHeaderActions
// - Barra de busca, exportar, novo item
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
import { Search, Download, Plus } from 'lucide-react';
interface Props {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onExport: () => void;
}
const DashboardHeaderActions: React.FC<Props> = ({ searchTerm, setSearchTerm, onExport }) => (
  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-brand-elevated p-4 rounded-2xl border border-white/5">
    <div className="relative w-full sm:w-96">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} aria-hidden />
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full bg-brand-dark border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-primary transition-all"
        aria-label="Buscar"
      />
    </div>
    <div className="flex gap-2 w-full sm:w-auto">
      <button onClick={onExport} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10 transition-all">
        <Download size={18} aria-hidden />
        Exportar
      </button>
      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-primary/20">
        <Plus size={18} aria-hidden />
        Novo
      </button>
    </div>
  </div>
);
export default DashboardHeaderActions;
