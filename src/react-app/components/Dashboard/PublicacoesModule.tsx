import React from 'react';
import PublicacoesExport from '../Publicacoes/PublicacoesExport';
import PublicacoesImport from '../Publicacoes/PublicacoesImport';
import PublicacoesAuditLog from '../Publicacoes/PublicacoesAuditLog';
import PublicacoesIAExtract from '../Publicacoes/PublicacoesIAExtract';

const DashboardPublicacoes = () => {
    const publicacoes = [];
    const handleImportPublicacoes = (imported) => {/* lógica de importação */};
    const selectedPublicacaoId = null;
    const handleExtractIA = (dados) => {/* lógica de extração IA */};

    return (
        <div>
            <h1>Dashboard de Publicações</h1>
            <PublicacoesExport publicacoes={publicacoes} />
            <PublicacoesImport onImport={handleImportPublicacoes} />
            <PublicacoesAuditLog publicacaoId={selectedPublicacaoId} />
            <PublicacoesIAExtract publicacao={publicacoes[0]} onExtract={handleExtractIA} />
        </div>
    );
};

export default DashboardPublicacoes;