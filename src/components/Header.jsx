import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Header() {
  const titleRef = useRef(null);

  useEffect(() => {
    anime({
      targets: titleRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1200,
      easing: 'easeOutExpo',
    });

    anime({
      targets: '.glow-text span',
      color: ['#3b82f6', '#9333ea', '#10b981'],
      duration: 6000,
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate',
      delay: anime.stagger(70),
    });
  }, []);

  return (
    <div className="relative text-center py-12 overflow-hidden fade-in">
      {/* 🔮 Glow bakgrund */}
      <div className="absolute inset-0 z-0 blur-3xl opacity-30 bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 animate-pulse-slow rounded-full w-[150%] h-[120%] -top-1/2 left-[-25%]"></div>

      {/* ✨ Själva rubriken */}
      <h1
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold glow-text relative z-10"
      >
        {Array.from('📬 Public Message Board').map((char, index) => (
          <span key={index} className="inline-block transition duration-300">
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
