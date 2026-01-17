import React from 'react';
import { User } from 'lucide-react';

const ProfileHeader = ({ email, profile, isAdmin, isColaborador, isCliente }: any) => (
  <div className="bg-brand-elevated p-8 rounded-3xl border border-white/5 text-center">
    <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <User className="text-brand-primary" size={48} />
    </div>
    <h2 className="font-bold text-lg">{profile?.user_email || email}</h2>
    <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
      {isAdmin && 'Administrador'}
      {isColaborador && 'Colaborador'}
      {isCliente && 'Cliente'}
    </p>
  </div>
);

export default ProfileHeader;
