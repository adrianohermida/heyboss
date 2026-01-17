// Manifesto: ContactPage2
// - Modular: ContactHero, ContactCards, ContactFormSection
// - Skeleton: loading states em cada módulo
// - Hooks: useState, custom handleSubmit
// - Router: react-router-dom
// - Mobile-first, acessível, tokenização CSS

export const contactPageManifest = {
  page: 'ContactPage2',
  modules: [
    'ContactHero',
    'ContactCards',
    'ContactFormSection',
  ],
  skeletons: {
    hero: 'loading hero',
    cards: 'loading cards',
    form: 'loading form',
  },
  hooks: ['useState', 'handleSubmit'],
  router: 'react-router-dom',
  style: 'mobile-first, acessível, tokenização CSS',
};
