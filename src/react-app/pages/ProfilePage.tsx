

/**
 * @description Página de Perfil do Usuário para Hermida Maia Advocacia.
 *             Permite que advogados e membros da equipe editem seus dados profissionais.
 *             Utiliza CustomForm para persistência no banco de dados D1.
 */



import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../auth/supabaseAuth';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileAccessCard from '../components/Profile/ProfileAccessCard';
import ProfileForm from '../components/Profile/ProfileForm';
import ProfileSkeleton from '../components/Profile/ProfileSkeleton';
import { profilePageManifest } from '../components/Profile/ProfilePage.manifest';

const adminEmails = ["adrianohermida@gmail.com", "contato@hermidamaia.adv.br", "admin@example.com"];

const ProfilePage = () => {
  const { user: supaUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const email = (supaUser?.email || '').toLowerCase();
  const isAdmin = adminEmails.includes(email);
  const isColaborador = !isAdmin && email.endsWith('@hermidamaia.adv.br');
  const isCliente = !isAdmin && !isColaborador;

  useEffect(() => {
    fetch('/api/usuarios_ext')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (formData: any) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/usuarios_ext', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      } else {
        setMessage({ type: 'error', text: 'Erro ao atualizar perfil.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro de conexão.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold">Meu Perfil</h1>
          <p className="text-white/50 mt-1">
            {isAdmin && 'Administrador do Escritório'}
            {isColaborador && 'Colaborador do Escritório'}
            {isCliente && 'Cliente'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <ProfileHeader email={email} profile={profile} isAdmin={isAdmin} isColaborador={isColaborador} isCliente={isCliente} />
            <ProfileAccessCard profile={profile} isAdmin={isAdmin} isColaborador={isColaborador} />
          </div>
          <div className="md:col-span-2">
            <ProfileForm profile={profile} email={email} isCliente={isCliente} saving={saving} handleSave={handleSave} message={message} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;



