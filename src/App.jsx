import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition duration-300">
        <header className="p-4 shadow-md bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/">📬 Public MessageBoard</Link>
          </h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <button
              className="ml-4 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light" : "🌙 Night"}
            </button>
          </nav>
        </header>

        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="p-4 text-center text-sm bg-gray-100 dark:bg-gray-800">
          &copy; {new Date().getFullYear()} Public MessageBoard
        </footer>
      </div>
    </Router>
  );
}
