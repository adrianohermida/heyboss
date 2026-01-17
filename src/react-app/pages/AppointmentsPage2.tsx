
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import AppointmentsHero from '../components/Appointments/AppointmentsHero';
import AppointmentsBenefits from '../components/Appointments/AppointmentsBenefits';
import AppointmentsTypeStep from '../components/Appointments/AppointmentsTypeStep';
import AppointmentsProgress from '../components/Appointments/AppointmentsProgress';
import AppointmentsProfessionalSelect from '../components/Appointments/AppointmentsProfessionalSelect';
import AppointmentsCalendar from '../components/Appointments/AppointmentsCalendar';
import AppointmentsSlots from '../components/Appointments/AppointmentsSlots';
import AppointmentsSummary from '../components/Appointments/AppointmentsSummary';
import AppointmentsSuccess from '../components/Appointments/AppointmentsSuccess';
import { CustomForm } from '../components/CustomForm';
import { contactFormTheme } from '../components/CustomForm/themes';
import allConfigs from '../../shared/form-configs.json';
import { useAuth } from '@hey-boss/users-service/react';
import { useNavigate } from 'react-router-dom';

const AppointmentsPage2: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointmentType, setAppointmentType] = useState<'avaliacao' | 'tecnica'>('avaliacao');
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [selectedProf, setSelectedProf] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    setSkeleton(true);
    setTimeout(() => setSkeleton(false), 500);
    window.scrollTo(0, 0);
    document.title = 'Agendar Consulta | Hermida Maia Advocacia';
  }, []);

  useEffect(() => {
    fetch('/api/appointments/profissionais')
      .then(res => res.json())
      .then(data => {
        setProfissionais(data);
        if (data.length > 0) setSelectedProf(data[0]);
      });
  }, []);

  useEffect(() => {
    if (selectedDate && selectedProf) {
      setLoading(true);
      fetch(`/api/appointments/slots?date=${selectedDate}&profId=${selectedProf.id}&type=${appointmentType}`)
        .then(res => res.json())
        .then(data => {
          setAvailableSlots(data);
          setLoading(false);
        });
    }
  }, [selectedDate, selectedProf, appointmentType]);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    const firstDay = date.getDay();
    for (let i = 0; i < firstDay; i++) days.push(null);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minAdvanceHours = appointmentType === 'tecnica' ? 72 : 48;
    const minDate = new Date(today.getTime() + minAdvanceHours * 60 * 60 * 1000);
    return date < minDate || date.getDay() === 0 || date.getDay() === 6;
  };

  const handleSubmit = async (formData: any) => {
    if (!user) { navigate('/login'); return; }
    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: 'appointment_form',
          ...formData,
          appointment_type: appointmentType,
          appointment_date: selectedDate,
          appointment_time: selectedSlot.hora_inicio,
          profissional_id: selectedProf.id
        })
      });
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const error = await response.json();
        alert(error.error || 'Ocorreu um erro ao processar seu agendamento.');
      }
    } catch (error) {
      alert('Erro ao enviar agendamento.');
    }
  };

  if (skeleton) {
    return <div className="min-h-screen flex items-center justify-center bg-brand-dark"><div className="animate-pulse w-16 h-16 rounded-full bg-brand-primary/30" aria-label="Carregando..." /></div>;
  }
  if (submitted) {
    return <AppointmentsSuccess date={selectedDate && new Date(selectedDate).toLocaleDateString('pt-BR')} time={selectedSlot?.hora_inicio} />;
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
      <Header />
      <main className="pt-0 pb-20 px-2">
        <AppointmentsHero />
        <AppointmentsBenefits />
        <div className="max-w-4xl mx-auto bg-brand-elevated p-4 sm:p-8 rounded-3xl border border-white/10 shadow-2xl mt-8">
          <AppointmentsProgress step={step} />
          {!user && !authLoading ? (
            <div className="bg-brand-dark/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-8 text-center border-2 border-brand-primary shadow-2xl animate-fade-in mb-6">
              <p className="text-white/70 mb-8 max-w-xs text-base">Para agendar, crie uma conta gratuita ou faça login. Seus dados estarão protegidos e o atendimento é sigiloso.</p>
              <a href="/register" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 mb-2">Criar Conta Gratuita</a>
              <a href="/login" className="w-full bg-white/5 hover:bg-white/10 text-brand-primary border border-brand-primary px-8 py-4 rounded-xl font-bold text-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 mb-2">Já tenho conta – Entrar</a>
              <a href="/forgot-password" className="w-full text-xs text-white/50 hover:text-brand-primary underline mt-2 transition-all">Esqueci minha senha</a>
              <p className="text-white/30 text-xs mt-6">Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade.</p>
            </div>
          ) : step === 0 ? (
            <AppointmentsTypeStep onSelect={type => { setAppointmentType(type); setStep(1); }} />
          ) : step === 1 ? (
            <>
              <AppointmentsProfessionalSelect profissionais={profissionais} selectedProf={selectedProf} onSelect={setSelectedProf} />
              <AppointmentsCalendar daysInMonth={daysInMonth} currentMonth={currentMonth} selectedDate={selectedDate} isToday={isToday} isPast={isPast} onSelect={setSelectedDate} onPrev={prevMonth} onNext={nextMonth} />
              {selectedDate && (
                <AppointmentsSlots slots={availableSlots} loading={loading} selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
              )}
              <button disabled={!selectedSlot} onClick={() => setStep(2)} className="w-full bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-extrabold text-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 mt-4">Próximo Passo</button>
            </>
          ) : (
            <>
              <AppointmentsSummary prof={selectedProf} date={selectedDate} slot={selectedSlot} type={appointmentType} />
              <CustomForm id="appointment_form" schema={allConfigs.appointment_form.jsonSchema as any} formData={user ? { name: user.name, email: user.email } : {}} onSubmit={handleSubmit} theme={contactFormTheme} labels={{ submit: 'Confirmar Solicitação', submitting: 'Processando...' }} />
            </>
          )}
          <p className="text-center text-[10px] text-white/20 mt-8">* Ao clicar em solicitar, você concorda com nossos termos de uso e política de privacidade. Seus dados estão protegidos pela LGPD.</p>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AppointmentsPage2;
