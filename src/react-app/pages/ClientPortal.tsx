
// ------------------- IMPORTS -------------------
import React, { useState, useEffect } from 'react';
import { AlertCircle, Wallet, MessageSquare, ChevronRight, X, Calendar as CalendarIcon, Loader2, Scale, CheckCircle2, Clock, CreditCard, Download, Plus, FileText, ExternalLink } from 'lucide-react';

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
                            <span className={clsx(
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
            {activeTab === 'tickets' && <TicketsModule user={user} clienteId={clienteId} escritorioId={escritorioId} />}
            {/* ...outros módulos... */}
          </div>

        </div>
      </main>
    </div>
  );
}

export default ClientPortal;
