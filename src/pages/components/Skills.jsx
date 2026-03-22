import { useEffect, useState } from "react";
import api from "@/api/axios"; // Use central API
import { motion } from "motion/react";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await api.get("/skill/getall");
        setSkills(data.skills);
      } catch (error) {
        console.error("Error fetching Skills:", error);
      }
    };
    getMySkills();
  }, []);

  return (
    <div className="w-full py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {skills &&
          skills.map((element, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              key={element._id}
              className="group relative flex flex-col items-center p-6 bg-white/50 dark:bg-slate-900/50 
              backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl 
              hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300
              shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="relative mb-4">
                <img
                  src={element.svg?.url}
                  alt={element.title}
                  className="h-14 w-14 object-contain group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] 
                  transition-all duration-300"
                />
              </div>

              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-center mb-2">
                {element.title}
              </h3>

              {/* Proficiency Indicator */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${element.proficiency}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1">
                {element.proficiency}%
              </span>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Skills;

