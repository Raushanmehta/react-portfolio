import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const resources = [
  {
    title: "Frontend",
    description:
      "Learn HTML, CSS, JavaScript, React.js, Next.js and Tailwind CSS.",
    link: "https://drive.google.com/",
  },
  {
    title: "Backend",
    description:
      "Master Node.js, Express.js, MongoDB, PostgreSQL and REST APIs.",
    link: "https://drive.google.com/",
  },
  {
    title: "Full Stack",
    description:
      "Complete MERN Stack roadmap with real-world projects.",
    link: "https://drive.google.com/",
  },
  {
    title: "AI Engineer",
    description:
      "Learn LangChain, LangGraph, RAG and LLM applications.",
    link: "https://drive.google.com/",
  },
  {
    title: "Android",
    description:
      "Android Development using Kotlin and Firebase.",
    link: "https://drive.google.com/",
  },
  {
    title: "DevOps",
    description:
      "Docker, Kubernetes, CI/CD and AWS learning resources.",
    link: "https://drive.google.com/",
  },
  {
  title: "UI/UX Design",
  description:
    "Learn Figma, design systems, wireframing, prototyping, and modern UI/UX principles.",
  link: "https://drive.google.com/",
},
{
  title: "Cyber Security",
  description:
    "Explore network security, ethical hacking, OWASP Top 10, and penetration testing.",
  link: "https://drive.google.com/",
},
{
  title: "Cloud Computing",
  description:
    "Learn AWS, Microsoft Azure, Google Cloud, Docker, Kubernetes, and cloud deployment.",
  link: "https://drive.google.com/",
},
];

const Resources = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full px-[6%] md:px-[12%] py-10 mt-8 md:mt-16"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="font-Ove text-xl md:text-3xl">
          Resources
        </h1>
        <p className="mt-2 text-slate-400">
          Here are some of the resources I have collected over the years.
        </p>
      </motion.header>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 hover:border-violet-500 hover:shadow-lg transition-all"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl  text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-violet-600 hover:text-violet-500 font-medium"
              >
                Open
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
                />
              </a>
            </div>

            {/* Description */}
            <p className="mt-2 text-gray-500 dark:text-gray-400  font-semibold text-sm ">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
};

export default Resources;