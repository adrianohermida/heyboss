
// Manifesto: ClientPortal
// - Modular: ClientPortalSidebar, ClientPortalOverview
// - Skeleton: loading states (em cada módulo)
// - Hooks: useState, useEffect
// - Router: react-router-dom para navegação
// - Responsivo, acessível, mobile-first, tokenização CSS
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import { useAuth } from '../auth/supabaseAuth';
import ClientPortalSidebar from '../components/ClientPortal/ClientPortalSidebar';
import ClientPortalOverview from '../components/ClientPortal/ClientPortalOverview';

const ClientPortal: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState({ processos: 0, faturas: 0, tickets: 0, appointments: 0 });
  const [faturas, setFaturas] = useState<any[]>([]);
  const [loadingFaturas, setLoadingFaturas] = useState(true);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [loadingDocumentos, setLoadingDocumentos] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  // Estado para cliente_id e escritorio_id do CRM
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [escritorioId, setEscritorioId] = useState<string | null>(null);
  const [loadingCliente, setLoadingCliente] = useState(true);

  // Buscar cliente do CRM ao autenticar
  useEffect(() => {
    const fetchCliente = async () => {
      setLoadingCliente(true);
      if (!user?.email) {
        setClienteId(null);
        setEscritorioId(null);
        setLoadingCliente(false);
        return;
      }
      // Busca o cliente pelo email do usuário autenticado
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

  // Removido: handleExportData e exportação de dados via endpoint inexistente

  // Removido: fetch para /api/users/summary (endpoint inexistente)

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <ClientPortalSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} exporting={false} onExport={undefined} />
          <div className="flex-1 min-w-0 space-y-8">
            {activeTab === 'overview' && <ClientPortalOverview user={user} summary={summary} setActiveTab={setActiveTab} />}
            {/* Outros módulos: processos, tickets, financeiro, documentos, plano, agenda */}

            {activeTab === 'processos' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold">Meus Processos</h2>
                  <div className="bg-brand-primary/10 px-4 py-2 rounded-xl border border-brand-primary/20">
                    <p className="text-brand-primary text-[10px] font-bold uppercase">Sincronizado com CNJ</p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>
                ) : processos.length > 0 ? (
                  <div className="grid gap-4">
                    {processos.map((proc, idx) => (
                      <div key={idx} className="bg-brand-elevated p-6 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all group">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">
                                {proc.area || 'Jurídico'}
                              </span>
                              <p className="text-white/40 text-xs font-mono">{proc.numero_cnj}</p>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{proc.titulo}</h3>
                            <p className="text-sm text-white/50">{proc.tribunal} • {proc.orgao_julgador}</p>
                          </div>
                          <div className="flex flex-col items-end justify-between gap-4">
                            <span className={clsx(
                              "text-[10px] font-bold uppercase px-4 py-1.5 rounded-full shadow-lg",
                              proc.status === 'Concluído' ? "bg-green-500/10 text-green-400" : "bg-brand-primary/10 text-brand-primary"
                            )}>
                              {proc.status}
                            </span>
                            <p className="text-[10px] text-white/20 font-bold uppercase">Atualizado em: {new Date(proc.updated_at).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-brand-elevated p-16 rounded-[2.5rem] border border-white/5 text-center space-y-6 shadow-2xl">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                      <Scale size={40} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-bold text-xl">Nenhum processo encontrado</p>
                      <p className="text-white/40 max-w-xs mx-auto">Se você já possui uma ação conosco, ela aparecerá aqui assim que for distribuída.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'financeiro' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold">Minhas Faturas</h2>
                  <div className="bg-brand-primary/10 px-4 py-2 rounded-xl border border-brand-primary/20">
                    <p className="text-brand-primary text-[10px] font-bold uppercase">Pagamento Seguro</p>
                  </div>
                </div>

                {loadingFaturas ? (
                  <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>
                ) : faturas.length > 0 ? (
                  <div className="grid gap-4">
                    {faturas.map((fatura, idx) => (
                      <div key={idx} className="bg-brand-elevated p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-brand-primary/30 transition-all shadow-lg">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className={clsx(
                            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                            fatura.status === 'Pago' ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                          )}>
                            {fatura.status === 'Pago' ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                          </div>
                          <div>
                            <p className="font-bold text-lg">{fatura.fatura}</p>
                            <p className="text-white/40 text-xs">Vencimento: {new Date(fatura.data_vencimento).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>

                        <div className="text-center sm:text-right w-full sm:w-auto">
                          <p className="text-2xl font-extrabold">R$ {Number(fatura.saldo_pagar || fatura.valor_original).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          <div className="flex flex-col items-center sm:items-end gap-1">
                            <span className={clsx(
                              "text-[10px] font-bold uppercase px-3 py-1 rounded-full",
                              fatura.status === 'Pago' ? "bg-green-500/10 text-green-400" : 
                              fatura.status === 'Atrasado' ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"
                            )}>{fatura.status}</span>
                            {fatura.data_pagamento && (
                              <p className="text-[9px] text-white/20 uppercase font-bold">Pago em: {new Date(fatura.data_pagamento).toLocaleDateString('pt-BR')}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                          {fatura.status !== 'Pago' && fatura.payment_link ? (
                            <button 
                              onClick={() => {
                                const isInIframe = window.self !== window.top;
                                if (isInIframe) {
                                  window.open(fatura.payment_link, "_blank");
                                } else {
                                  window.location.href = fatura.payment_link;
                                }
                              }}
                              className="flex-1 sm:flex-none bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
                            >
                              <CreditCard size={18} />
                              Pagar Agora
                            </button>
                          ) : null}
                          <button className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-white/10">
                            <Download size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-brand-elevated p-16 rounded-[2.5rem] border border-white/5 text-center space-y-6 shadow-2xl">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                      <CreditCard size={40} />
                    </div>
                    <p className="text-white/40 font-medium">Você não possui faturas pendentes ou pagas no momento.</p>
                  </div>
                )}
              </div>
            )}
            {/* ...outros módulos... */}
          </div>
        </div>
      </main>
    </div>
  );
}

// Fetch faturas from Supabase on mount or when user changes
// (Agora corretamente fora do JSX e dentro do componente)
useEffect(() => {
  const fetchFaturas = async () => {
    setLoadingFaturas(true);
    if (!user) {
      setFaturas([]);
      setLoadingFaturas(false);
      return;
    }
    // Adjust the filter below to match your schema (e.g., user_id or email)
    const { data, error } = await supabase
      .from('crm.faturas')
      .select('*')
      .eq('cliente_id', clienteId)
      .order('data_vencimento', { ascending: false });
    if (error) {
      setFaturas([]);
    } else {
      setFaturas(data || []);
    }
    setLoadingFaturas(false);
  };
  fetchFaturas();
}, [user]);

            {activeTab === 'documentos' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold">Meus Documentos</h2>
                  <button 
                    onClick={() => fetchDocumentos()}
                    className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/40 hover:text-white"
                  >
                    <Clock size={20} />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Plus className="text-brand-primary" size={20} />
                      Enviar Novo Documento
                    </h3>
                    <CustomForm 
                      id="documentos_plano_form"
                      schema={allConfigs['documentos_plano_form'].jsonSchema}
                      onSubmit={async (data) => {
                        const { error } = await supabase
                          .from('crm.documentos')
                          .insert([{ form_data: { ...data, email: user?.email }, cliente_id: clienteId }]);
                        if (!error) {
                          alert('Documento enviado com sucesso!');
                          fetchDocumentos();
                        }
                      }}
                      theme={contactFormTheme}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-6">Documentos Enviados</h3>
                    {loadingDocumentos ? (
                      <div className="flex justify-center py-10"><Loader2 className="animate-spin text-brand-primary" /></div>
                    ) : documentos.length > 0 ? (
                      <div className="grid gap-3">
                        {documentos.map((doc, idx) => (
                          <div key={idx} className="bg-brand-elevated p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary">
                                <FileText size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{doc.form_data.tipo_documento}</p>
                                <p className="text-[10px] text-white/40 uppercase font-bold">{new Date(doc.created_at).toLocaleDateString('pt-BR')}</p>
                              </div>
                            </div>
                            <a 
                              href={doc.form_data.arquivo_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 text-white/20 hover:text-brand-primary transition-colors"
                            >
                              <ExternalLink size={18} />
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white/5 p-12 rounded-3xl border border-dashed border-white/10 text-center">
                        <p className="text-white/20 text-sm italic">Nenhum documento enviado ainda.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
  // Fetch documentos from Supabase
  const fetchDocumentos = async () => {
    setLoadingDocumentos(true);
    if (!user) {
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

  // Fetch documentos on mount or when user changes
  useEffect(() => {
    fetchDocumentos();
  }, [user]);

            {activeTab === 'plano' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold">Plano de Pagamento</h2>
                  <div className="bg-brand-accent/10 px-4 py-2 rounded-xl border border-brand-accent/20">
                    <p className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">Lei 14.181/2021</p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>
                ) : planos.length > 0 ? (
                  <div className="grid gap-6">
                    {planos.map((plano, idx) => (
                      <div key={idx} className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="relative z-10 space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h3 className="text-2xl font-extrabold">Plano de Repactuação #{plano.id}</h3>
                              <p className="text-white/40 text-sm">Criado em: {new Date(plano.created_at).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <span className={clsx(
                              "text-[10px] font-bold uppercase px-4 py-2 rounded-full shadow-lg",
                              plano.status === 'Ativo' ? "bg-green-500/10 text-green-400" : "bg-brand-accent/10 text-brand-accent"
                            )}>
                              {plano.status}
                            </span>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                              <p className="text-[10px] font-bold text-white/40 uppercase mb-2">Dívida Total</p>
                              <p className="text-xl font-extrabold">{plano.form_data.totalDebt || 'R$ 0,00'}</p>
                            </div>
                            <div className={clsx(
                              "p-6 rounded-2xl border",
                              plano.form_data.isSuperendividado ? "bg-red-500/10 border-red-500/20" : "bg-brand-primary/10 border-brand-primary/20"
                            )}>
                              <p className="text-[10px] font-bold text-white/40 uppercase mb-2">Comprometimento</p>
                              <p className={clsx(
                                "text-xl font-extrabold",
                                plano.form_data.isSuperendividado ? "text-red-400" : "text-brand-primary"
                              )}>{plano.form_data.percentage?.toFixed(1)}%</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                              <p className="text-[10px] font-bold text-white/40 uppercase mb-2">Parcela Atual</p>
                              <p className="text-xl font-extrabold">{plano.form_data.monthlyInstallment || 'R$ 0,00'}</p>
                            </div>
                          </div>

                          <div className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5">
                            <h4 className="font-bold mb-3 flex items-center gap-2">
                              <AlertCircle size={16} className="text-brand-accent" />
                              Análise do Especialista
                            </h4>
                            <p className="text-sm text-white/60 leading-relaxed">
                              {plano.form_data.isSuperendividado 
                                ? "Sua situação se enquadra na Lei do Superendividamento. Estamos trabalhando na proposta de repactuação para reduzir seus juros e garantir seu mínimo existencial."
                                : "Seu plano está em fase de simulação. Continue acompanhando para atualizações sobre as negociações com os credores."}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-brand-elevated p-16 rounded-[2.5rem] border border-white/5 text-center space-y-6 shadow-2xl">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                      <Wallet size={40} />
                    </div>
                    <div className="space-y-4">
                      <p className="text-white font-bold text-xl">Nenhum plano ativo</p>
                      <p className="text-white/40 max-w-xs mx-auto">Use nossa calculadora na página inicial para iniciar sua simulação de repactuação de dívidas.</p>
                      <Link to="/" className="inline-block bg-brand-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all">
                        Ir para Calculadora
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Meus Agendamentos</h2>
                  <Link to="/agendar" className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold">Novo Agendamento</Link>
                </div>

                {loadingAppointments ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-brand-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {appointments.length === 0 ? (
                      <div className="bg-brand-elevated p-12 rounded-3xl border border-white/5 text-center">
                        <CalendarIcon className="mx-auto text-white/10 mb-4" size={48} />
                        <p className="text-white/40">Você ainda não possui agendamentos.</p>
                      </div>
                    ) : (
                      appointments.map((app) => (
                        <div key={app.id} className="bg-brand-elevated p-6 rounded-2xl border border-white/5 flex justify-between items-center">
                          <div className="flex gap-4">
                            <div className="bg-brand-primary/10 p-3 rounded-xl h-fit">
                              <CalendarIcon className="text-brand-primary" size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-white">{app.form_data.reason || 'Consulta Jurídica'}</h3>
                              <p className="text-sm text-white/50">{new Date(app.form_data.appointment_date).toLocaleDateString('pt-BR')} às {app.form_data.appointment_time}</p>
                              <p className="text-xs text-brand-primary mt-1">Profissional: {app.profissional_nome || 'A definir'}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={cn(
                              "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider",
                              app.status === 'aguardando_aceite' ? "bg-yellow-500/10 text-yellow-500" :
                              app.status === 'confirmado' ? "bg-green-500/10 text-green-500" :
                              app.status === 'recusado' ? "bg-red-500/10 text-red-500" :
                              "bg-white/5 text-white/40"
                            )}>
                              {app.status === 'aguardando_aceite' ? 'Aguardando Aceite' : 
                               app.status === 'confirmado' ? 'Confirmado' : 
                               app.status === 'recusado' ? 'Recusado' : 
                               app.status === 'cancelado' ? 'Cancelado' : 'Concluído'}
                            </span>
                            {app.status !== 'cancelado' && app.status !== 'recusado' && (
                              <button 
                                onClick={async () => {
                                  if (confirm('Deseja realmente cancelar este agendamento?')) {
                                    const { error } = await supabase
                                      .from('crm.appointments')
                                      .update({ status: 'cancelado' })
                                      .eq('id', app.id);
                                    if (!error) {
                                      alert('Agendamento cancelado com sucesso.');
                                      fetchAppointments();
                                    } else {
                                      alert(error.message || 'Erro ao cancelar.');
                                    }
                                  }
                                }}
                                className="text-[10px] font-bold text-red-400 hover:underline uppercase"
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
  // Fetch appointments from Supabase
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

  // Fetch appointments on mount or when user changes
  useEffect(() => {
    fetchAppointments();
  }, [user]);

            {activeTab === 'tickets' && <TicketsModule />}
          </div>
        </div>
      </main>
    </div>
  );
};

const TicketsModule = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Fetch tickets from Supabase
  const fetchTickets = async () => {
    setLoading(true);
    if (!clienteId) {
      setTickets([]);
      setLoading(false);
      return;
    }
    // Busca tickets do schema real, filtrando por cliente_id
    const { data, error } = await supabase
      .from('tickets.tickets')
      .select('id, titulo, descricao, status, prioridade, canal, created_at, updated_at, closed_at')
      .eq('cliente_id', clienteId)
      .order('updated_at', { ascending: false });
    if (error) {
      setTickets([]);
    } else {
      setTickets(data || []);
    }
    setLoading(false);
  };

  // Fetch comments for a ticket from Supabase (schema real)
  const fetchMessages = async (id: string) => {
    const { data, error } = await supabase
      .from('tickets.ticket_comments')
      .select('id, ticket_id, autor_id, autor_tipo, mensagem, created_at')
      .eq('ticket_id', id)
      .order('created_at', { ascending: true });
    if (error) {
      setMessages([]);
    } else {
      setMessages(data || []);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);
      const interval = setInterval(() => fetchMessages(selectedTicket.id), 10000);
      return () => clearInterval(interval);
    }
  }, [selectedTicket]);

  // Send reply to ticket (insert into tickets.ticket_comments)
  const handleSendReply = async () => {
    if (!reply.trim() || sendingReply) return;
    setSendingReply(true);
    try {
      const { error } = await supabase
        .from('tickets.ticket_comments')
        .insert([{
          ticket_id: selectedTicket.id,
          autor_id: clienteId,
          autor_tipo: 'cliente',
          mensagem: reply
        }]);
      if (!error) {
        setReply("");
        fetchMessages(selectedTicket.id);
      }
    } catch (e) {
      alert("Erro ao enviar resposta.");
    } finally {
      setSendingReply(false);
    }
  };

  if (selectedTicket) {
    // Integração direta: topicOverride = ticket:{ticket_id}
    const ChatWidget = require('../components/ChatWidget').ChatWidget;
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedTicket(null)}
              className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/40 hover:text-white"
            >
              <X size={24} />
            </button>
            <div>
              <h2 className="text-2xl font-extrabold">{selectedTicket.titulo}</h2>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Ticket #{selectedTicket.id}</p>
                <span className={clsx(
                  "text-[9px] font-bold uppercase px-2 py-0.5 rounded-md",
                  selectedTicket.status === 'fechado' ? "bg-green-500/10 text-green-400" : "bg-brand-primary/10 text-brand-primary"
                )}>{selectedTicket.status}</span>
                {selectedTicket.prioridade === 'Alta' && (
                  <span className="bg-red-500/10 text-red-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">Urgente</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ChatWidget integrado ao ticket */}
        <div className="mt-4">
          <ChatWidget topicOverride={`ticket:${selectedTicket.id}`} initialOpen={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Suporte ao Cliente</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-primary/20"
        >
          <Plus size={18} />
          Novo Chamado
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>
      ) : tickets.length > 0 ? (
        <div className="grid gap-4">
          {tickets.map((ticket, idx) => (
            <button 
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-brand-elevated p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-brand-primary/30 transition-all text-left group shadow-lg"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className={clsx(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                  ticket.status === 'fechado' ? "bg-green-500/10 text-green-400" : "bg-brand-primary/10 text-brand-primary"
                )}>
                  <MessageSquare size={28} />
                </div>
                <div>
                  <p className="font-bold text-lg group-hover:text-brand-primary transition-colors">{ticket.titulo}</p>
                  <p className="text-white/40 text-xs">Última atualização: {ticket.updated_at ? new Date(ticket.updated_at).toLocaleDateString('pt-BR') : '-'}</p>
                  <p className="text-white/20 text-xs mt-1 line-clamp-2">{ticket.descricao}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className={clsx(
                  "text-[10px] font-bold uppercase px-3 py-1 rounded-full",
                  ticket.prioridade === 'Alta' ? "bg-red-500/10 text-red-400" : "bg-white/5 text-white/40"
                )}>
                  {ticket.prioridade}
                </span>
                <span className={clsx(
                  "text-[10px] font-bold uppercase px-3 py-1 rounded-full",
                  ticket.status === 'aberto' ? "bg-brand-primary/10 text-brand-primary" : 
                  ticket.status === 'em_atendimento' ? "bg-yellow-500/10 text-yellow-400" : "bg-green-500/10 text-green-400"
                )}>
                  {ticket.status}
                </span>
                <ChevronRight className="text-white/10 group-hover:text-brand-primary transition-all" size={20} />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-brand-elevated p-16 rounded-[2.5rem] border border-white/5 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
            <MessageSquare size={40} />
          </div>
          <p className="text-white/40 font-medium">Você ainda não abriu nenhum chamado de suporte.</p>
        </div>
      )}

      {isCreating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
          <div className="bg-brand-elevated w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">Abrir Novo Chamado</h2>
              <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-white/5 rounded-full transition-all"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <CustomForm 
                id="ticket_form"
                schema={allConfigs['ticket_form'].jsonSchema}
                onSubmit={async (data) => {
                  // Busca sessão ativa do Balcão Virtual para o usuário (se houver)
                  let sessaoId = null;
                  let logsConversa = [];
                  if (user?.email) {
                    const { data: sessao, error: sessaoError } = await supabase
                      .from('balcao_virtual.sessoes_ativas')
                      .select('id')
                      .eq('usuario_email', user.email)
                      .eq('status', 'IA_TALKING')
                      .order('criado_em', { ascending: false })
                      .limit(1)
                      .maybeSingle();
                    if (sessao && sessao.id) {
                      sessaoId = sessao.id;
                      // Busca histórico da conversa
                      const { data: logs, error: logsError } = await supabase
                        .from('balcao_virtual.logs_conversas')
                        .select('id, role, text, criado_em')
                        .eq('sessao_id', sessaoId)
                        .order('criado_em', { ascending: true });
                      if (logs && !logsError) {
                        logsConversa = logs;
                      }
                    }
                  }

                  // Cria o ticket no schema correto
                  const ticketInsert = {
                    cliente_id: clienteId,
                    escritorio_id: escritorioId,
                    titulo: data.titulo || data.subject || 'Chamado',
                    descricao: data.descricao || data.message || '',
                    status: 'aberto',
                    prioridade: data.prioridade || data.priority || 'Normal',
                    canal: sessaoId ? 'balcao_virtual' : 'portal',
                    // campos extras se necessário
                  };
                  const { data: ticketData, error: ticketError } = await supabase
                    .from('tickets.tickets')
                    .insert([ticketInsert])
                    .select('id')
                    .single();
                  if (!ticketError && ticketData?.id) {
                    // Se houver histórico de conversa, importar como comentários do ticket
                    if (logsConversa.length > 0) {
                      const comments = logsConversa.map((log: any) => ({
                        ticket_id: ticketData.id,
                        autor_tipo: log.role === 'user' ? 'cliente' : 'agente',
                        mensagem: log.text,
                        created_at: log.criado_em
                      }));
                      if (comments.length > 0) {
                        await supabase.from('tickets.ticket_comments').insert(comments);
                      }
                    }
                    setIsCreating(false);
                    fetchTickets();
                  }
                }}
                theme={contactFormTheme}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;
