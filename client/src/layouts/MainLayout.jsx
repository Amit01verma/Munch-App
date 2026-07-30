import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children, cart }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cart={cart} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;