import { motion } from "framer-motion";
import Particles from "../Particles";

const IntroduceSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-0 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-24">
        <Particles />
        {/* Hình ảnh minh họa */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-end w-[440px] h-[600px] gap-6">
            {/* Dải 1 */}
            <motion.div
              className="flex-1 h-[420px] self-end rounded-3xl overflow-hidden shadow-xl border-2 border-[color:var(--sneako-gold)]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <img
                src="/intro.webp"
                alt="Sneako Bento 1"
                className="w-full h-[600px] object-cover object-left -translate-y-43"
              />
            </motion.div>
            {/* Dải 2 */}
            <motion.div
              className="flex-1 h-[500px] self-center rounded-3xl overflow-hidden shadow-xl border-2 border-[color:var(--sneako-gold)]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <img
                src="/intro.webp"
                alt="Sneako Bento 2"
                className="w-full h-[600px] object-cover object-center -translate-y-12"
              />
            </motion.div>
            {/* Dải 3 */}
            <motion.div
              className="flex-1 h-[420px] self-start rounded-3xl overflow-hidden shadow-xl border-2 border-[color:var(--sneako-gold)]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.46, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <img
                src="/intro.webp"
                alt="Sneako Bento 3"
                className="w-full h-[600px] object-cover object-right "
              />
            </motion.div>
          </div>
        </div>
        {/* Nội dung giới thiệu */}
        <motion.div
          className="flex-1 flex flex-col gap-5"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[color:var(--sneako-gold)] mb-2 tracking-wide">
            Giới thiệu về Sneako
          </h2>
          <p className="text-lg md:text-xl text-[color:var(--sneako-dark)] opacity-90 font-medium">
            Sneako là điểm đến lý tưởng cho những ai đam mê thời trang và giày
            sneaker cao cấp. Chúng tôi tự hào mang đến những sản phẩm chính
            hãng, chất lượng vượt trội cùng dịch vụ khách hàng tận tâm.
          </p>
          <ul className="list-disc pl-6 text-base md:text-lg text-[color:var(--sneako-dark)] opacity-80 space-y-1">
            <li>100% sản phẩm chính hãng, nhập khẩu trực tiếp</li>
            <li>Đội ngũ tư vấn chuyên nghiệp, am hiểu sneaker</li>
            <li>Chính sách đổi trả linh hoạt, bảo hành uy tín</li>
            <li>Không gian mua sắm hiện đại, trải nghiệm đẳng cấp</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-4">
            <span className="inline-block bg-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] font-bold px-5 py-2 rounded-xl shadow text-base md:text-lg">
              #SneakoLuxury
            </span>
            <span className="inline-block bg-[color:var(--sneako-dark)] text-[color:var(--sneako-gold)] font-bold px-5 py-2 rounded-xl shadow text-base md:text-lg">
              #SneakerChinhHang
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroduceSection;
