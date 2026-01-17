import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, TrendingDown, Star } from 'lucide-react';
import { useTheme } from '../../../styles/ThemeProvider';

const Hero: React.FC = () => {
  const { mode } = useTheme();
  const bg = mode === 'clear' ? 'bg-white' : 'bg-brand-dark';
  const text = mode === 'clear' ? 'text-gray-900' : 'text-white';
  return (
    <section className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden ${bg}`}>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#0d9c6e15_0%,transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`text-center lg:text-left space-y-8`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${mode === 'clear' ? 'bg-gray-100 border border-gray-200' : 'bg-brand-accent/10 border border-brand-accent/20'}`}> 
              <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
              <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">Lei 14.181/2021 - Superendividamento</span>
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold ${text} leading-[1.1] sm:!text-[53px]`}>
              Advogado Especialista em Superendividamento: Parcele suas <span className="text-brand-primary">dívidas</span> em até 5 anos
            </h1>
            <p className={`text-lg ${mode === 'clear' ? 'text-gray-700' : 'text-white/70'} max-w-xl mx-auto lg:mx-0 leading-relaxed`}>
              Advocacia especializada em superendividamento e defesa do consumidor. Mais de R$ 35 milhões em redução de dívidas renegociados em todo o Brasil. Recupere sua paz financeira hoje.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full sm:w-auto font-bold text-lg flex items-center justify-center gap-3 transition-all rounded-xl px-8 py-4 group
                  ${mode === 'clear' ? 'bg-[#00d969] text-[#3a4b67] hover:bg-[#00c75a] shadow-md border border-[#00d969]' : 'bg-[#00d969] text-[#3a4b67] hover:bg-[#00c75a] shadow-xl border border-[#00d969]'}`}
              >
                Calcular Gratuitamente
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/appointments" className={`w-full sm:w-auto font-bold text-lg transition-all items-center justify-center rounded-xl px-8 py-4
                ${mode === 'clear' ? 'bg-white border border-[#00d969] text-[#3a4b67] hover:bg-gray-50 shadow' : 'bg-white/5 hover:bg-white/10 text-white border border-[#00d969]'}`}> 
                Agendar Consulta
              </Link>
            </div>
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex -space-x-3">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/avatars/familia1.jpg" className="w-10 h-10 rounded-full border-2 border-[#00d969] object-cover" alt="Família Satisfeita 1" />
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/avatars/familia2.jpg" className="w-10 h-10 rounded-full border-2 border-[#00d969] object-cover" alt="Família Satisfeita 2" />
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/avatars/familia3.jpg" className="w-10 h-10 rounded-full border-2 border-[#00d969] object-cover" alt="Família Satisfeita 3" />
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/avatars/familia4.jpg" className="w-10 h-10 rounded-full border-2 border-[#00d969] object-cover" alt="Família Satisfeita 4" />
              </div>
              <div className="text-sm">
                <div className="flex text-brand-accent">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white/60 font-medium">+2.500 famílias satisfeitas</p>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 bg-brand-elevated p-4 rounded-2xl border border-white/10 shadow-xl z-30 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/20 p-2 rounded-lg">
                  <ShieldCheck className="text-brand-primary" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">OAB/RS 107048</p>
                  <p className="text-white/50 text-xs">Pós-graduado</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-brand-elevated p-4 rounded-2xl border border-white/10 shadow-xl z-30 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="bg-brand-accent/20 p-2 rounded-lg">
                  <TrendingDown className="text-brand-accent" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">12 anos</p>
                  <p className="text-white/50 text-xs">de Atuação</p>
                </div>
              </div>
            </div>
            <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69457177ae7e61f63fb38329/3b78c0579__TLM961311.jpg"
                alt="Dr. Adriano Hermida Maia, advogado especialista em superendividamento e Lei 14.181/2021."
                className="w-full h-auto object-cover relative z-30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
