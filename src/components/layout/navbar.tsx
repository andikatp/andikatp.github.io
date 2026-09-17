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
      className="fixed top-0 left-0 right-0 z-40 flex flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-4 sm:py-6 pointer-events-none"
    >
      {/* Left side: Logo or Back icon */}
      <div className="pointer-events-auto">
        {isHome ? (
          <Magnetic strength={0.9}>
            <Link
              to="/"
              className="flex flex-row items-center space-x-3 sm:space-x-4 cursor-pointer"
            >
              <img
                src={meImg}
                alt="Andika's Profile"
                height={24}
                width={24}
                className="rounded-full object-cover shrink-0"
              />
              <h4 className="font-medium text-slate-900 select-none text-sm sm:text-base">
                andikatp.
              </h4>
            </Link>
          </Magnetic>
        ) : (
          <Magnetic strength={0.9}>
            <Link
              to="/"
              aria-label="Back to home"
              className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer select-none"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
          </Magnetic>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="pointer-events-auto flex flex-row items-center space-x-1 sm:space-x-2 md:space-x-4">
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
