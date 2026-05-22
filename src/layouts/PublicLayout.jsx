import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-grey-50)] text-[var(--color-grey-900)] transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
