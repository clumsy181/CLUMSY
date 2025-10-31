import React from 'react';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import ProductCatalog from './components/ProductCatalog';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 font-['Inter']">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-24 py-12 md:py-20">
          <CTA />
          <Hero />
          <Pricing />
          <ProductCatalog />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;