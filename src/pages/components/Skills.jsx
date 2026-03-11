import axios from "axios";
import { useEffect, useState } from "react";


const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const getMySkills = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/skill/getall",
                    { withCredentials: true }
                );
                setSkills(data.skills);
            } catch (error) {
                console.error("Error fetching Skills:", error);
                console.log(skills)
            }
        };

        getMySkills();
    }, []);

    return (
        <div className='transition-colors duration-500'>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 
            lg:grid-cols-6 gap-4 lg:py-20 ">
                {skills &&
                    skills.map((element) => (
                        <div
                            className="flex flex-col p-2 justify-center items-center
                             border rounded-md max-w-full"
                            key={element._id}
                        >
                           <img src={element.svg && element.svg.url}
                            alt="skill"
                            className="h-12 w-12 object-contain rounded-full "/>

                            <div className="text-ms text-black dark:text-slate-400">
                                <p className=" text-md font-Ove text-center ">
                                    {element.title}
                                    </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Skills;
