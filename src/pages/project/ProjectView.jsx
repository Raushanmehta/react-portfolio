import axios from "axios";
import { GithubIcon, ProjectorIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";


const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [description, setDescription] = useState("");
  const [challenges, setChallenges] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [deployed, setDeployed] = useState("");

  const { id } = useParams(); 

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDate(res.data.project.date);
          setDescription(res.data.project.description);
          setChallenges(res.data.project.challenges);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setTechnologies(res.data.project.technologies);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionInListFormat = description.split(".");
  const technologiesInListFormat = technologies.split(",");

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-80 sm:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/img/projectBanner-Image.jpg')`,
          }}
        >          
        </div>
        <div className="relative  w-full px-[12%] py-10 scroll-mt-20 mt-8 md:mt-16 ">
          <h1 className="text-center font-Ovo text-xl md:text-3xl">{title}</h1>
          <p className="text-gray-600 text-center mb-7 mt-2">Focused on the experience,
             driven by the engineering.</p>
        </div>
      </div>
      <div className="mx-auto p-4 -mt-36 flex flex-col items-center justify-center">
        {projectBanner && (
          <div className="relative w-full max-w-4xl h-[450px] bg-cover bg-center rounded-3xl mb-8"
            style={{ backgroundImage: `url(${projectBanner})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-3xl"></div>
          </div>
        )}
        <div className="space-y-6 w-full max-w-4xl">
          <div>
            <h2 className="text-lg font-Ove">Description</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {descriptionInListFormat.map((sentence, index) => (
                <li key={index} className="text-base">{sentence.trim() && 
                  sentence.trim() + "."}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-Ove">Technologies</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {technologiesInListFormat.map((tech, index) => (
                <li key={index} className="text-base">{tech.trim()}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-Ove">Challenges</h2>
            <p className="text-base text-gray-700">{challenges}</p>
          </div>
          <div>
            <h2 className="text-lg font-Ove">Stack</h2>
            <p className="text-base text-gray-700">{stack}</p>
          </div>
          <div>
            <h2 className="text-lg font-Ove">Date</h2>
            <p className="text-base text-gray-700">{date}</p>
          </div>
          <div>
            <h2 className="text-lg font-Ove">Deployed</h2>
            <h2 className="text-lg text-gray-700">{deployed ? "Yes" : "No"}</h2>
          </div>
          <div className="flex gap-4 mt-4 justify-center items-center w-full">
            {gitRepoLink && (
              <Link 
                href={gitRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                
                className="flex items-center justify-center px-4 py-2 gap-4 rounded-full border cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-[#b820e6] to-[#da7d20]"
              ><GithubIcon/>
                GitHub Repository
              </Link>
            )}
            {projectLink && (
              <Link
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 gap-4 rounded-full border cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-[#b820e6] to-[#da7d20]"
              ><ProjectorIcon/>
                Live Project Link
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
