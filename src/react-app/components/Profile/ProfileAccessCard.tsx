import React from 'react';
import { Shield, Briefcase } from 'lucide-react';

const ProfileAccessCard = ({ profile, isAdmin, isColaborador }: any) => (
  <div className="bg-brand-elevated p-6 rounded-2xl border border-white/5 space-y-4">
    <div className="flex items-center gap-3 text-sm">
      <Shield className="text-brand-primary" size={18} />
      <span className="text-white/60">Acesso Verificado</span>
    </div>
    {(isAdmin || isColaborador) && (
      <div className="flex items-center gap-3 text-sm">
        <Briefcase className="text-brand-primary" size={18} />
        <span className="text-white/60">{profile?.area_atuacao || 'Área não definida'}</span>
      </div>
    )}
  </div>
);

export default ProfileAccessCard;
