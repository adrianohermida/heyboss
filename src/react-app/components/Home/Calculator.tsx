import React from 'react';
import { AlertCircle, CheckCircle2, MessageCircle, Zap } from 'lucide-react';
import { useTheme } from '../../../styles/ThemeProvider';

const Calculator: React.FC = () => {
  const { mode } = useTheme();
  const bg = mode === 'clear' ? 'bg-white' : 'bg-brand-dark';
  const [formData, setFormData] = React.useState({
    totalDebt: '',
    monthlyInstallment: '',
    monthlyIncome: ''
  });
  const [result, setResult] = React.useState<{
    percentage: number;
    isSuperendividado: boolean;
  } | null>(null);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    const amount = (parseInt(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return amount;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const formatted = formatCurrency(e.target.value);
    setFormData(prev => ({ ...prev, [field]: formatted }));
  };

  const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  };

  const [isSaving, setIsSaving] = React.useState(false);

  const calculate = async () => {
    const installment = parseCurrency(formData.monthlyInstallment);
    const income = parseCurrency(formData.monthlyIncome);
    if (income > 0) {
      const percentage = (installment / income) * 100;
      const calculationResult = {
        percentage,
        isSuperendividado: percentage > 30
      };
      setResult(calculationResult);
      setIsSaving(true);
      try {
        await fetch('/api/simulations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            simulationData: {
              ...formData,
              ...calculationResult,
              timestamp: new Date().toISOString()
            }
          })
        });
      } catch (error) {
        // erro ao salvar simulação
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <section id="calculadora" className={`py-24 ${bg} relative overflow-hidden`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className={`rounded-[2.5rem] p-8 sm:p-12 shadow ${mode === 'clear' ? 'bg-white border border-gray-200' : 'bg-brand-elevated border border-white/10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Calculadora de Superendividamento: Veja como Eliminar Dívidas</h2>
            <p className="text-white/60">Descubra em minutos se você tem direito à Lei 14.181/2021 para renegociar dívidas até 70% e sair do sufoco financeiro.</p>
          </div>
          {!result ? (
            <div className="space-y-8">
              <div className="flex justify-center gap-8 mb-12">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${step < 3 ? 'bg-brand-primary text-white' : 'border-2 border-brand-primary text-brand-primary'}`}>
                      {step < 3 ? <CheckCircle2 size={24} /> : step}
                    </div>
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Passo {step}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/70 ml-1">Valor total das dívidas <span className="text-white/30 font-normal">(Ex: R$ 15.000)</span></label>
                  <input 
                    type="text" 
                    value={formData.totalDebt}
                    onChange={(e) => handleInputChange(e, 'totalDebt')}
                    placeholder="R$ 0,00" 
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/70 ml-1">Parcelas mensais <span className="text-white/30 font-normal">(Ex: R$ 2.500)</span></label>
                  <input 
                    type="text" 
                    value={formData.monthlyInstallment}
                    onChange={(e) => handleInputChange(e, 'monthlyInstallment')}
                    placeholder="R$ 0,00" 
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-all" 
                  />
                  <p className="text-[10px] text-white/40 ml-1">Soma de cartões, empréstimos e parcelamentos (exceto garantia de bens, impostos, pensão)</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/70 ml-1">Renda líquida familiar <span className="text-white/30 font-normal">(Ex: R$ 5.000)</span></label>
                  <input 
                    type="text" 
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange(e, 'monthlyIncome')}
                    placeholder="R$ 0,00" 
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-all" 
                  />
                  <p className="text-[10px] text-white/40 ml-1">Salário bruto menos impostos</p>
                </div>
              </div>
              <button 
                onClick={calculate}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-5 rounded-2xl font-extrabold text-xl shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                Calcular Minha Situação
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className={`p-3 rounded-full ${result.isSuperendividado ? 'bg-red-500/20 text-red-500' : 'bg-brand-primary/20 text-brand-primary'}`}>
                  {result.isSuperendividado ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {result.isSuperendividado ? 'Identificamos Superendividamento' : 'Situação sob Controle'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    Suas dívidas comprometem <span className={`font-bold ${result.isSuperendividado ? 'text-red-500' : 'text-brand-primary'}`}>{result.percentage.toFixed(1)}%</span> da sua renda (limite saudável: 30%)
                  </p>
                </div>
              </div>
              <div className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total de Dívidas:</span>
                  <span className="text-white font-bold">{formData.totalDebt}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Parcelas Mensais:</span>
                  <span className="text-white font-bold">{formData.monthlyInstallment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Renda Líquida:</span>
                  <span className="text-white font-bold">{formData.monthlyIncome}</span>
                </div>
              </div>
              <div className="p-6 bg-brand-primary/10 rounded-2xl border border-brand-primary/30">
                <div className="flex gap-3">
                  <div className="bg-brand-primary text-white p-1 rounded-md h-fit mt-1">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    {result.isSuperendividado 
                      ? <><span className="font-bold">Ótima notícia:</span> Você tem direito à Lei do Superendividamento! Podemos reduzir até 70% das suas dívidas e restaurar sua paz financeira.</>
                      : <><span className="font-bold">Atenção:</span> Embora não esteja tecnicamente superendividado, você pode considerar agendar uma consulta para avaliar a existência de juros ou cláusulas abusivas em seus contratos.</>
                    }
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="https://wa.me/5551996032004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00d969] text-[#3a4b67] hover:bg-[#00c75a] px-4 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 border border-[#00d969]"
                >
                  <MessageCircle size={18} />
                  Falar com Advogado
                </a>
                <button 
                  onClick={() => {
                    setResult(null);
                    setFormData({ totalDebt: '', monthlyInstallment: '', monthlyIncome: '' });
                  }}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Zap size={18} />
                  Nova Análise
                </button>
              </div>
            </div>
          )}
          <p className="text-center text-[10px] text-white/20 mt-8">
            * Seus dados estão protegidos pela LGPD e serão usados apenas para esta análise.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
