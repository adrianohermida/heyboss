
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import AboutHero from '../components/About/AboutHero';
import ProfileSection from '../components/About/ProfileSection';
import Timeline from '../components/About/Timeline';
import MissionVisionValues from '../components/About/MissionVisionValues';
import StatsSection from '../components/About/StatsSection';
import PodcastSection from '../components/About/PodcastSection';
import WorksSection from '../components/About/WorksSection';
import AboutFinalCTA from '../components/About/AboutFinalCTA';
import { useTheme } from '../../styles/ThemeProvider';

const AboutPage2: React.FC = () => {
  const { mode } = useTheme();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sobre o Escritório | Hermida Maia Advocacia';
    setTimeout(() => setLoading(false), 600); // Simula carregamento
  }, []);

  if (loading) {
    return (
      <div
        className={
          `min-h-screen flex items-center justify-center ` +
          (mode === 'clear'
            ? 'bg-white text-gray-900'
            : 'bg-brand-dark text-white')
        }
      >
        <div className="animate-pulse w-16 h-16 rounded-full bg-brand-primary/30" aria-label="Carregando..." />
      </div>
    );
  }

  return (
    <>
      <div
        className={
          `min-h-screen selection:bg-brand-primary selection:text-white ` +
          (mode === 'clear'
            ? 'bg-white text-gray-900'
            : 'bg-brand-dark text-white')
        }
      >
        <Header />
        <main>
          <AboutHero />
          <ProfileSection />
          <Timeline />
          <MissionVisionValues />
          <StatsSection />
          <PodcastSection />
          <WorksSection />
          <AboutFinalCTA />
        </main>
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default AboutPage2;
