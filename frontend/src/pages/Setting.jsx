import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import {
    MdDelete,
    MdLogout,
    MdPermContactCalendar,
    MdStarBorderPurple500
} from "react-icons/md";
import "../css/Setting.css";
import { Link } from "react-router-dom";
// components
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

export default function Setting() {
    return (
        <>
            <Nav />
            <div class="setting-box">
                <ThemeSwitcher />
                <Pro />
                <Format />
                <Contact />
                <Logout />
            </div>
            <Footer />
        </>
    );
}


const ThemeSwitcher = () => {
  // Initialize with null to detect if we've loaded from localStorage yet
  const [theme, setTheme] = useState(null);

  // Load theme from localStorage and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Don't render until we've loaded the theme
  if (theme === null) {
    return null;
  }

  return (
     <div>
     <span>Theme</span>
    <i 
      onClick={toggleTheme}
      className="theme-switcher"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </i>
     </div>
  );
};

const Format = () => {
    return (
        <div>
            <span>Delete all chats</span>
            <MdDelete size={20} />
        </div>
    );
};


const Logout = () => {
    return (
        <div>
            <span>Logout</span>
            <MdLogout size={20} />
        </div>
    );
};
const Contact = () => {
    return (
        <Link to="Contact">
            <div>
                <span>Contact</span>
                <MdPermContactCalendar size={20} />
            </div>
        </Link>
    );
};
const Pro = () => {
    return (
        <Link to="/plan">
            <div>
                <span>Primum pro</span>
                <MdStarBorderPurple500 size={20} />
            </div>
        </Link>
    );
};
