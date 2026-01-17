import React from 'react';
import { CustomForm } from '../../components/CustomForm';
import { contactFormTheme } from '../../components/CustomForm/themes';
import allConfigs from '../../../shared/form-configs.json';

const ProfileForm = ({ profile, email, isCliente, saving, handleSave, message }: any) => (
  <div className="bg-brand-elevated p-8 rounded-3xl border border-white/5 shadow-xl">
    {message && (
      <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
        <span className="text-sm font-bold">{message.text}</span>
      </div>
    )}
    <div className="mb-6 p-4 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-xs text-brand-primary">
      <b>LGPD:</b> Seus dados pessoais são utilizados apenas para identificação e contato. Você pode editar ou remover seus dados, exceto o e-mail, que é usado como identificador único.
    </div>
    <CustomForm
      id="profile_form"
      schema={{
        ...allConfigs.profile_form.jsonSchema,
        properties: {
          ...allConfigs.profile_form.jsonSchema.properties,
          user_email: {
            ...allConfigs.profile_form.jsonSchema.properties.user_email,
            readOnly: true,
            description: 'E-mail não pode ser alterado.'
          },
          ...(isCliente ? {
            oab_numero: { ...allConfigs.profile_form.jsonSchema.properties.oab_numero, hidden: true },
            area_atuacao: { ...allConfigs.profile_form.jsonSchema.properties.area_atuacao, hidden: true }
          } : {})
        },
        required: ["user_email"]
      }}
      formData={{ ...profile, user_email: email }}
      onSubmit={handleSave}
      theme={contactFormTheme}
      labels={{ submit: saving ? 'Salvando...' : 'Salvar Alterações' }}
    />
  </div>
);

export default ProfileForm;
