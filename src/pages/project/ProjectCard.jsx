import { Link } from "react-router-dom";
import { motion } from "motion/react";
import PropTypes from "prop-types";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl border bg-white"
    >
      <Link to={`/project/${project._id}`}>
        <motion.img
          src={
            project.projectBanner?.url ||
            "https://via.placeholder.com/400x400"
          }
          alt={project.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Stack:</span>{" "}
          {project.stack}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Project Link:</span>{" "}
          {project.projectLink}
        </p>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    stack: PropTypes.string,
    technologies: PropTypes.string,
    projectBanner: PropTypes.shape({
      url: PropTypes.string,
    }),
    _id: PropTypes.string,
  }),
};

export default ProjectCard;
