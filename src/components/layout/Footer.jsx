import { motion } from "framer-motion";
import portfolioData from "../../data/portfolioData";

export default function Footer() {
  return (
    <motion.footer
      className="py-8 px-4 text-center text-sm opacity-60 border-t panel-stroke border-x-0 border-b-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>
        © {new Date().getFullYear()} {portfolioData.name}. Built with code, curiosity & late-night debugging.
      </p>
    </motion.footer>
  );
}
