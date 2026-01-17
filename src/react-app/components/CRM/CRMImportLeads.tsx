// Manifesto: CRMImportLeads
// - Importação em lote de leads (CSV/JSON)
// - Governança: auditável, compliance LGPD
// - Supabase: customers, audit_logs
// - D3 Workers: crm_import_cache
// - Schema: customers-schema.json
// - SQL: customers.sql
import React, { useRef } from 'react';

const CRMImportLeads = ({ onImport }: { onImport: (data: any[]) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ...import logic (CSV/JSON)
  };
  return (
    <div className="space-y-2">
      <input type="file" accept=".csv,.json" ref={fileInputRef} onChange={handleFileChange} className="w-full" />
      <button onClick={() => fileInputRef.current?.click()} className="w-full bg-brand-primary text-white py-2 rounded-xl font-bold">Importar Leads</button>
    </div>
  );
};

export default CRMImportLeads;
