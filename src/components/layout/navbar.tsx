import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import meImg from "../../assets/me.webp";
import { Magnetic } from "../ui/magnetic";

function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "/about";

  const menus = isHome
    ? [
        { label: "About", path: "/about" },
        { label: "Works", path: "/works" },
        { label: "Contact", path: "/contact" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Works", path: "/works" },
        { label: "Contact", path: "/contact" },
      ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="top-0 left-0 right-0 flex flex-row items-center justify-between px-16 py-6 "
    >
      {/* Left side: Logo or Back icon */}
      <div className="pointer-events-auto">
        {isHome ? (
          <Magnetic strength={0.9}>
            <Link
              to="/"
              className="flex flex-row items-center space-x-3 cursor-pointer sm:space-x-4"
            >
              <img
                src={meImg}
                alt="Andika's Profile"
                height={24}
                width={24}
                className="object-cover rounded-full shrink-0"
              />
              <h4 className="text-sm font-medium select-none text-slate-900 sm:text-base">
                andikatp.
              </h4>
            </Link>
          </Magnetic>
        ) : (
          <Magnetic strength={0.9}>
            <Link
              to="/"
              aria-label="Back to home"
              className="flex items-center justify-center text-white transition-all bg-black rounded-full shadow-md cursor-pointer select-none w-12 h-12 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
          </Magnetic>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-row items-center space-x-1 pointer-events-auto sm:space-x-2 md:space-x-4">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Magnetic key={menu.label} strength={0.35}>
              <Link
                to={menu.path}
                className={`font-medium text-xs sm:text-sm md:text-base rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ease-in-out select-none cursor-pointer block ${
                  isActive
                    ? "bg-black text-white"
                    : "text-slate-900 hover:text-white hover:bg-black"
                }`}
              >
                {menu.label}
              </Link>
            </Magnetic>
          );
        })}
      </nav>
    </motion.header>
  );
}

export default Navbar;
