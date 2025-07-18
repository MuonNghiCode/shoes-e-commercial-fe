import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Particles } from "@/components";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const form = location.state?.form?.pathname || "/";
  const handleSubmit = async (e: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    try {
      const user = await login({ email, password });
      toast.success("Đăng nhập thành công!");
      if (user?.isAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate(form, { replace: true });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <section
      className="w-screen h-[100dvh] flex overflow-hidden"
      style={{
        fontFamily: "Montserrat, serif",
        minWidth: "100vw",
        background:
          "linear-gradient(120deg, var(--sneako-beige) 0%, #fff 60%, var(--sneako-gold) 100%)",
      }}
    >
      <Particles />
      {/* Left: Image section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="hidden md:block w-1/2 h-full relative rounded-r-[120px] overflow-hidden shadow-2xl border-r-8 border-[color:var(--sneako-gold)]"
      >
        <img
          src="/welcome2.webp"
          alt="Luxury Sneaker"
          className="w-full h-full object-cover object-center brightness-95"
        />
        {/* Overlay phủ luxury: tối trên/dưới, sáng ở giữa */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-black/40 via-[rgba(255,255,255,0.10)] to-black/40" />
          <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(218,165,32,0.18)] to-transparent" />
        </div>
        {/* Overlay hiệu ứng sáng luxury */}
        {/* 4 đốm sáng trắng tập trung vào hình 4 đôi giày */}
        <div className="pointer-events-none">
          {/* Đốm 1: góc trên trái */}
          <div
            className="absolute left-[8%] top-[12%] w-36 h-36 bg-white opacity-60 blur-3xl rounded-full"
            style={{ filter: "blur(40px)" }}
          />
          {/* Đốm 2: góc trên phải */}
          <div
            className="absolute right-[10%] top-[16%] w-32 h-32 bg-white opacity-50 blur-3xl rounded-full"
            style={{ filter: "blur(36px)" }}
          />
          {/* Đốm 3: góc dưới trái */}
          <div
            className="absolute left-[12%] bottom-[14%] w-32 h-32 bg-white opacity-50 blur-3xl rounded-full"
            style={{ filter: "blur(36px)" }}
          />
          {/* Đốm 4: góc dưới phải */}
          <div
            className="absolute right-[8%] bottom-[12%] w-36 h-36 bg-white opacity-60 blur-3xl rounded-full"
            style={{ filter: "blur(40px)" }}
          />
        </div>
      </motion.div>
      {/* Right: Login form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex w-full md:w-1/2 h-full items-center justify-center bg-white/60 md:bg-transparent"
        style={{ position: "relative", zIndex: 2 }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[520px] flex flex-col justify-center items-center gap-10 px-8 py-12"
        >
          <motion.div
            className="w-full flex justify-start mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="/"
              className="flex items-center gap-2 text-base text-[color:var(--sneako-gold)] font-semibold hover:underline hover:text-[color:var(--sneako-dark)] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Về trang chủ
            </a>
          </motion.div>
          <motion.img
            src="/logo.webp"
            alt="Sneako Logo"
            className="w-24 h-24 mb-3"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.h2
            className="text-5xl font-black text-[color:var(--sneako-gold)] tracking-widest mb-2 uppercase"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Đăng nhập
          </motion.h2>
          <motion.div
            className="text-lg text-[color:var(--sneako-dark)] font-medium mb-4 text-center w-full max-w-[340px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Đăng nhập để trải nghiệm thế giới sneaker luxury.
          </motion.div>
          <motion.div
            className="w-full flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {/* Floating label for email */}
            <div className="relative">
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`peer w-full px-7 py-5 border-2 border-[color:var(--sneako-gold)]/70 rounded-2xl focus:outline-none bg-white/80 text-[color:var(--sneako-dark)] text-lg shadow-lg transition placeholder-transparent font-semibold`}
                placeholder="Email"
                required
                autoFocus
              />
              <label
                htmlFor="login-email"
                className={`absolute left-7 text-lg font-light text-[color:var(--sneako-beige)] pointer-events-none transition-all duration-200
                  ${
                    email
                      ? "-top-4 text-sm text-[color:var(--sneako-gold)]"
                      : "top-1/2 -translate-y-1/2"
                  }
                  peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[color:var(--sneako-gold)]`}
              >
                Email
              </label>
            </div>
            {/* Floating label for password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`peer w-full px-7 py-5 border-2 border-[color:var(--sneako-gold)]/70 rounded-2xl focus:outline-none bg-white/80 text-[color:var(--sneako-dark)] text-lg shadow-lg transition placeholder-transparent font-semibold pr-14`}
                placeholder="Mật khẩu"
                required
                autoComplete="current-password"
              />
              <label
                htmlFor="login-password"
                className={`absolute left-7 text-lg font-light text-[color:var(--sneako-beige)] pointer-events-none transition-all duration-200
                  ${
                    password
                      ? "-top-4 text-sm text-[color:var(--sneako-gold)]"
                      : "top-1/2 -translate-y-1/2"
                  }
                  peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[color:var(--sneako-gold)]`}
              >
                Mật khẩu
              </label>
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-[color:var(--sneako-gold)] focus:outline-none bg-transparent"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </motion.div>
          <motion.div
            className="w-full flex justify-end mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <a
              href="/forgot-password"
              className="text-base text-[color:var(--sneako-gold)] hover:underline font-medium transition"
            >
              Quên mật khẩu?
            </a>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full py-5 rounded-2xl bg-[color:var(--sneako-gold)] text-white font-bold text-xl shadow-xl hover:bg-[color:var(--sneako-dark)] hover:text-[color:var(--sneako-gold)] hover:scale-[1.04] hover:shadow-[0_4px_24px_rgba(218,165,32,0.18)] transition-all duration-200 disabled:opacity-60"
            disabled={isLoading}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.15 }}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </motion.button>
          <motion.div
            className="text-center text-lg text-[color:var(--sneako-beige)] mt-2 font-medium w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            Bạn chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-[color:var(--sneako-gold)] hover:underline"
            >
              Đăng ký ngay
            </a>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
