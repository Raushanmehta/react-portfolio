import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PROJECT_API = "http://localhost:4000/api/v1/project/getall";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  let mounted = true;

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(PROJECT_API, {
        withCredentials: true,
      });

      if (mounted) {
        const reversedProjects = [...(data?.projects ?? [])].reverse();
        setProjects(reversedProjects);
      }
    } catch (err) {
      setError("Failed to load projects.",err);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
  return () => (mounted = false);
}, []);
  if (loading) {
    return (
      <p className="text-center py-20">Loading projects...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-20 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
     
      <h2 className="text-center text-3xl  font-Ovo">
        My latest work
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Welcome to my web development portfolio! Explore a collection of
        projects showcasing my expertise in front-end development.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-6 dark:text-black">
        {[...projects].slice(0, 4).map((item) => (
          <div
            key={item._id}
            className="aspect-square border bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
            style={{
              backgroundImage: `url(${
                item.projectBanner?.url ||
                "https://via.placeholder.com/400"
              })`,
            }}
          >
            <Link to={`/project/${item._id}`} className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between transition-all duration-500 group-hover:bottom-7">
              <div>
                <h2 className="font-semibold">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-700">
                  {item.stack}
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

      {/* BUTTON */}
      <a
        href="/project"
        className="w-max flex items-center justify-center gap-2 text-gray-700 border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full py-2 px-8 mx-auto my-20 duration-300 dark:text-white"
      >
        Show more
        <img
          src="/assets/right-arrow-bold.png"
          alt=""
          className="w-4 dark:hidden"
        />
        <img
          src="/assets/right-arrow-bold-dark.png"
          alt=""
          className="w-4 hidden dark:block"
        />
      </a>
    </div>
  );
};

export default ProjectSection;