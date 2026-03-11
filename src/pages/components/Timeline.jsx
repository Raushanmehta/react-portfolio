import axios from "axios";
import { BookType } from "lucide-react";
import { useEffect, useState } from "react";
import Skills from "./Skills";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    const getMyTimeLine = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/timeline/getall",
          { withCredentials: true }
        );
        setTimeline(data.timelines || []);
      } catch (error) {
        console.error("Error fetching timeline:", error);
      }
    };
    getMyTimeLine();
  }, []);

  // ✅ Filter data based on active tab
  const filteredTimeline = timeline.filter(
    (item) => item.type.toLowerCase() === activeTab
  );

  // ✅ Sort by "to" date (latest first)
  const sortedTimeline = [...filteredTimeline].sort((a, b) => {
    const aToDate = new Date(a.timeline?.to);
    const bToDate = new Date(b.timeline?.to);
    return bToDate - aToDate;
  });

  return (
    <div className="flex grid-cols-2 justify-center gap-6">
      <div className="">
      <h1
        className="text-5xl md:text-5xl mb-6 font-Ove text-black text-center
        dark:text-white"
      >
        Education & Experience
      </h1>


      {/* ===== Tabs (Experience / Education) ===== */}
      <div className="flex justify-center mb-10">
        <ul className="flex w-full max-w-lg rounded border-2 border-blue-500 overflow-hidden">
          <li className="w-1/2">
            <button
              onClick={() => setActiveTab("experience")}
              className={`w-full py-3 text-lg font-semibold transition-all ${
                activeTab === "experience"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-blue-500 hover:bg-blue-100"
              }`}
            >
              Experience
            </button>
          </li>
          <li className="w-1/2">
            <button
              onClick={() => setActiveTab("education")}
              className={`w-full py-3 text-lg font-semibold transition-all ${
                activeTab === "education"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-blue-500 hover:bg-blue-100"
              }`}
            >
              Education
            </button>
          </li>
        </ul>
      </div>

      {/* ===== Timeline List ===== */}
      <div className="container mx-auto flex flex-col md:flex-row items-center pl-5 lg:pl-0">
        <ol className="relative border-l border-gray-200 dark:border-gray-700 w-full mt-16 px-4 lg:px-0">
          {sortedTimeline.length > 0 ? (
            sortedTimeline.map((element, index) => {
              const isLatest = index === 0;
              return (
                <li key={element._id} className="mb-4 mx-4 md:mx-4">
                  <span
                    className="absolute flex items-center justify-center h-8 w-8 md:w-10 md:h-10
                    bg-gradient-to-r from-[#228BE6] to-cyan-300 rounded-full -start-3
                    ring-8 shadow-lg ring-white dark:ring-gray-900 dark:bg-gray-900"
                  >
                    <BookType className="animate-pulse h-6 w-6 text-white" />
                  </span>

                  <h3
                    className="flex items-center mb-1 pl-10 text-xl font-Ove
                    text-gray-900 dark:text-white"
                  >
                    {element.title}
                    <span
                      className={`bg-[#FF00A1] text-white text-sm font-Ove me-2 px-2 py-0.5 rounded ms-3 ${
                        isLatest ? "" : "hidden"
                      }`}
                    >
                      Latest
                    </span>
                  </h3>

                  <p
                    className=" mt-6  pl-10 text-lg font-Ove
                    leading-none text-gray-600 dark:text-gray-500"
                  >
                    {element.position}
                  </p>

                  {element.marks && (
                    <p
                      className=" pl-10 text-lg font-Ove leading-none
                      text-gray-500 dark:text-gray-500"
                    >
                      {element.marks}
                    </p>
                  )}

                  <time
                    className="pl-10 text-lg font-Ove 
                    text-gray-500 dark:text-gray-500"
                  >
                    {element.timeline?.from} - {element.timeline?.to}
                  </time>

                  <p
                    className="text-lg font-Ove pl-10 text-gray-500
                    dark:text-gray-400"
                  >
                    {element.description}
                  </p>
                </li>
              );
            })
          ) : (
            <p className="pl-10 text-gray-500 text-lg font-Ove">
              No {activeTab} records found.
            </p>
          )}
        </ol>
      </div>
    </div>


      <div className="">
        <Skills/>
      </div>
    </div>
  );
};

export default Timeline;
