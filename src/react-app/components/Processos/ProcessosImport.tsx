// Manifesto: ProcessosImport
// - Importação em lote de processos (CSV/XLS)
// - Governança: auditável, compliance LGPD
// - Supabase: processos, audit_logs
// - D3 Workers: processos_import_cache
// - Schema: processos-schema.json
// - SQL: processos.sql
import React, { useRef } from 'react';

const ProcessosImport = ({ onImport }: { onImport: (data: any[]) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ...import logic (CSV/XLS)
  };
  return (
    <div className="space-y-2">
      <input type="file" accept=".csv,.xls,.xlsx" ref={fileInputRef} onChange={handleFileChange} className="w-full" />
      <button onClick={() => fileInputRef.current?.click()} className="w-full bg-brand-primary text-white py-2 rounded-xl font-bold">Importar Processos</button>
    </div>
  );
};

export default ProcessosImport;
