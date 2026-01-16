
import React from 'react';
import Header from '../components/Header';
import ContactPage from './ContactPage';

// Wrapper para ContactPage2 para roteamento alternativo
export default function ContactPage2() {
  return (
    <>
      <Header />
      <div style={{ marginTop: 80 }}>
        <ContactPage />
      </div>
    </>
  );
}
