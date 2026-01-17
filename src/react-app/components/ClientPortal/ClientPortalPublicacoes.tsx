import React, { useEffect, useState } from 'react';
import PublicacoesExport from '../Publicacoes/PublicacoesExport';
import PublicacoesImport from '../Publicacoes/PublicacoesImport';
import PublicacoesAuditLog from '../Publicacoes/PublicacoesAuditLog';
import PublicacoesIAExtract from '../Publicacoes/PublicacoesIAExtract';
import TarefasPendenciasModule from '../Tarefas/TarefasPendenciasModule';

const ClientPortal = () => {
  // Observação: Integração futura com módulo de Tarefas/Prazos para registro de pendências e prazos relacionados às publicações.
  const [publicacoes, setPublicacoes] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [pendencias, setPendencias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pubsRes = await fetch('/api/admin/publicacoes');
        const pubs = pubsRes.ok ? await pubsRes.json() : [];
        setPublicacoes(pubs);
      } catch (e) {
        setPublicacoes([]);
      }
      try {
        const statsRes = await fetch('/api/admin/balcao/stats');
        const stats = statsRes.ok ? await statsRes.json() : {};
        setAnalytics(stats);
      } catch (e) {
        setAnalytics({});
      }
      try {
        const pendRes = await fetch('/api/admin/queues');
        const pend = pendRes.ok ? await pendRes.json() : [];
        setPendencias(pend);
      } catch (e) {
        setPendencias([]);
      }
    }
    fetchData();
  }, []);

  const selectedPublicacaoId = publicacoes[0]?.id;
  const selectedProcessoId = null;
  const selectedClienteId = null;
  const handleImportPublicacoes = (imported) => {
    setPublicacoes([...publicacoes, ...imported]);
  };
  const handleExtractIA = (dados) => {/* lógica de extração IA */};

  return (
    <div>
      {/* Outros componentes e lógica do ClientPortal */}
      <PublicacoesExport publicacoes={publicacoes} />
      <PublicacoesImport onImport={handleImportPublicacoes} />
      <PublicacoesAuditLog publicacaoId={selectedPublicacaoId} />
      <PublicacoesIAExtract publicacao={publicacoes[0]} onExtract={handleExtractIA} />
      <TarefasPendenciasModule publicacaoId={selectedPublicacaoId} processoId={selectedProcessoId} clienteId={selectedClienteId} />
    </div>
  );
};

export default ClientPortal;