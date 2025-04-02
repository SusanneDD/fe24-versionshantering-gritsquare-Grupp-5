import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import anime from "animejs";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [zeroGravity, setZeroGravity] = useState(false);
  const [antiGravity, setAntiGravity] = useState(false);
  const [animationInstance, setAnimationInstance] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleZeroGravity = () => {
    const elements = document.querySelectorAll(".message-box");


    if (!zeroGravity) {
      const anim = anime({
        targets: elements,
        translateY: () => anime.random(-400, 400),
        translateX: () => anime.random(-200, 200),
        rotate: () => anime.random(-20, 40),
        duration: 2000,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      });

      setAnimationInstance(anim);
    } else {
      anime({
        targets: elements,
        translateY: 0,
        translateX: 0,
        rotate: 0,
        duration: 250,
        easing: "easeOutQuad",
      });

      if (animationInstance) {
        animationInstance.pause();
        setAnimationInstance(null);
      }
    }

    setZeroGravity(!zeroGravity);
  };

  const toggleAntiGravity = () => {
    const elements = document.querySelectorAll(".message-box");

    if (!antiGravity) {
      anime({
        targets: elements,
        rotate: 180,
        duration: 400,
        easing: "easeOutQuad",
      });
    } else {
      anime({
        targets: elements,
        rotate: 0,
        duration: 400,
        easing: "easeOutQuad",
      });
    }

    setAntiGravity(!antiGravity);
  };



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
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
              onClick={toggleAntiGravity}
            >
              {antiGravity ? "😊 Normal Gravity" : "🙃 Anti-Gravity"}
            </button>

                        
            <button
              className="px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
              onClick={toggleZeroGravity}
            >
            {zeroGravity ? "🌎 Activate Gravity" : "🚀 Zero Gravity"}
            </button>

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
