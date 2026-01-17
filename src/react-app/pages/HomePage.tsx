

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Home/Hero';
import Stats from '../components/Home/Stats';
import Calculator from '../components/Home/Calculator';
import HowItWorks from '../components/Home/HowItWorks';
import Testimonials from '../components/Home/Testimonials';
import Services from '../components/Home/Services';
import VideoJourney from '../components/Home/VideoJourney';
import Blog from '../components/Home/Blog';
import FinalCTA from '../components/Home/FinalCTA';

const HomePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-brand-dark selection:bg-brand-primary selection:text-white">
        <Header />
        <main>
          <Hero />
          <Stats />
          <Calculator />
          <HowItWorks />
          <VideoJourney />
          <Testimonials />
          <Services />
          <Blog />
          <FinalCTA />
        </main>
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default HomePage;
