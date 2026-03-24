import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion"; // or "motion/react" depending on your setup
import { getProject } from "@/api/project.api";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";
import { GithubIcon, ProjectorIcon, Calendar, Laptop } from "lucide-react";

const ProjectView = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        const res = await getProject(id);

        if (!isMounted) return;

        setProject(res?.data?.project);
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch project"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchProject();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!project) {
    return <p className="text-center py-20">Project not found</p>;
  }

  const {
    title,
    date,
    projectBanner,
    description = "",
    challenges,
    technologies = "",
    stack,
    gitRepoLink,
    projectLink,
    deployed,
  } = project;

  return (
    <section className="px-[6%] md:px-[12%] py-12 mt-8 md:mt-16">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-3 font-Ove">
          {title}
        </h1>

        <div className="flex items-center gap-6 text-[15px] font-medium text-gray-500">
          <span className="flex items-center gap-2"><Calendar size={18} /> {date || "N/A"}</span>
          <span className="flex items-center gap-2"><Laptop size={18} /> {stack || "Project"}</span>
        </div>
      </motion.div>

      {/* ================= BANNER ================= */}
      <div className="mt-10">
        {projectBanner?.url && (
            <motion.img
              src={projectBanner.url}
              alt={title || "Project Banner"}
              className="rounded-xl object-cover w-full h-80 sm:h-[450px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            />
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* ---------- LEFT SIDEBAR ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="font-semibold mb-4 text-xl font-Ove">About Project</h3>
            <div className="text-[15px] text-gray-600 leading-relaxed flex flex-col gap-3">
              <span className="flex items-center gap-2"><strong>Stack:</strong> {stack}</span>
              <span className="flex items-center gap-2"><strong>Deployed:</strong> {deployed ? "Yes" : "No"}</span>
              {projectLink && (
                  <span className="flex items-center gap-2">
                    <strong>Website:</strong>{" "}
                    <a href={projectLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                      Live Link
                    </a>
                  </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
             {gitRepoLink && (
              <a 
                href={gitRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-2 gap-3 rounded-full border border-gray-300 font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-[#b820e6] to-[#da7d20] hover:text-white hover:border-transparent"
              ><GithubIcon size={18} />
                GitHub Repository
              </a>
            )}
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-2 gap-3 rounded-full border border-gray-300 font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-[#b820e6] to-[#da7d20] hover:text-white hover:border-transparent"
              ><ProjectorIcon size={18} />
                Live Project Link
              </a>
            )}
          </div>
        </motion.div>

        {/* ---------- RIGHT CONTENT ---------- */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Overview */}
          {description && (
             <ContentBlock
                title="Project Overview"
                text={description}
             />
          )}

          {/* Challenge */}
          {challenges && (
            <ContentBlock
              title="Challenges & Objectives"
              text={challenges}
            />
          )}

          {/* Tools */}
          {technologies && (
            <ContentBlock
              title="Tools & Technologies"
              text={technologies}
            />
          )}

        </div>
      </div>
    </section>
  );
};

/* ================= REUSABLE BLOCK ================= */
const ContentBlock = ({ title, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="font-semibold mb-4 text-xl font-Ove">{title}</h3>
      <div className="text-gray-600 text-[15px] sm:text-base leading-relaxed space-y-3">
         {text.split(".").filter(Boolean).map((sentence, i) => (
             <p key={i}>{sentence.trim()}.</p>
         ))}
      </div>
    </motion.div>
  );
};

export default ProjectView;
