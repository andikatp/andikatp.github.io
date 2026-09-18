import { useOutlet } from "react-router-dom";
import Navbar from "./navbar";

export default function MainLayout() {
  const outlet = useOutlet();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col flex-1">{outlet}</main>
    </div>
  );
}
