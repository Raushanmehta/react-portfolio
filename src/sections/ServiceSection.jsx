import { motion } from "motion/react";

const services = [
  {
    img: "/assets/web-icon.png",
    title: "Web Development",
    desc: "Building responsive, high-performance websites using modern frameworks and technologies.",
  },
  {
    img: "/assets/graphics-icon.png",
    title: "UI/UX Design",
    desc: "Designing intuitive and visually appealing user interfaces focused on great user experience.",
  },
  {
    img: "/assets/ui-icon.png",
    title: "Video Editing",
    desc: "Crafting engaging videos with smooth transitions, effects, and professional storytelling.",
  },
  {
    img: "/assets/graphics-icon.png",
    title: "Graphic Design",
    desc: "Creating compelling visuals, logos, and brand designs that make a lasting impression.",
  },
];

/* ---------------- Motion Variants ---------------- */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ServiceSection = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full px-[6%] md:px-[12%] py-10 "
    >
      {/* Section Header */}
      <motion.div variants={item} className="text-center mb-16">
        <h1 className="text-center text-3xl font-Ove mb-2">
          Services
        </h1>
        <p className="text-base font-Ove text-gray-600">
          Targeting Frontend Developer roles with an organization of
          <br className="hidden sm:block" />
          high repute with a scope of improving knowledge and further career growth.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={item}

            className=" border
  rounded-xl
  px-8 py-12
  transition-all
  duration-300
  hover:-translate-y-1 cursor-pointer
  hover:shadow-[4px_4px_0_#000] hover:dark:shadow-[4px_4px_0_#F6339A]"
          >
            <motion.img
              src={service.img}
              alt={service.title}
              className="mx-auto mb-4 w-12 h-12 object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {service.title}
            </h4>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ServiceSection;
