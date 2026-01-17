/**
 * @description Componente de cabeçalho global para o site Hermida Maia Advocacia.
 *             Gerencia a navegação principal e o estado de autenticação do usuário.
 *             Implementa um menu dropdown no avatar do usuário com rotas dinâmicas.
 *             Utiliza useAuth do @hey-boss/users-service/react para controle de sessão.
 *             Ajustado para exibir "Monte Seu Plano" apenas no desktop.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../styles/ThemeProvider';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Briefcase, ChevronDown, LayoutDashboard, Menu, X, Shield, Settings } from 'lucide-react';
import { useAuth } from '@hey-boss/users-service/react';

// Componente de logo adaptável
export function LogoHM({ size = 48, rounded = true, bg = 'var(--color-brand)' }: { size?: number, rounded?: boolean, bg?: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: bg,
        borderRadius: rounded ? 16 : 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src="https://heyboss.heeyo.ai/user-assets/logo_lzI6JHzO.png"
        alt="Logo HM Advocacia"
        style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: rounded ? 12 : 0 }}
      />
    </div>
  );
}

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Verifica se o usuário é admin (membro da equipe) - Insensível a maiúsculas
  const adminEmails = ["contato@hermidamaia.adv.br", "adrianohermida@gmail.com", "admin@example.com"];
  const userEmail = (user?.email || "").toLowerCase();
  const isAdmin = user && (
    (user as any).isAdmin === true || 
    adminEmails.some(email => email.toLowerCase() === userEmail)
  );

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { mode, setMode } = useTheme();

  const headerBg = mode === 'clear' ? 'bg-white border-b border-gray-200' : 'bg-brand-dark border-b border-white/10';
  const textMain = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const textSub = mode === 'clear' ? 'text-brand-primary' : 'text-brand-primary';
  return (
    <header className={`fixed top-0 w-full z-50 ${headerBg}`} style={{boxShadow: mode === 'clear' ? '0 1px 0 0 #e5e7eb' : undefined}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4">
            <LogoHM size={48} rounded={true} bg={'var(--color-brand)'} />
            <div className="flex flex-col ml-2">
              <span className={`font-extrabold text-lg leading-tight ${textMain}`}>Dr. Adriano Hermida Maia</span>
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Defesa do Superendividado</span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-white/80 hover:text-brand-primary transition-colors text-sm font-medium">Início</Link>
            <Link to="/about2" className="text-white/80 hover:text-brand-primary transition-colors text-sm font-medium">Sobre</Link>
            <a href="/#serviços" className="text-white/80 hover:text-brand-primary transition-colors text-sm font-medium">Serviços</a>
            <Link to="/blog" className="text-white/80 hover:text-brand-primary transition-colors text-sm font-medium">Blog</Link>
            <Link to="/contact2" className="text-white/80 hover:text-brand-primary transition-colors text-sm font-medium">Contato</Link>
            
            {user ? (
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-2 pr-4 py-1.5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs">
                    {user.name?.[0] || user.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-white/80 text-sm font-medium hidden xl:inline">{user.name || user.email.split('@')[0]}</span>
                  <ChevronDown size={16} className={`text-white/40 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-brand-elevated border border-white/10 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                      <p className="text-white font-bold text-sm truncate">{user.name || 'Usuário'}</p>
                      <p className="text-white/40 text-xs truncate">{user.email}</p>
                    </div>
                    
                    {isAdmin && (
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-brand-primary font-bold hover:bg-brand-primary/10 transition-all border-b border-white/5"
                      >
                        <Shield size={18} />
                        Painel Administrativo
                      </Link>
                    )}
                    
                    <Link 
                      to="/perfil" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-brand-primary hover:bg-white/5 transition-all"
                    >
                      <User size={16} />
                      Meu Perfil
                    </Link>

                    <Link 
                      to="/account" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-brand-primary hover:bg-white/5 transition-all"
                    >
                      <LayoutDashboard size={18} />
                      Meu Painel (Cliente)
                    </Link>

                    <div className="h-px bg-white/5 my-2" />
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
                    >
                      <LogOut size={18} />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2"
              >
                <User size={16} />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {user && (
              <Link to={isAdmin ? "/dashboard" : "/portal"} className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs">
                {user.name?.[0] || user.email?.[0].toUpperCase()}
              </Link>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-brand-dark/95 backdrop-blur-xl z-40 animate-in slide-in-from-top duration-300 border-t border-white/5">
          <nav className="flex flex-col p-6 gap-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-bold border-b border-white/5 pb-4">Início</Link>
            <Link to="/about2" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-bold border-b border-white/5 pb-4">Sobre</Link>
            <a href="/#serviços" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-bold border-b border-white/5 pb-4">Serviços</a>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-bold border-b border-white/5 pb-4">Blog</Link>
            <Link to="/contact2" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-bold border-b border-white/5 pb-4">Contato</Link>
            
            {!user && (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-primary text-white text-center py-4 rounded-xl font-bold text-lg mt-4">
                Fazer Login
              </Link>
            )}
            
            {user && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">
                    {user.name?.[0] || user.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{user.name || user.email.split('@')[0]}</p>
                    <p className="text-white/40 text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {isAdmin && (
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-brand-primary/20 text-brand-primary font-bold"
                    >
                      <LayoutDashboard size={20} />
                      Meu Escritório (Admin)
                    </Link>
                  )}
                  <Link 
                    to="/account" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-white/70"
                  >
                    <LayoutDashboard size={20} />
                    Meu Painel (Cliente)
                  </Link>
                  <Link 
                    to="/perfil" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-white/70"
                  >
                    <User size={20} />
                    Meu Perfil
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

