

/**
 * @description Página de detalhes do processo jurídico reformulada.
 *             Exibe informações completas e integrações com Publicações, Financeiro e Suporte.
 *             Oferece recursos de ação para administradores e clientes.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Scale, 
  Clock, 
  Calendar, 
  CheckSquare, 
  FileText, 
  ArrowLeft, 
  Bot, 
  Zap, 
  ExternalLink, 
  Loader2, 
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  User,
  MapPin,
  Edit2,
  Download,
  Plus,
  MessageSquare,
  CreditCard,
  X,
  Send,
  CheckCircle2,
  MessageCircle,
  TrendingDown
} from 'lucide-react';
import Header from '../components/Header';
import { cn } from '../utils';
import { useAuth } from '@hey-boss/users-service/react';
import { CustomForm } from '../components/CustomForm';
import { contactFormTheme } from '../components/CustomForm/themes';
import allConfigs from '../../shared/form-configs.json' with { type: 'json' };

const ProcessDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'movements' | 'hearings' | 'tasks' | 'documents' | 'publicacoes' | 'financeiro' | 'suporte'>('movements');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  
  // Modais
  const [showAddMovement, setShowAddMovement] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddTicket, setShowAddTicket] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/processos/${id}/details`);
      if (res.ok) {
        setData(await res.json());
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleGenerateAISummary = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch(`/api/admin/processos/${id}/ai-summary`, { method: 'POST' });
      const result = await res.json();
      if (res.ok) {
        setAiSummary(result.summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  if (!data) return null;

  const { processo, movements, hearings, tasks, documents, publicacoes, faturas, tickets } = data;
  const isAdmin = (user as any)?.isAdmin;

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex gap-3 w-full sm:w-auto">
            {isAdmin ? (
              <>
                <button 
                  onClick={handleGenerateAISummary}
                  disabled={loadingAI}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary px-4 py-2 rounded-xl text-sm font-bold border border-brand-primary/20 transition-all"
                >
                  {loadingAI ? <Loader2 className="animate-spin" size={18} /> : <Bot size={18} />}
                  Resumo IA
                </button>
                <button 
                  onClick={() => setShowAddMovement(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-primary/20"
                >
                  <Plus size={18} />
                  Novo Andamento
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowAddTicket(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-primary/20"
              >
                <MessageSquare size={18} />
                Abrir Chamado
              </button>
            )}
          </div>
        </div>

        {/* Process Header Card */}
        <div className="bg-brand-elevated p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-brand-primary/20">
                    {processo.area || 'Jurídico'}
                  </span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-3 py-1 rounded-full",
                    processo.status === 'Concluído' ? "bg-green-500/10 text-green-400" : "bg-brand-primary/10 text-brand-primary"
                  )}>
                    {processo.status}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{processo.titulo}</h1>
                <p className="text-white/40 font-mono text-lg">{processo.numero_cnj}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 shrink-0">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <User size={16} className="text-brand-primary" />
                    <span className="text-[10px] font-bold text-white/40 uppercase">Cliente</span>
                  </div>
                  <p className="text-sm font-bold">{processo.cliente_email}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={16} className="text-brand-primary" />
                    <span className="text-[10px] font-bold text-white/40 uppercase">Tribunal</span>
                  </div>
                  <p className="text-sm font-bold">{processo.tribunal || 'Não informado'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary Section */}
        {aiSummary && (

          import React, { useState, useEffect } from 'react';
          import { useParams, useNavigate, Link } from 'react-router-dom';
          import Header from '../components/Header';
          import { useAuth } from '@hey-boss/users-service/react';
          import { CustomForm } from '../components/CustomForm';
          import { contactFormTheme } from '../components/CustomForm/themes';
          import allConfigs from '../../shared/form-configs.json' with { type: 'json' };
          import ProcessDetailHeader from '../components/ProcessDetail/ProcessDetailHeader';
          import ProcessDetailTabs from '../components/ProcessDetail/ProcessDetailTabs';
          import ProcessDetailSkeleton from '../components/ProcessDetail/ProcessDetailSkeleton';
          import { processDetailPageManifest } from '../components/ProcessDetail/ProcessDetailPage.manifest';

          const ProcessDetailPage = () => {
            const { id } = useParams();
            const navigate = useNavigate();
            const { user } = useAuth();
            const [loading, setLoading] = useState(true);
            const [data, setData] = useState<any>(null);
            const [activeTab, setActiveTab] = useState('movements');
            const [aiSummary, setAiSummary] = useState<string | null>(null);
            const [loadingAI, setLoadingAI] = useState(false);
            const [showAddMovement, setShowAddMovement] = useState(false);
            const [showAddTicket, setShowAddTicket] = useState(false);

            const fetchDetails = async () => {
              setLoading(true);
              try {
                const res = await fetch(`/api/processos/${id}/details`);
                if (res.ok) {
                  setData(await res.json());
                } else {
                  navigate('/dashboard');
                }
              } catch (err) {
                // log error
              } finally {
                setLoading(false);
              }
            };

            useEffect(() => {
              fetchDetails();
            }, [id]);

            const handleGenerateAISummary = async () => {
              setLoadingAI(true);
              try {
                const res = await fetch(`/api/admin/processos/${id}/ai-summary`, { method: 'POST' });
                const result = await res.json();
                if (res.ok) setAiSummary(result.summary);
              } catch {
                // log error
              } finally {
                setLoadingAI(false);
              }
            };

            if (loading) return <ProcessDetailSkeleton />;
            if (!data) return null;

            const { processo, movements, hearings, tasks, documents, publicacoes, faturas, tickets } = data;
            const isAdmin = (user as any)?.isAdmin;

            return (
              <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
                <Header />
                <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                      {/* ArrowLeft icon */} Voltar
                    </button>
                    <div className="flex gap-3 w-full sm:w-auto">
                      {isAdmin ? (
                        <>
                          <button onClick={handleGenerateAISummary} disabled={loadingAI} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary px-4 py-2 rounded-xl text-sm font-bold border border-brand-primary/20 transition-all">
                            {loadingAI ? '...' : 'Resumo IA'}
                          </button>
                          <button onClick={() => setShowAddMovement(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-primary/20">
                            Novo Andamento
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setShowAddTicket(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-primary/20">
                          Abrir Chamado
                        </button>
                      )}
                    </div>
                  </div>
                  <ProcessDetailHeader processo={processo} />
                  {aiSummary && (
                    <div className="bg-brand-primary/10 border border-brand-primary/30 p-6 rounded-3xl mb-8 animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-brand-primary p-2 rounded-lg text-white">IA</div>
                        <h3 className="font-bold text-lg">Análise Inteligente do Caso</h3>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{aiSummary}</p>
                    </div>
                  )}
                  <ProcessDetailTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    counts={{
                      movements: movements.length,
                      publicacoes: publicacoes.length,
                      financeiro: faturas.length,
                      suporte: tickets.length,
                      hearings: hearings.length,
                      tasks: tasks.length,
                      documents: documents.length
                    }}
                  />
                  {/* ...existing tab content and modals, refactor to subcomponents as needed... */}
                </main>
              </div>
            );
          };

          export default ProcessDetailPage;
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              });
              if (res.ok) {
                setShowAddTicket(false);
                fetchDetails();
                alert('Chamado aberto com sucesso!');
              }
            }}
            theme={contactFormTheme}
          />
        </ActionModal>
      )}
    </div>
  );
};

const EmptyState = ({ icon: Icon, message }: { icon: any, message: string }) => (
  <div className="bg-brand-elevated p-16 rounded-[2.5rem] border border-white/5 text-center space-y-6 shadow-2xl">
    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
      <Icon size={40} />
    </div>
    <p className="text-white/40 font-medium">{message}</p>
  </div>
);

const ActionModal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
    <div className="bg-brand-elevated w-full max-w-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
      <div className="p-8 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all"><X size={24} /></button>
      </div>
      <div className="p-8 overflow-y-auto max-h-[70vh]">
        {children}
      </div>
    </div>
  </div>
);




