import React, { useEffect, useState } from 'react';
import PublicacoesExport from '../Publicacoes/PublicacoesExport';
import PublicacoesImport from '../Publicacoes/PublicacoesImport';
import PublicacoesAuditLog from '../Publicacoes/PublicacoesAuditLog';
import PublicacoesIAExtract from '../Publicacoes/PublicacoesIAExtract';
import TarefasPendenciasModule from '../Tarefas/TarefasPendenciasModule';
import { supabase } from '../../supabaseClient';

const DashboardPublicacoes = () => {
    const [publicacoes, setPublicacoes] = useState([]);
    const [processos, setProcessos] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data: pubs } = await supabase.from('publicacoes').select('*');
            setPublicacoes(pubs || []);
            const { data: procs } = await supabase.from('processos').select('*');
            setProcessos(procs || []);
            const { data: clis } = await supabase.from('clientes').select('*');
            setClientes(clis || []);
        }

        fetchData();
    }, []);

    const handleImportPublicacoes = (imported) => {/* lógica de importação */};
    const selectedPublicacaoId = publicacoes[0]?.id;
    const handleExtractIA = (dados) => {/* lógica de extração IA */};
    const selectedProcessoId = processos[0]?.id;
    const selectedClienteId = clientes[0]?.id;

    return (
        <div>
            <h1>Dashboard de Publicações</h1>
            <PublicacoesExport publicacoes={publicacoes} />
            <PublicacoesImport onImport={handleImportPublicacoes} />
            <PublicacoesAuditLog publicacaoId={selectedPublicacaoId} />
            <PublicacoesIAExtract publicacao={publicacoes[0]} onExtract={handleExtractIA} />
            <TarefasPendenciasModule publicacaoId={selectedPublicacaoId} processoId={selectedProcessoId} clienteId={selectedClienteId} />
        </div>
    );
};

export default DashboardPublicacoes;