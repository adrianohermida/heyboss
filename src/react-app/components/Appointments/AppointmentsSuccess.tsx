import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = { date: string; time: string };
const AppointmentsSuccess: React.FC<Props> = ({ date, time }) => (
  <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in py-24">
    <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle2 className="text-brand-primary" size={48} />
    </div>
    <h1 className="text-4xl font-extrabold">Solicitação Recebida!</h1>
    <p className="text-white/60 text-lg">
      Obrigado por confiar na Hermida Maia Advocacia. Sua solicitação para o dia <strong>{date}</strong> às <strong>{time}</strong> foi enviada.<br/><br/>
      O status atual é <strong>Aguardando Aceite</strong>. Você receberá uma confirmação por e-mail assim que o profissional validar o horário.
    </p>
    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/account" className="bg-brand-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all">
        Ver Meus Agendamentos
      </Link>
      <Link to="/" className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
        Voltar para o Início
      </Link>
    </div>
  </div>
);
export default AppointmentsSuccess;
