import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Loader from "@/components/loader/Loader";
import { getMyProfile } from "@/api/user.api";
import { getAllApplications } from "@/api/application.api";

const data = [
  {
    name: "Languages",
    icon1: "./assets/code-icon.png",
    icon2: "./assets/code-icon-dark.png",
    link: "/skills",
    description: "Core Java, Java, Spring Boot, JavaScript React Js, Next Js & more...",
  },
  {
    name: "Education",
    icon1: "./assets/edu-icon.png",
    icon2: "./assets/edu-icon-dark.png",
    link: "/timeline",
    description: "B.Tech in Computer Engineering",
  },
  {
    name: "Projects",
    icon1: "./assets/project-icon.png",
    icon2: "./assets/project-icon-dark.png",
    link: "/project",
    description: "Built more than 5 projects",
  },
];



const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Abouts = () => {
  const [user, setUser] = useState({});
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [profileRes, appsRes] = await Promise.all([
          getMyProfile(),
          getAllApplications(),
        ]);

        setUser(profileRes.data.user);
        setApplication(appsRes.data.softwareApplications || []);
      } catch (err) {
        setError("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    );
  }



  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full px-[6%] md:px-[12%] py-10  scroll-mt-20 mt-8 md:mt-16 "
    >
      {/* Title */}
      <motion.h2
        variants={item}
        className="text-center font-Ove text-xl md:text-3xl"
      >
        About me
      </motion.h2>

      <div className="flex w-full flex-col lg:flex-row items-start lg:items-start gap-12 lg:gap-20 my-12 lg:my-20">
        {/* Avatar */}
        <motion.div variants={item} className="max-w-max mx-auto relative">
          <motion.img
            src={user?.avatar?.url || "/default-avatar.png"}
            alt="Avatar"
            className="w-64 sm:w-80 aspect-square object-cover rounded-3xl max-w-none"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="bg-white w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <img
              src="./assets/circular-text.png"
              alt=""
              className="animate-spin [animation-duration:5s]"
            />
            <img
              src="./assets/dev-icon.png"
              alt=""
              className="w-1/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div variants={container} className="flex-1">
          <div className="mb-10 max-w-2xl">
            <motion.div
              initial={false}
              animate={{ height: showFull ? "auto" : "7.5rem" }} // Roughly 5 lines
              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden relative"
            >
              <p className="font-Ove text-gray-700 leading-relaxed">
                {user?.aboutMe || "No description provided."}
              </p>
              {!showFull && user?.aboutMe && (
                <div className="absolute bottom-0 left-0 w-full h-8  pointer-events-none" />
              )}
            </motion.div>

            {user?.aboutMe && user.aboutMe.length > 200 && (
              <button
                onClick={() => setShowFull(!showFull)}
                className="text-primary font-medium mt-4 cursor-pointer transition-all"
              >
                {showFull ? "Show Less" : "Show More..."}
              </button>
            )}
          </div>

          {/* Info Cards */}
          <motion.ul
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
          >
            {data.map((d) => (
              <motion.li
                key={d.name}
                variants={card}
                whileHover={{ y: -6 }}
                className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover/50"
              >
                <img src={d.icon1} alt="" className="w-10 mt-3 dark:hidden" />
                <img src={d.icon2} alt="" className="w-10 mt-3 hidden dark:block" />
                <a
                  href={d.link}
                  className="my-4 font-semibold text-gray-700 dark:text-white block"
                >
                  {d.name}
                </a>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {d.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          {/* Tools */}
          <motion.h4
            variants={item}
            className="my-6 text-gray-700 font-Ove dark:text-white/80"
          >
            Tools I use
          </motion.h4>

          <motion.ul
            variants={container}
            className="grid grid-cols-4 sm:grid-cols-8 gap-4"
          >
            {application.map((el) => (
              <motion.li
                key={el._id}
                variants={card}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg cursor-pointer"
              >
                <img
                  src={el.svg?.url || ""}
                  alt={el.title || "Skill"}
                  className="w-5 sm:w-7"
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Abouts;
