import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, HandHeart } from "lucide-react";
import { motion } from "motion/react";
import { getMyProfile } from "@/api/user.api";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const HeroSection = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-11/12 max-w-3xl mx-auto h-screen flex flex-col 
      items-center justify-center text-center gap-5 "
    >
      {/* Avatar */}
      <motion.img
        variants={item}
        src={user?.avatar?.url || "/default-avatar.png"}
        alt="avatar"
        className="w-32 h-32 rounded-full"
      />

      {/* Greeting */}
      <motion.h3
        variants={item}
        className="flex items-center gap-2 text-xl md:text-2xl font-Ove"
      >
        Hi! I&apos;m {user?.fullName || "John Doe"} <HandHeart />
      </motion.h3>

      {/* Title */}
      <motion.h1
        variants={item}
        className="text-3xl sm:text-6xl lg:text-[66px] font-Ove leading-tight"
      >
        Software Developer based in India
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={item}
        className="max-w-2xl font-Ove text-gray-600 dark:text-gray-300"
      >
        I am a Software Developer from Bengaluru, India with experience building
        modern, scalable, and performance-focused applications.
      </motion.p>

      {/* Actions */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row gap-4 mt-6"
      >
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          href="/contact"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2"
        >
          Hire me <ArrowUpRight />
        </motion.a>

        {user?.resume?.url && (
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={user.resume.url} target="_blank">
              <Button className="rounded-full px-6 py-6 text-lg 
              bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                Resume <ArrowUpRight />
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
