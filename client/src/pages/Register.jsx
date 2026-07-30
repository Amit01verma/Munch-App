import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import toast from "react-hot-toast";
function Register({ cart }) {
  useEffect(() => {
    document.title = "Register | Munch";
  }, []);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(res.data.message || "Registration successful!");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout cart={cart}>
      <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-12">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">

          {/* Left Side */}

          <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-orange-500 to-amber-500 text-white p-10">

            <h1 className="text-5xl font-bold mb-4">
              🍦 Munch
            </h1>

            <h2 className="text-3xl font-semibold mb-4">
              Join Munch Today!
            </h2>

            <p className="text-orange-100 leading-7">
              Create your account and enjoy delicious desserts,
              cakes, waffles and coffee delivered to your doorstep.
            </p>

            <div className="mt-10 text-7xl text-center">
              🍩
            </div>

          </div>

          {/* Right Side */}

          <div className="p-8 md:p-12">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Create Account
              </h2>

              <p className="mt-2 text-gray-500">
                Start your sweet journey with Munch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-orange-500">
                  <User size={18} className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-orange-500">
                  <Mail size={18} className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </div>
                            {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-orange-500">
                  <Lock size={18} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 transition hover:text-orange-500"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-orange-500">
                  <Lock size={18} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-orange-500 hover:text-orange-600"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-10 border-t pt-6 text-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Munch. Sweet moments start here ❤️
              </p>
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Register;