import React from 'react';
import { useTheme } from '../../../styles/ThemeProvider';
import clsx from 'clsx';
import FaturasImport from '../Faturas/FaturasImport';
import FaturasExport from '../Faturas/FaturasExport';
import FaturasAuditLog from '../Faturas/FaturasAuditLog';

const ClientPortalFaturas = () => {
    const { mode } = useTheme();
    const [faturas, setFaturas] = React.useState([]);
    const [selectedFaturaId, setSelectedFaturaId] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const pageSize = 50;
    const paginatedFaturas = faturas.slice((page - 1) * pageSize, page * pageSize);

    const handleImportFaturas = (importedFaturas) => {
        setFaturas([...faturas, ...importedFaturas]);
    };

    return (
        <div
            className={clsx(
                'rounded-lg p-6 shadow',
                mode === 'clear'
                    ? 'bg-white text-gray-900 border border-gray-200'
                    : 'bg-card text-white border border-border'
            )}
        >
            <h1 className="text-2xl font-bold mb-4">Faturas</h1>
            <FaturasImport onImport={handleImportFaturas} />
            <FaturasExport faturas={paginatedFaturas} />
            <FaturasAuditLog faturaId={selectedFaturaId} />
            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={clsx(
                        'px-3 py-1 rounded',
                        page === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-brand text-white hover:bg-accent'
                    )}
                >
                    Anterior
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page * pageSize >= faturas.length}
                    className={clsx(
                        'px-3 py-1 rounded',
                        page * pageSize >= faturas.length
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-brand text-white hover:bg-accent'
                    )}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default ClientPortalFaturas;