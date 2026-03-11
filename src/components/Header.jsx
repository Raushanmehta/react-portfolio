import { Suspense, useState } from 'react';
import { ModeToggle } from '../components/mode-toggle';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-36">
        {/* Left logo */}
        <div className="text-3xl font-extrabold transition duration-300">
          <Link to={"/"} className="bg-dark">
            Raushan<sup className="text-slate-400 font-medium">®</sup>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="flex-1 hidden md:flex text-lg justify-center space-x-6 md:space-x-8 font-semibold">
          <Link to={"/"} className="text-gray-500 dark:text-white hover:text-[#228BE6] transition duration-300">Home</Link>
          <Link to={"/about"} className="text-gray-500 dark:text-white hover:text-[#228BE6] transition duration-300">About</Link>
          <Link to={"/project"} className="text-gray-500 dark:text-white hover:text-[#228BE6] transition duration-300">Projects</Link>
          <Link to={"/service"} className="text-gray-500 dark:text-white hover:text-[#228BE6] transition duration-300">Service</Link>
          <Link to={"/contact"} className="text-gray-500 dark:text-white hover:text-[#228BE6] transition duration-300">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to={"/contact"}>
            <button className="hidden md:inline-block bg-gradient-to-r from-[#228BE6] to-cyan-300 text-white font-semibold
             hover:bg-black p-2 px-8 text-md rounded-lg transition duration-300">
              Hire
            </button>
          </Link>
          <button className="hidden md:inline-block border-none ">
            <ModeToggle />
          </button>

          <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white hover:text-[#228BE6] transition duration-300">
            {darkMode ? (
              <Suspense size={30} />
            ) : (
              <Suspense size={30} />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 dark:text-white">
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible on small screens) */}
      <div
        className={`fixed top-0 left-0 w-80 text-xl font-semibold h-full bg-gray-800 dark:bg-gray-900 text-white shadow-lg transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeMenu} className="text-white">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col space-y-6 p-4">
          <Link to={"/"} className="text-gray-200 hover:text-[#228BE6] transition duration-300" onClick={closeMenu}>Home</Link>
          <Link to={"/about"} className="text-gray-200 hover:text-[#228BE6] transition duration-300" onClick={closeMenu}>About</Link>
          <Link to={"/project"} className="text-gray-200 hover:text-[#228BE6] transition duration-300" onClick={closeMenu}>Projects</Link>
          <Link to={"/contact"} className="text-gray-200 hover:text-[#228BE6] transition duration-300" onClick={closeMenu}>Contact</Link>
        </div>
      </div>

      {/* Mobile Overlay (Clicking outside the menu will close it) */}
      {isMenuOpen && (
        <div onClick={closeMenu} className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>
      )}
    </header>
  );
};

export default Header;
