import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "@/api/project.api";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();

        if (!isMounted) return;

        const reversedProjects = [...(res?.data?.projects ?? [])].reverse();
        setProjects(reversedProjects);
      } catch (err) {
        console.error("Project fetch error:", err);

        if (!isMounted) return;
        setError("Failed to load projects.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Loading UI
  if (loading) {
    return (
      <p className="text-center py-20">Loading projects...</p>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <p className="text-center py-20 text-red-500">
        {error}
      </p>
    );
  }

  // ✅ Empty state (important)
  if (projects.length === 0) {
    return (
      <p className="text-center py-20">
        No projects available.
      </p>
    );
  }

  return (
    <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
      <h2 className="text-center text-3xl font-Ovo">
        My latest work
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Welcome to my web development portfolio!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-6 dark:text-black">
        {projects.slice(0, 4).map((item) => (
          <div
            key={item._id}
            className="aspect-square border bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
            style={{
              backgroundImage: `url(${
                item?.projectBanner?.url ||
                "https://via.placeholder.com/400"
              })`,
            }}
          >
            <Link
              to={`/project/${item._id}`}
              className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between transition-all duration-500 group-hover:bottom-7"
            >
              <div>
                <h2 className="font-semibold">
                  {item?.title || "Untitled"}
                </h2>
                <p className="text-sm text-gray-700">
                  {item?.stack || "N/A"}
                </p>
              </div>

              <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-pink-500 transition">
                <img
                  src="/assets/send-icon.png"
                  alt="Open"
                  className="w-5"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Link
        to="/project"
        className="w-max flex items-center justify-center gap-2 text-gray-700 border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full py-2 px-8 mx-auto my-20 duration-300 dark:text-white"
      >
        Show more
      </Link>
    </div>
  );
};

export default ProjectSection;