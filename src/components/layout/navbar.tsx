import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import meImg from "../../assets/me.webp";
import { usePageTransition } from "../../context";
import { Magnetic } from "../ui/magnetic";

function Navbar() {
  const location = useLocation();
  const { navigateWithTransition, isAnimating } = usePageTransition();

  const isHome = location.pathname === "/" || location.pathname === "/about";

  const menus = [
    { label: "About", path: "/about" },
    { label: "Works", path: "/works" },
    { label: "Contact", path: "/contact" },
  ];
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isAnimating) return;
    navigateWithTransition(path);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-50 top-0 left-0 right-0 flex flex-row items-center justify-between px-16 py-6"
    >
      {/* Left side: Logo or Back icon */}
      <div className="pointer-events-auto">
        {isHome ? (
          <Magnetic strength={0.9}>
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className={`flex flex-row items-center space-x-3 sm:space-x-4 ${
                isAnimating
                  ? "cursor-default pointer-events-none"
                  : "cursor-pointer"
              }`}
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
            </a>
          </Magnetic>
        ) : (
          <Magnetic strength={0.9}>
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              aria-label="Back to home"
              className={`flex items-center justify-center text-white transition-all bg-black rounded-full shadow-md select-none w-12 h-12 ${
                isAnimating
                  ? "cursor-default pointer-events-none"
                  : "cursor-pointer hover:scale-105 active:scale-95"
              }`}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </a>
          </Magnetic>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-row items-center space-x-1 pointer-events-auto sm:space-x-2 md:space-x-4">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Magnetic key={menu.label} strength={0.35}>
              <a
                href={menu.path}
                onClick={(e) => handleNavClick(e, menu.path)}
                className={`font-medium text-xs sm:text-sm md:text-base rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ease-in-out select-none block ${
                  isAnimating
                    ? "cursor-default pointer-events-none"
                    : "cursor-pointer"
                } ${
                  isActive ? "text-black" : "text-slate-600 hover:text-black"
                }`}
              >
                {menu.label}
              </a>
            </Magnetic>
          );
        })}
      </nav>
    </motion.header>
  );
}

export default Navbar;
