import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
