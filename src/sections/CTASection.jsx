"use client";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <motion.div
      className="
        max-w-7xl 
        py-16 
        mb-16
        md:pl-20 
        md:w-full 
        max-md:mx-4 
        md:mx-auto 
        flex 
        flex-col 
        md:flex-row 
        max-md:gap-6 
        items-center 
        justify-between 
        text-left 
        bg-gradient-to-b from-pink-900 to-pink-950
        rounded-2xl 
        p-6 
        text-white
        /* bg-fixed */"
      initial={{ y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Text */}
      <div>
        <motion.h1
          className="
            text-4xl 
            md:text-[46px] 
            md:leading-tight 
            font-semibold 
            bg-gradient-to-r from-white to-pink-400
            text-transparent 
            bg-clip-text"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Ready to try-out this app?
        </motion.h1>

        <motion.p
          className="
            bg-gradient-to-r from-white to-pink-400
            text-transparent 
            bg-clip-text 
            text-lg 
            mt-2"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
        >
          Your next favourite tool is just one click away.
        </motion.p>
      </div>

      {/* Button */}
      <motion.button
        className="
          px-12 
          py-3 
          text-slate-800 
          bg-white 
          hover:bg-slate-200 
          rounded-full 
          text-sm 
          mt-6 
          md:mt-0"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}