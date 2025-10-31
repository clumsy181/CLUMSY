import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const fullSubtitle = "Đừng để nhạc hay... thiếu visual chất";
  const [subtitle, setSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // A slight delay before starting to type
    const startTypingTimeout = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullSubtitle.length) {
          setSubtitle(fullSubtitle.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          // Optional: make the cursor stop blinking after typing
          // setTimeout(() => setShowCursor(false), 2000); 
        }
      }, 50); // Adjust typing speed here (in milliseconds)
    
      return () => clearInterval(typingInterval);
    }, 500); // Delay before typing starts
    
    return () => clearTimeout(startTypingTimeout);
  }, []);

  return (
    <section id="hero" className="text-center">
      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wider text-red-500 neon-text-red whitespace-nowrap">
        CHUYÊN CUNG CẤP VISUAL ĐI CẢNH
      </h1>
      {/* Subtitle with typing animation */}
      <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-['Roboto_Mono'] h-8 md:h-auto"> {/* Fixed height on mobile to prevent layout shift */}
        {subtitle}
        {showCursor && <span className="typing-cursor">_</span>}
      </p>
    </section>
  );
};

export default Hero;