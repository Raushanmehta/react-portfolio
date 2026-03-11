import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import { motion } from "motion/react";
import { getAllProjects } from "@/api/project.api";
import Loader from "@/components/loader/Loader";

/* ---------------- Motion Variants ---------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
    },
  },
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedStack, setSelectedStack] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();

        const reversedProjects = [
          ...(response?.data?.projects || []),
        ].reverse();

        setProjects(reversedProjects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);



  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStack =
        selectedStack === "All" ||
        project.stack?.includes(selectedStack);

      const techString = Array.isArray(project.technologies)
        ? project.technologies.join(" ").toLowerCase()
        : project.technologies?.toLowerCase() || "";

      const matchesSearch =
        project.title?.toLowerCase().includes(search.toLowerCase()) ||
        techString.includes(search.toLowerCase());

      return matchesStack && matchesSearch;
    });
  }, [projects, selectedStack, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }


  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full px-[12%] py-10 mt-8 md:mt-16"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="font-Ovo text-xl md:text-3xl">
          Projects
        </h1>
        <p className="mt-2 text-slate-400">
          Targeting Frontend Developer roles with growth opportunities.
        </p>
      </motion.header>

      {/* Filter */}
      <ProjectFilter
        search={search}
        onSearchChange={setSearch}
        selectedStack={selectedStack}
        onStackChange={(value) => {
          setSelectedStack(value);
          setVisibleProjects(6);
        }}
      />

      {/* Projects Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
      >
        {filteredProjects
          .slice(0, visibleProjects)
          .map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              layout
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
      </motion.section>

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No projects found
        </p>
      )}

      {/* Load More */}
      {visibleProjects < filteredProjects.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button
            onClick={() =>
              setVisibleProjects((prev) => prev + 6)
            }
          >
            Load More
          </Button>
        </motion.div>
      )}
    </motion.main>
  );
};

export default Project;