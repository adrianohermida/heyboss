import React from 'react';
import { Mic, Youtube } from 'lucide-react';

const PodcastSection: React.FC = () => (
  <section className="py-16 bg-brand-secondary">
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-brand-elevated rounded-2xl p-6 md:p-10 border border-white/10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
              <Mic size={16} className="text-brand-accent" />
              <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">Conteúdo Educativo</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">Hermida Maia <span className="text-brand-primary">Podcast</span></h2>
            <p className="text-white/60 text-xs md:text-base leading-relaxed">Discussões sobre direitos do consumidor, estratégias contra juros abusivos e educação financeira com o Dr. Adriano e convidados.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={()=>window.open('https://youtube.com/@hermidamaia','_blank')} className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all text-xs md:text-sm">
                <Youtube size={16} />
                YouTube
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all text-xs md:text-sm">
                <Mic size={16} />
                Spotify
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-brand-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden />
            <div className="relative aspect-square max-w-xs mx-auto bg-brand-dark rounded-2xl border border-white/10 p-2 shadow-xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69457177ae7e61f63fb38329/3b78c0579__TLM961311.jpg" 
                alt="Podcast Hermida Maia" 
                className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <Mic size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PodcastSection;
