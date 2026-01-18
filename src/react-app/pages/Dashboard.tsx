
// Manifesto: Dashboard
// - Modular: DashboardSidebar, DashboardHeaderActions, DashboardSkeleton, módulos de cada aba
// - Skeleton: loading states em cada módulo
// - Hooks: useState, useEffect, useMemo, custom handleExport, handleConfigUpdate
// - Router: react-router-dom
// - Mobile-first, acessível, tokenização CSS
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../auth/supabaseAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardHeaderActions from '../components/Dashboard/DashboardHeaderActions';
import DashboardSkeleton from '../components/Dashboard/DashboardSkeleton';
import OverviewModule from '../components/Dashboard/OverviewModule';
import CRMModule from '../components/Dashboard/CRMModule';
import ProcessosModule from '../components/Dashboard/ProcessosModule';
import FaturasModule from '../components/Dashboard/FaturasModule';
import TicketsModule from '../components/Dashboard/TicketsModule';
import AIMonitoringModule from '../components/AIMonitoring/AIMonitoringModule';
import { BalcaoVirtualModule } from '../components/BalcaoVirtual/BalcaoVirtualModule';
import { ChatbotConfigModule } from '../components/ChatbotConfigModule';
import { BlogManagementModule } from '../components/BlogManagement/BlogManagementModule';
import { PublicacoesModule } from '../components/Publicacoes/PublicacoesModule';
import clsx from 'clsx';
import { CreditCard, Download, Search, MessageSquare, ChevronRight, Bot, Zap, CheckCircle2, Clock, AlertCircle, Calendar, Settings, Chrome, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  // ...hooks e lógica modular aqui...
  // Exemplo:
  const [activeTab, setActiveTab] = useState('leads');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = useMemo(() => data, [data]);
  // ...outros hooks e handlers...
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 min-w-0 space-y-6">
            {activeTab !== 'config' && (
              <DashboardHeaderActions searchTerm={searchTerm} setSearchTerm={setSearchTerm} onExport={() => {}} />
            )}
            {loading ? (
              <DashboardSkeleton />
            ) : (
              <div className="animate-fade-in">
                {activeTab === 'leads' && <CRMModule data={filteredData} />}
                {activeTab === 'processos' && <ProcessosModule data={filteredData} />}
                {activeTab === 'faturas' && <FaturasModule data={filteredData} />}
                {activeTab === 'tickets' && <TicketsModule data={filteredData} />}
                {activeTab === 'publicacoes' && <PublicacoesModule />}
                {activeTab === 'ai' && <AIMonitoringModule data={filteredData} />}
                {activeTab === 'chatbot' && <ChatbotConfigModule />}
                {activeTab === 'balcao' && <BalcaoVirtualModule />}
                {activeTab === 'blog' && <BlogManagementModule />}
                {activeTab === 'agenda' && <AdminAgendaModule />}
                {activeTab === 'overview' && <OverviewModule />}
                {activeTab === 'config' && <ConfigModule />}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const AIModule = ({ data }: { data: any[] }) => (
  <div className="grid gap-4">
    {data.map((session, i) => (
      <div key={i} className="bg-brand-elevated p-6 rounded-2xl border border-white/5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">{session.visitor_email || 'Visitante Anônimo'}</p>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Sessão: {session.session_id.slice(0, 8)}</p>
            </div>
          </div>
          <span className={clsx(
            "text-[10px] font-bold uppercase px-3 py-1 rounded-full",
            session.status === 'active' ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/40"
          )}>
            {session.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-white/40">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><MessageSquare size={14} /> {session.message_count} mensagens</span>
            <span className="flex items-center gap-1"><Zap size={14} /> {session.interaction_type}</span>
          </div>
          <button className="text-brand-primary font-bold hover:underline">Intervir na Conversa</button>
        </div>
      </div>
    ))}
  </div>
);

const AdminAgendaModule = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/appointments');
      if (res.ok) setAppointments(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    const notes = prompt('Observações (opcional):');
    try {
      const res = await fetch(`/api/admin/appointments/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
      if (res.ok) fetchAppointments();
    } catch (e) {
      alert('Erro ao atualizar status.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Gestão de Agenda</h2>
        <div className="bg-brand-primary/10 px-4 py-2 rounded-xl border border-brand-primary/20">
          <p className="text-brand-primary text-[10px] font-bold uppercase">Controle Interno</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>
      ) : appointments.length > 0 ? (
        <div className="grid gap-4">
          {appointments.map((app, idx) => (
            <div key={idx} className="bg-brand-elevated p-6 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex gap-4">
                  <div className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                    app.status === 'confirmado' ? "bg-green-500/10 text-green-400" : 
                    app.status === 'aguardando_aceite' ? "bg-yellow-500/10 text-yellow-400" : "bg-white/5 text-white/20"
                  )}>
                    {app.status === 'confirmado' ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-brand-primary/10 text-brand-primary text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">
                        {app.form_data.appointment_type === 'tecnica' ? 'Consulta Técnica' : 'Avaliação'}
                      </span>
                      <p className="text-white/40 text-[10px] font-bold uppercase">{new Date(app.form_data.appointment_date).toLocaleDateString('pt-BR')} às {app.form_data.appointment_time}</p>
                    </div>
                    <h3 className="text-lg font-bold">{app.form_data.name}</h3>
                    <p className="text-sm text-white/50">{app.form_data.email} • {app.form_data.phone}</p>
                    <p className="text-xs text-white/30 mt-2 italic">"{app.form_data.reason}"</p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-4">
                  <span className={clsx(
                    "text-[10px] font-bold uppercase px-4 py-1.5 rounded-full shadow-lg",
                    app.status === 'confirmado' ? "bg-green-500/10 text-green-400" : 
                    app.status === 'aguardando_aceite' ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"
                  )}>
                    {app.status.replace('_', ' ')}
                  </span>
                  
                  {app.status === 'aguardando_aceite' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(app.id, 'confirmado')}
                        className="bg-green-500/10 hover:bg-green-500/20 text-green-400 p-2 rounded-lg transition-all"
                        title="Confirmar"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(app.id, 'recusado')}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg transition-all"
                        title="Recusar"
                      >
                        <AlertCircle size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-brand-elevated p-16 rounded-[2.5rem] border border-white/5 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
            <Calendar size={40} />
          </div>
          <p className="text-white/40 font-medium">Nenhum agendamento registrado no sistema.</p>
        </div>
      )}
    </div>
  );
};

const ConfigModule = () => {
  const [testResult, setTestResult] = React.useState<any>(null);
  const [isTesting, setIsTesting] = React.useState(false);
  const [stripeKey, setStripeKey] = React.useState('');
  const [connectId, setConnectId] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [showGuide, setShowGuide] = React.useState(true);
  const [activeSubTab, setActiveSubTab] = React.useState<'stripe' | 'google'>('stripe');
  const [showGoogleModal, setShowGoogleModal] = React.useState(false);

  const handleConnectGoogle = () => {
    setShowGoogleModal(true);
  };
  const confirmGoogleConnect = () => {
    setShowGoogleModal(false);
    window.location.href = '/api/admin/google-calendar/connect';
  };
  const cancelGoogleConnect = () => {
    setShowGoogleModal(false);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/stripe/test');
      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      setTestResult({ error: 'Erro ao testar conexão. Tente novamente.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveStripeConfig = async () => {
    if (!stripeKey || stripeKey.trim() === '') {
      setTestResult({ error: 'Insira uma chave Stripe válida.' });
      return;
    }
    
    if (!stripeKey.startsWith('sk_test') && !stripeKey.startsWith('sk_live') && !stripeKey.startsWith('rk_')) {
      setTestResult({ error: 'Chave Stripe inválida. Deve começar com "sk_test", "sk_live" ou "rk_".' });
      return;
    }

    if (connectId.trim() !== '' && !connectId.startsWith('acct_')) {
      setTestResult({ error: 'ID de conta Stripe inválido. Deve começar com "acct_".' });
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/config/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configType: 'stripe_config',
          value: { stripeKey, connectId }
        })
      });
      const data = await res.json();
      if (res.ok) {
        setTestResult({ message: '✅ Configuração salva com sucesso! Reinicie o worker para aplicar as mudanças.' });
        setStripeKey('');
        setConnectId('');
        setShowGuide(false);
        setTimeout(() => setTestResult(null), 5000);
      } else {
        setTestResult({ error: data.error || 'Erro ao salvar configuração.' });
      }
    } catch (err) {
      setTestResult({ error: 'Erro de rede ao salvar configuração. Verifique sua conexão.' });
    } finally {
      setIsSaving(false);
    }
  };

  const status = null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveSubTab('stripe')}
          className={clsx(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeSubTab === 'stripe' ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-white/40 hover:text-white hover:bg-white/5"
          )}
        >
          Pagamentos (Stripe)
        </button>
        <button 
          onClick={() => setActiveSubTab('google')}
          className={clsx(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeSubTab === 'google' ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-white/40 hover:text-white hover:bg-white/5"
          )}
        >
          Agenda (Google)
        </button>
      </div>

      {activeSubTab === 'stripe' ? (
        <div className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand-primary/10 p-4 rounded-2xl text-brand-primary">
                <CreditCard size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">Integração Stripe</h3>
                <p className="text-white/50">Gerencie seus pagamentos e conexões financeiras com segurança.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Status da Conexão</p>
                <div className="flex items-center gap-2">
                  {status?.stripe?.isConfigured ? (
                    <>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-lg font-bold text-green-400">Conectado ✅</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-lg font-bold text-yellow-400">Não Configurado</span>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Modo</p>
                <span className="text-lg font-bold uppercase text-white">{status?.stripe?.mode === 'test' ? '🧪 Test' : status?.stripe?.mode === 'live' ? '🚀 Live' : 'Desconhecido'}</span>
              </div>
            </div>

            {status?.stripe?.isConfigured ? (
              <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/30 mb-8">
                <p className="text-sm text-green-300 font-semibold mb-4">✅ Sua conta Stripe está conectada e pronta para processar pagamentos.</p>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all"
                  >
                    {isTesting ? '⏳ Testando...' : '🔗 Testar Conexão'}
                  </button>
                  {status?.stripe?.connectId && (
                    <div className="text-xs text-green-300 px-3 py-2 bg-green-500/20 rounded-xl">
                      Modo Connect: <strong>{status.stripe.connectId.slice(0, 8)}...</strong>
                    </div>
                  )}
                </div>
                {testResult && (
                  <div className={clsx('mt-4 p-4 rounded-lg text-sm', testResult.error ? 'bg-red-500/10 text-red-300' : 'bg-green-500/10 text-green-300')}>
                    {testResult.error || testResult.message || '✅ Conexão bem-sucedida!'}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-brand-primary/10 rounded-2xl border border-brand-primary/30 mb-8">
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  Para aceitar pagamentos via cartão de crédito, você precisa conectar sua conta Stripe. Preencha as credenciais abaixo.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-semibold text-white/70 mb-2 block">🔑 Chave Secreta Stripe</label>
                    <input
                      type="password"
                      value={stripeKey}
                      onChange={(e) => setStripeKey(e.target.value)}
                      placeholder="sk_test_... ou sk_live_..."
                      className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-brand-primary outline-none transition-all"
                    />
                    <p className="text-[10px] text-white/40 mt-1">Encontre em: dashboard.stripe.com → Developers → API Keys → Secret Key</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-white/70 mb-2 block">🏢 Conta Conectada (Opcional)</label>
                    <input
                      type="text"
                      value={connectId}
                      onChange={(e) => setConnectId(e.target.value)}
                      placeholder="acct_... (para Stripe Connect)"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-brand-primary outline-none transition-all"
                    />
                    <p className="text-[10px] text-white/40 mt-1">Deixe vazio se usar Stripe padrão. Para Stripe Connect, use o Account ID da conta conectada.</p>
                  </div>

                  <button
                    onClick={handleSaveStripeConfig}
                    disabled={isSaving || !stripeKey.trim()}
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Salvando...
                      </>
                    ) : (
                      '💾 Salvar Configuração Stripe'
                    )}
                  </button>
                </div>

                {testResult && (
                  <div className={clsx('p-4 rounded-lg text-sm', testResult.error ? 'bg-red-500/10 text-red-300' : 'bg-green-500/10 text-green-300')}>
                    {testResult.error || testResult.message}
                  </div>
                )}

                {showGuide && (
                  <div className="space-y-2 text-xs text-white/60 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p><strong>📋 Guia Rápido - Como Obter Suas Chaves:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 mt-2">
                      <li>Acesse <span className="text-brand-primary font-bold">dashboard.stripe.com</span></li>
                      <li>Clique em <strong>"Developers"</strong> no menu superior</li>
                      <li>Selecione <strong>"API Keys"</strong></li>
                      <li>Copie a chave secreta (começa com "sk_test" ou "sk_live")</li>
                      <li>Se usar Stripe Connect, adicione o Account ID (começa com "acct_")</li>
                      <li>Cole acima e clique em "Salvar Configuração Stripe"</li>
                    </ol>
                    <p className="mt-3 text-brand-primary font-bold">⚠️ Importante: Reinicie o worker após salvar para aplicar as mudanças!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand-primary/10 p-4 rounded-2xl text-brand-primary">
                <Settings size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">Google Calendar</h3>
                <p className="text-white/50">Sincronize sua agenda para permitir agendamentos automáticos e evitar conflitos.</p>
              </div>
            </div>

            <div className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5 mb-8">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Status da Integração</p>
              <div className="flex items-center gap-2">
                {status?.googleCalendar?.isConnected ? (
                  <>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-lg font-bold text-green-400">Conectado ({status.googleCalendar.email}) ✅</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    <span className="text-lg font-bold text-yellow-400">Não Conectado</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 bg-brand-primary/10 rounded-2xl border border-brand-primary/30 mb-8">
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Ao conectar sua conta Google, o sistema poderá ler seus horários ocupados e criar eventos automaticamente para novas consultas agendadas via site.
              </p>
              <button
                onClick={handleConnectGoogle}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-3"
              >
                <Chrome size={20} />
                {status?.googleCalendar?.isConnected ? 'Reconectar Google Calendar' : 'Conectar Google Calendar'}
              </button>
              {showGoogleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                  <div className="bg-brand-elevated p-8 rounded-2xl shadow-2xl max-w-md w-full border border-brand-primary/30 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Chrome size={24} className="text-brand-primary" />Conectar Google Calendar</h2>
                    <p className="text-white/80 mb-6">Você será redirecionado para o Google para autorizar o acesso à sua agenda. O sistema só poderá ler horários ocupados/livres e criar eventos em seu nome. Não acessamos e-mails ou dados privados.</p>
                    <div className="flex gap-4 mt-6">
                      <button onClick={confirmGoogleConnect} className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand-primary/20">Autorizar e Prosseguir</button>
                      <button onClick={cancelGoogleConnect} className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all">Cancelar</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs text-white/60 p-4 bg-white/5 rounded-lg border border-white/10">
              <p><strong>🔒 Privacidade e Segurança:</strong></p>
              <p>O sistema acessa apenas os metadados de disponibilidade (ocupado/livre) e cria eventos em seu nome. Não lemos o conteúdo de seus e-mails ou outros dados privados.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Settings size={20} className="text-brand-primary" />
          Configurações Gerais do Sistema
        </h4>
        <div className="grid gap-4">
          {[
            { label: 'E-mail de Notificação', value: 'contato@hermidamaia.adv.br' },
            { label: 'Moeda Padrão', value: 'BRL (R$)' },
            { label: 'Multa de Atraso', value: '10%' },
            { label: 'Juros de Mora', value: '1%a.m.' },
            { label: 'Status Stripe', value: status?.stripe?.isConfigured ? '✅ Conectado' : '⚠️ Desconectado' },
            { label: 'Status Google', value: status?.googleCalendar?.isConnected ? '✅ Conectado' : '⚠️ Desconectado' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <span className="text-sm text-white/60">{item.label}</span>
              <span className="text-sm font-bold text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

