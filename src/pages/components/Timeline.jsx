import { BookType, Briefcase, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/api/axios"; // Use central API
import Skills from "./Skills";
import { motion } from "motion/react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    const getMyTimeLine = async () => {
      try {
        const { data } = await api.get("/timeline/getall");
        setTimeline(data.timelines || []);
      } catch (error) {
        console.error("Error fetching timeline:", error);
      }
    };
    getMyTimeLine();
  }, []);

  const filteredTimeline = timeline.filter(
    (item) => item.type.toLowerCase() === activeTab
  );

  const sortedTimeline = [...filteredTimeline].sort((a, b) => {
    return new Date(b.timeline?.to) - new Date(a.timeline?.to);
  });

  return (
    <section className="w-full px-[5%] lg:px-[12%] py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT COLUMN: Timeline */}
        <div className="w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-Ove">
              Career Path
            </h2>
          </div>

          {/* ===== Tabs ===== */}
          <div className="flex gap-4 mb-12">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "experience"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              <Briefcase size={18} /> Experience
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "education"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              <GraduationCap size={18} /> Education
            </button>
          </div>

          {/* ===== Vertical Timeline ===== */}
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12">
            {sortedTimeline.length > 0 ? (
              sortedTimeline.map((element, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={element._id}
                  className="relative pl-10"
                >
                  <span className="absolute -left-[11px] top-1 flex items-center justify-center h-5 w-5 bg-blue-500 rounded-full ring-4 ring-white dark:ring-slate-950"></span>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      {element.title}
                    </h3>
                    <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md mt-1 sm:mt-0">
                      {element.timeline?.from} — {element.timeline?.to}
                    </span>
                  </div>

                  <p className="text-blue-500 font-medium mb-3 italic">
                    {element.position} {element.marks && `• ${element.marks}`}
                  </p>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    {element.description}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="pl-10 text-slate-500 italic">No records found for {activeTab}.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Skills */}
        <div className="w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-1 bg-cyan-400 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-Ove">
              Technical Arsenal
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-md">
            The programming languages and frameworks I use to bring ideas to life.
          </p>
          <Skills />
        </div>

      </div>
    </section>
  );
};

export default Timeline;

