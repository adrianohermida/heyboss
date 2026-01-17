
import React from 'react';
import Header from '../components/Header';
import ContactPage from './ContactPage';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function ContactPage2() {
  return (
    <>
      <Header />
      <div style={{ marginTop: 80 }}>
        <ContactPage />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
