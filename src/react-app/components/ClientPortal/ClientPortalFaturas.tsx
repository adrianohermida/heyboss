import React from 'react';
import FaturasImport from '../Faturas/FaturasImport';
import FaturasExport from '../Faturas/FaturasExport';
import FaturasAuditLog from '../Faturas/FaturasAuditLog';

const ClientPortal = () => {
    const [faturas, setFaturas] = React.useState([]);
    const [selectedFaturaId, setSelectedFaturaId] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const pageSize = 50;
    const paginatedFaturas = faturas.slice((page-1)*pageSize, page*pageSize);

    const handleImportFaturas = (importedFaturas) => {
        setFaturas([...faturas, ...importedFaturas]);
    };

    return (
        <div>
            <h1>Client Portal</h1>
            <FaturasImport onImport={handleImportFaturas} />
            <FaturasExport faturas={paginatedFaturas} />
            <FaturasAuditLog faturaId={selectedFaturaId} />
            <div>
                <button onClick={()=>setPage(page-1)} disabled={page===1}>Anterior</button>
                <button onClick={()=>setPage(page+1)} disabled={page*pageSize>=faturas.length}>Próxima</button>
            </div>
        </div>
    );
};

export default ClientPortal;