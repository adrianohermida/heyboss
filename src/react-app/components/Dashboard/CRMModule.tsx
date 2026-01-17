// Manifesto: CRMModule
// - Exibe lista de leads do CRM
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
interface Props { data: any[]; }
const CRMModule: React.FC<Props> = ({ data }) => (
  <section>
    {/* ...renderização da lista de leads... */}
    <div className="text-white/40 text-sm">{data.length} leads encontrados.</div>
  </section>
);
export default CRMModule;
