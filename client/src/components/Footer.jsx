import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-4xl font-extrabold text-orange-500">Munch</h2>

            <p className="mt-5 leading-7 text-gray-400">
              Discover handcrafted desserts made with premium ingredients.
              Freshly prepared and delivered with love to make every bite
              unforgettable.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/Amit01verma"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gray-800 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/amit-kumar-657434249/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gray-800 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gray-800 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Contact</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-orange-500" />
                <span>Bangalore, Karnataka, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-500" />
                <span>+91 7463034012</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-orange-500" />
                <span>amitkr15104@gmail.com</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Why Munch?</h3>

            <ul className="space-y-4 text-gray-400">
              <li>🍰 Freshly Prepared Desserts</li>
              <li>⚡ Fast & Reliable Delivery</li>
              <li>⭐ Premium Quality Ingredients</li>
              <li>💳 Secure Online Payments</li>
              <li>❤️ Thousands of Happy Customers</li>
            </ul>
          </div>
        </div>

        <div className="my-10 border-t border-gray-800"></div>

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">Munch</span>. All Rights
            Reserved.
          </p>

          <p className="flex items-center gap-2">
            Designed & Developed with
            <FaHeart className="text-red-500" />
            by
            <span className="font-semibold text-white">Amit Kumar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
