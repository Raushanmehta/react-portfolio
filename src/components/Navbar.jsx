import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };


  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 -translate-y-[80%] dark:hidden">
        <img src="./assets/header-bg-color.png" alt="" className="w-full" />
      </div>

      <header className="fixed top-0 w-full z-50 ">
        <motion.nav 
        initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }} className="px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between">

          <Link to="/"
            className="text-3xl font-extrabold dark:text-white">
            Raushan<sup className="text-blue-500 font-medium">®</sup>
          </Link>

          <ul className="hidden md:flex gap-8 px-12 py-4 rounded-full
            bg-white/60 shadow-md font-Ovo backdrop-blur-md
            dark:bg-transparent dark:border dark:border-white/30 dark:text-white">

            {["Home", "About", "Project", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  className="hover:text-pink-500 dark:hover:text-pink-500 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>


          <div className="flex items-center gap-4 ">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 "
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/contact"
              className="hidden lg:flex items-center gap-2 px-6 py-2 border rounded-full
              dark:border-pink-500 dark:text-white hover:bg-pink-500
            dark:hover:bg-pink-500"
            >
              Contact <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2"
              aria-label="Open menu"
            >
              <Menu size={26} className="dark:text-white" />
            </button>
          </div>
        </motion.nav>
      </header>

      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 z-50 transition-transform 
            duration-300
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        bg-rose-50 dark:bg-darkHover dark:text-white md:hidden`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 dark:text-black"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <ul className="flex flex-col gap-6 px-10 py-24 text-lg font-medium dark:text-black">
          {["Home", "About", "Project", "Contact"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={closeMenu}
                className="hover:text-blue-500 transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
