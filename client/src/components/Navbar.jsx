import { Link, NavLink, useNavigate } from "react-router-dom";import {
  ShoppingCart,
  Package,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Container from "./common/Container";
import SearchBar from "./SearchBar";

function Navbar({ cart }) {
  const navigate = useNavigate();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-orange-500 transition-transform duration-300 hover:scale-105"
          >
            🍦 Munch
          </Link>

  {/* Navigation */}
<div className="ml-25 flex items-center gap-8">

  <NavLink
    to="/"
    className={({ isActive }) =>
      `transition ${
        isActive
          ? "font-semibold text-orange-500"
          : "font-medium text-gray-700 hover:text-orange-500"
      }`
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/menu"
    className={({ isActive }) =>
      `transition ${
        isActive
          ? "font-semibold text-orange-500"
          : "font-medium text-gray-700 hover:text-orange-500"
      }`
    }
  >
    Menu
  </NavLink>

</div>

          {/* Search */}
          <div className="ml-10 hidden lg:block">
            <SearchBar />
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-8">

            <Link
              to="/cart"
              className="group relative flex items-center gap-2 font-medium text-gray-700 transition hover:text-orange-500"
            >
              <ShoppingCart className="h-5 w-5 transition group-hover:scale-110" />

              <span>Cart</span>

              {totalItems > 0 && (
                <span className="absolute -right-5 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
                        {!isLoggedIn ? (
              <Link
                to="/login"
                className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600"
              >
                Login
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold text-white shadow transition hover:bg-orange-600"
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                    <div className="border-b p-4">
                      <p className="font-semibold text-gray-900">
                        {user?.name || "User"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/orders"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-100"
                    >
                      <Package size={18} />
                      My Orders
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}
              </div>
            )}

          </div>

        </nav>
      </Container>
    </header>
  );
}

export default Navbar;