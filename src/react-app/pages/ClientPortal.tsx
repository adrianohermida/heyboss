
import ClientPortalAgenda from '../components/ClientPortal/ClientPortalAgenda';
import ClientPortalPlano from '../components/ClientPortal/ClientPortalPlano';
import ClientPortalDocumentos from '../components/ClientPortal/ClientPortalDocumentos';
import ClientPortalProcessos from '../components/ClientPortal/ClientPortalProcessos';
import React, { useState, useEffect } from 'react';
import { AlertCircle, Wallet, MessageSquare, ChevronRight, X, Calendar as CalendarIcon, Loader2, Scale, CheckCircle2, Clock, CreditCard, Download, Plus, FileText, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import allConfigs from '../../shared/form-configs.json';
import { CustomForm } from '../components/CustomForm/CustomForm';
import { contactFormTheme } from '../components/CustomForm/themes';
import { useAuth } from '../auth/supabaseAuth';
import { supabase } from '../../supabaseClient';
import ClientPortalSidebar from '../components/ClientPortal/ClientPortalSidebar';
import ClientPortalOverview from '../components/ClientPortal/ClientPortalOverview';
import Header from '../components/Header';
import TicketsModule from '../components/Dashboard/TicketsModule';
import ClientPortalFaturas from '../components/ClientPortal/ClientPortalFaturas';


const ClientPortal: React.FC = () => {
  // --- HOOKS E ESTADO ---
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState({ processos: 0, faturas: 0, tickets: 0, appointments: 0 });
  // const [faturas, setFaturas] = useState<any[]>([]);
  // const [loadingFaturas, setLoadingFaturas] = useState(true);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [loadingDocumentos, setLoadingDocumentos] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  // const [processos, setProcessos] = useState<any[]>([]);
  // const [loadingProcessos, setLoadingProcessos] = useState(true);
  const [planos, setPlanos] = useState<any[]>([]);
  const [loadingPlanos, setLoadingPlanos] = useState(true);
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [escritorioId, setEscritorioId] = useState<string | null>(null);
  const [loadingCliente, setLoadingCliente] = useState(true);

  // --- EFFECTS E FUNÇÕES AUXILIARES ---
  useEffect(() => {
    const fetchCliente = async () => {
      setLoadingCliente(true);
      if (!user?.email) {
        setClienteId(null);
        setEscritorioId(null);
        setLoadingCliente(false);
        return;
      }
      const { data, error } = await supabase
        .from('crm.clientes')
        .select('id, escritorio_id')
        .eq('email', user.email)
        .single();
      if (data && !error) {
        setClienteId(data.id);
        setEscritorioId(data.escritorio_id);
      } else {
        setClienteId(null);
        setEscritorioId(null);
      }
      setLoadingCliente(false);
    };
    fetchCliente();
  }, [user]);

  // useEffect(() => {
  //   const fetchFaturas = async () => {
  //     setLoadingFaturas(true);
  //     if (!user || !clienteId) {
  //       setFaturas([]);
  //       setLoadingFaturas(false);
  //       return;
  //     }
  //     const { data, error } = await supabase
  //       .from('crm.faturas')
  //       .select('*')
  //       .eq('cliente_id', clienteId)
  //       .order('data_vencimento', { ascending: false });
  //     if (error) {
  //       setFaturas([]);
  //     } else {
  //       setFaturas(data || []);
  //     }
  //     setLoadingFaturas(false);
  //   };
  //   fetchFaturas();
  // }, [user, clienteId]);

  const fetchDocumentos = async () => {
    setLoadingDocumentos(true);
    if (!user || !clienteId) {
      setDocumentos([]);
      setLoadingDocumentos(false);
      return;
    }
    const { data, error } = await supabase
      .from('crm.documentos')
      .select('*')
      .eq('cliente_id', clienteId)
      .order('created_at', { ascending: false });
    if (error) {
      setDocumentos([]);
    } else {
      setDocumentos(data || []);
    }
    setLoadingDocumentos(false);
  };
  useEffect(() => {
    fetchDocumentos();
  }, [user, clienteId]);

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    if (!user) {
      setAppointments([]);
      setLoadingAppointments(false);
      return;
    }
    const { data, error } = await supabase
      .from('crm.appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) {
      setAppointments([]);
    } else {
      setAppointments(data || []);
    }
    setLoadingAppointments(false);
  };
  useEffect(() => {
    fetchAppointments();
  }, [user]);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <ClientPortalSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} exporting={false} onExport={undefined} />
          <div className="flex-1 min-w-0 space-y-8">
            {activeTab === 'overview' && <ClientPortalOverview user={user} summary={summary} setActiveTab={setActiveTab} />}
            {/* Adicione aqui os módulos: processos, tickets, financeiro, documentos, plano, agenda, etc. */}
            {activeTab === 'financeiro' && <ClientPortalFaturas />}
            {activeTab === 'processos' && <ClientPortalProcessos />}
            {activeTab === 'documentos' && <ClientPortalDocumentos />}
            {activeTab === 'plano' && <ClientPortalPlano />}
            {activeTab === 'agenda' && <ClientPortalAgenda />}
            {/* {activeTab === 'tickets' && <TicketsModule user={user} clienteId={clienteId} escritorioId={escritorioId} />} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPortal;



