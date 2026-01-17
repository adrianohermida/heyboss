import React from 'react';
import CRMExportLeads from '../CRM/CRMExportLeads';
import CRMImportLeads from '../CRM/CRMImportLeads';
import CRMAuditLog from '../CRM/CRMAuditLog';

const ClientPortalCRM = ({ leads, handleImportLeads, selectedLeadId }) => {
    return (
        <div>
            <h1>Client Portal CRM</h1>
            <CRMExportLeads leads={leads} />
            <CRMImportLeads onImport={handleImportLeads} />
            <CRMAuditLog leadId={selectedLeadId} />
        </div>
    );
};

export default ClientPortalCRM;