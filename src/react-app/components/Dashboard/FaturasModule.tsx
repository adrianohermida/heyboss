// Manifesto: FaturasModule
// - Exibe lista de faturas
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
interface Props { data: any[]; }
const FaturasModule: React.FC<Props> = ({ data }) => (
  <section>
    {/* ...renderização da lista de faturas... */}
    <div className="text-white/40 text-sm">{data.length} faturas encontradas.</div>
  </section>
);
export default FaturasModule;
