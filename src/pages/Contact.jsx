import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import anime from 'animejs';
import { Mail, Twitter, Github, MessageCircle } from 'lucide-react';


export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState('');
  const sectionRef = useRef(null);
  const checkRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.sendForm(
      'service_o749xva',
      'template_sxvl5sq',
      form.current,
      '7JPyHXEPl_EMtFZyY'
    ).then(() => {
      setStatus('✅ Message sent successfully!');
      form.current.reset();

      anime({
        targets: checkRef.current,
        scale: [0, 1.5, 1],
        opacity: [0, 1, 0],
        duration: 1500,
        easing: 'easeOutElastic(1, .6)',
      });
    }, (error) => {
      console.error(error.text);
      setStatus('❌ Failed to send message');
    });
  };

  useEffect(() => {
    if (sectionRef.current) {
      anime({
        targets: sectionRef.current.querySelectorAll('.fade-up'),
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: anime.stagger(100)
      });
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-2xl mx-auto px-6 py-12 space-y-8 rounded-xl bg-white/40 dark:bg-black/30 backdrop-blur-md shadow-2xl"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1523958203904-cdcb402031fd?auto=format&fit=crop&w=1280&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* 💫 Rubrik */}
      <h1 className="text-center text-5xl font-bold tracking-tight text-white drop-shadow-xl fade-up">
        📬 Contact Us
      </h1>


      {/* 📨 Formulär */}
      <form ref={form} onSubmit={sendEmail} className="space-y-4 fade-up">
        <div>
          <label htmlFor="name" className="block font-medium mb-1 text-white">Name</label>
          <input
            type="text"
            name="user_name"
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white bg-white/70"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1 text-white">Email</label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white bg-white/70"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium mb-1 text-white">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            className="w-full px-3 py-2 border rounded resize-none dark:bg-gray-800 dark:text-white bg-white/70"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>

        {/* ✅ Checkmark */}
        <div className="flex justify-center pt-4">
          <div
            ref={checkRef}
            className="text-4xl opacity-0 pointer-events-none select-none"
          >
            ✅
          </div>
        </div>

        {/* 📢 Status */}
        {status && (
          <p className="text-center text-white font-semibold animate-pulse-fast mt-2">
            {status}
          </p>
        )}
      </form>

      {/* 🌐 Extra kontaktvägar - nu UNDER formuläret */}
      <div className="fade-up flex justify-center flex-wrap gap-6 pt-4 text-lg font-medium text-white/90">
        <a href="mailto:you@example.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-300 transition">
          <Mail size={20} /> <span>Email</span>
        </a>
        <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-300 transition">
          <Twitter size={20} /> <span>Twitter</span>
        </a>
        <a href="https://github.com/yourrepo" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-300 transition">
          <Github size={20} /> <span>GitHub</span>
        </a>
        <a href="https://discord.gg/yourserver" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-300 transition">
          <MessageCircle size={20} /> <span>Discord</span>
        </a>
      </div>

    </div>
  );
}
