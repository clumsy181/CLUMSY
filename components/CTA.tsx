import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="contact" className="text-center flex flex-col items-center justify-center space-y-6 py-12">
      {/* Creator Name */}
      <p className="text-sm font-light text-gray-400 tracking-widest">
        A PROJECT BY CLUMSY
      </p>

      {/* Section Title */}
      <h2 className="text-5xl md:text-6xl font-black text-white">
        Liên Hệ Chốt Đơn Ngay!
      </h2>

      {/* Zalo Number */}
      <a
        href="https://zalo.me/0366131201"
        target="_blank"
        rel="noopener noreferrer"
        className="text-5xl md:text-6xl font-black text-green-400 neon-text tracking-wider transition-all duration-300 hover:brightness-125"
      >
        Zalo: 0366131201
      </a>
    </section>
  );
};

export default CTA;