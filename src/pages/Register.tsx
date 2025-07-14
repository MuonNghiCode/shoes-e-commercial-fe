import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    // Demo: chỉ chuyển hướng về login, không đăng ký thật
    navigate("/login");
  };

  return (
    <div
      className="w-screen h-screen flex"
      style={{
        fontFamily: "Montserrat, serif",
        minWidth: "100vw",
        background:
          "linear-gradient(120deg, var(--sneako-beige) 0%, #fff 60%, var(--sneako-gold) 100%)",
      }}
    >
      {/* Left: Register form */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex w-full md:w-1/2 h-full items-center justify-center bg-white/60 md:bg-transparent"
        style={{ position: "relative", zIndex: 2 }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[520px] flex flex-col justify-center items-center gap-10 px-8 py-12"
        >
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
            Đăng ký
          </motion.h2>
          <motion.div
            className="text-lg text-[color:var(--sneako-dark)] font-medium mb-4 text-center w-full max-w-[340px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Tạo tài khoản để trải nghiệm thế giới sneaker luxury.
          </motion.div>
          {error && (
            <motion.div
              className="text-red-500 text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </motion.div>
          )}
          <motion.div
            className="w-full flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {/* Floating label for username */}
            <div className="relative">
              <input
                type="text"
                id="register-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`peer w-full px-7 py-5 border-2 border-[color:var(--sneako-gold)]/70 rounded-2xl focus:outline-none bg-white/80 text-[color:var(--sneako-dark)] text-lg shadow-lg transition placeholder-transparent font-semibold`}
                placeholder="Tên đăng nhập"
                required
                autoFocus
              />
              <label
                htmlFor="register-username"
                className={`absolute left-7 top-1/2 -translate-y-1/2 text-lg font-light text-[color:var(--sneako-beige)] pointer-events-none transition-all duration-200
                  peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[color:var(--sneako-gold)]
                  ${
                    username
                      ? "-top-4 text-sm text-[color:var(--sneako-gold)]"
                      : ""
                  }`}
              >
                Tên đăng nhập
              </label>
            </div>
            {/* Floating label for password */}
            <div className="relative">
              <input
                type="password"
                id="register-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`peer w-full px-7 py-5 border-2 border-[color:var(--sneako-gold)]/70 rounded-2xl focus:outline-none bg-white/80 text-[color:var(--sneako-dark)] text-lg shadow-lg transition placeholder-transparent font-semibold`}
                placeholder="Mật khẩu"
                required
              />
              <label
                htmlFor="register-password"
                className={`absolute left-7 top-1/2 -translate-y-1/2 text-lg font-light text-[color:var(--sneako-beige)] pointer-events-none transition-all duration-200
                  peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[color:var(--sneako-gold)]
                  ${
                    password
                      ? "-top-4 text-sm text-[color:var(--sneako-gold)]"
                      : ""
                  }`}
              >
                Mật khẩu
              </label>
            </div>
            {/* Floating label for confirm password */}
            <div className="relative">
              <input
                type="password"
                id="register-confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`peer w-full px-7 py-5 border-2 border-[color:var(--sneako-gold)]/70 rounded-2xl focus:outline-none bg-white/80 text-[color:var(--sneako-dark)] text-lg shadow-lg transition placeholder-transparent font-semibold`}
                placeholder="Nhập lại mật khẩu"
                required
              />
              <label
                htmlFor="register-confirm-password"
                className={`absolute left-7 top-1/2 -translate-y-1/2 text-lg font-light text-[color:var(--sneako-beige)] pointer-events-none transition-all duration-200
                  peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[color:var(--sneako-gold)]
                  ${
                    confirmPassword
                      ? "-top-4 text-sm text-[color:var(--sneako-gold)]"
                      : ""
                  }`}
              >
                Nhập lại mật khẩu
              </label>
            </div>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full py-5 rounded-2xl bg-[color:var(--sneako-gold)] text-white font-bold text-xl shadow-xl hover:bg-[color:var(--sneako-dark)] hover:text-[color:var(--sneako-gold)] hover:scale-[1.04] hover:shadow-[0_4px_24px_rgba(218,165,32,0.18)] transition-all duration-200 disabled:opacity-60"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.15 }}
          >
            Đăng ký
          </motion.button>
          <motion.div
            className="text-center text-lg text-[color:var(--sneako-beige)] mt-2 font-medium w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="text-[color:var(--sneako-gold)] hover:underline"
            >
              Đăng nhập ngay
            </a>
          </motion.div>
        </form>
      </motion.div>
      {/* Right: Image section luxury */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="hidden md:block w-1/2 h-full relative rounded-l-[120px] overflow-hidden shadow-2xl border-l-8 border-[color:var(--sneako-gold)]"
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
    </div>
  );
};

export default Register;
