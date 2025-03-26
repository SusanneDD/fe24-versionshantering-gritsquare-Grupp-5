export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">

      {/* 📷 Banner */}
      <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg mb-10">
        <img
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1500&q=80"
          alt="About Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-xl text-center px-4">
            📌 About This Project
          </h1>
        </div>
      </div>

      {/* Introduktion */}
      <p className="text-lg text-gray-800 dark:text-white leading-relaxed fade-up">
        <strong>Public MessageBoard</strong> is a simple and expressive space where anyone can share thoughts, kindness, or ideas – instantly and anonymously. Whether you're reaching out to the world or just leaving behind a bit of inspiration, this board is here for you.
      </p>

      {/* Varför */}
      <section className="fade-up">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
          💡 Why I Built This
        </h2>
        <p className="text-gray-700 dark:text-white/80 leading-relaxed">
          I wanted to create something open, human, and frictionless – a public wall that doesn't require logins, accounts, or usernames. Just pure connection. It's a digital note space where anyone is free to express something meaningful or just say hi. ✨
        </p>
      </section>

      {/* Features */}
      <section className="fade-up">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
          🚀 Core Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-white/90">
          <li>Post messages with zero login – completely anonymous</li>
          <li>Instant message display via Firebase realtime updates</li>
          <li>Reply to others to build conversation threads</li>
          <li>Like messages ❤️ and show support</li>
          <li>Dark mode ready 🌙</li>
          <li>Mobile friendly and responsive design</li>
        </ul>
      </section>

      {/* Tech stack */}
      <section className="fade-up">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
          🛠 Tech Stack
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-white/80">
          <li><strong>Frontend:</strong> React + Vite</li>
          <li><strong>Routing:</strong> React Router</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
          <li><strong>Backend:</strong> Firebase Realtime Database (REST API)</li>
          <li><strong>Enhancements:</strong> anime.js, emailJS, lucide-react</li>
        </ul>
      </section>
    </div>
  );
}
