import { getAllSkills } from "@/api/skill.api";
import { getAllTimelines } from "@/api/timeline.api";
import Loader from "@/components/loader/Loader";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const TimelineSection = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [skillsRes, timelineRes] = await Promise.all([
          getAllSkills(),
          getAllTimelines(),
        ]);

        setSkills(skillsRes?.data?.skills || []);
        setTimeline(timelineRes?.data?.timelines || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const filteredTimeline = useMemo(() => {
    return timeline
      .filter((item) => item.type?.toLowerCase() === activeTab)
      .sort((a, b) => new Date(b.timeline?.to) - new Date(a.timeline?.to));
  }, [timeline, activeTab]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="w-full px-[6%] md:px-[12%] py-10">
      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-Ove mb-4">Skills & Experience</h1>
        <p className="text-gray-500 max-w-xl mb-12">
          Targeting Frontend Developer roles with an organization of high repute
          with a scope of improving knowledge and further career growth.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* ================= LEFT : TIMELINE ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* TABS */}
          <div className="flex w-full max-w-lg border-2 border-blue-500 rounded-xl overflow-hidden mb-10">
            <button
              onClick={() => setActiveTab("experience")}
              className={`w-1/2 py-4 font-medium ${
                activeTab === "experience"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              Experience
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`w-1/2 py-4 font-medium ${
                activeTab === "education"
                  ? "bg-blue-500 "
                  : ""
              }`}
            >
              Education
            </button>
          </div>

          {/* TIMELINE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredTimeline.map((item, index) => (
              <motion.div
                key={item._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className=""
              >
                <h3 className="font-semibold text-lg">
                  {item.title}
                  {index === 0 && (
                    <span className="ml-3 text-xs bg-pink-500 text-white px-2 py-1 rounded">
                      Latest
                    </span>
                  )}
                </h3>

                <p className="text-pink-600">{item.position}</p>
                {item.marks && (
                  <p className="text-gray-500">{item.marks}</p>
                )}
                <p className="text-gray-500">
                  {item.timeline?.from} - {item.timeline?.to}
                </p>
                <p className="text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= RIGHT : SKILLS ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-Ove mb-8">My Skills</h2>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-10 gap-y-6 ">
            {skills.map((skill, index) => (
              <motion.div
                key={skill._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <img
                  src={skill?.svg?.url}
                  alt={skill.title}
                  className="h-12 w-12 mx-auto object-contain rounded-full cursor-pointer hover:-translate-y-2 duration-500"
                />
                <p className="mt-2 font-medium">{skill.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;