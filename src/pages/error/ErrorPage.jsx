import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      
      {/* Animated Background Circles */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-96 h-96  rounded-full top-10 left-10 blur-3xl"
      />

      <motion.div
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-96 h-96  rounded-full bottom-10 right-10 blur-3xl"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative  backdrop-blur-xl p-12 adow-2xl text-center text-black"
      >
        {/* 404 Animated */}
        <motion.h1
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl font-extrabold tracking-widest"
        >
          404
        </motion.h1>

        <p className="text-2xl mt-4 font-light">
          Oops! The page you're looking for doesn't exist.
        </p>

        <motion.button
          
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
