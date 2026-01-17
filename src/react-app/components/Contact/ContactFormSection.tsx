// Manifesto: ContactFormSection
// - Exibe formulário de contato e status de envio
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
interface Props {
  status: { type: 'success' | 'error' | null; message: string };
  setStatus: (s: { type: 'success' | 'error' | null; message: string }) => void;
  onSubmit: (formData: any) => void;
  CustomForm: any;
  schema: any;
  theme: any;
}
const ContactFormSection: React.FC<Props> = ({ status, setStatus, onSubmit, CustomForm, schema, theme }) => (
  <section className="max-w-3xl mx-auto">
    <div className="bg-brand-elevated rounded-[2.5rem] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Envie uma Mensagem</h2>
        <p className="text-white/50">Preencha os campos abaixo e nossa equipe jurídica analisará seu caso com prioridade.</p>
      </div>
      {status.type ? (
        <div className={`p-6 rounded-2xl flex items-start gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500 ${status.type === 'success' ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-red-500/10 border border-red-500/20'}`}>
          {status.type === 'success' ? (
            <CheckCircle2 className="text-brand-primary shrink-0" size={24} aria-hidden />
          ) : (
            <AlertCircle className="text-red-400 shrink-0" size={24} aria-hidden />
          )}
          <div>
            <p className={`font-bold ${status.type === 'success' ? 'text-brand-primary' : 'text-red-400'}`}>{status.type === 'success' ? 'Sucesso!' : 'Ops!'}</p>
            <p className="text-white/70 text-sm mt-1">{status.message}</p>
            {status.type === 'success' && (
              <button onClick={() => setStatus({ type: null, message: '' })} className="mt-4 text-brand-primary text-sm font-bold hover:underline">Enviar outra mensagem</button>
            )}
          </div>
        </div>
      ) : (
        <CustomForm
          id="contact_form"
          schema={schema}
          onSubmit={onSubmit}
          theme={theme}
          labels={{ submit: 'Enviar Mensagem', submitting: 'Enviando...' }}
        />
      )}
    </div>
  </section>
);
export default ContactFormSection;
