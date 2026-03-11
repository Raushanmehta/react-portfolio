import axios from "axios";
import { useEffect, useState } from "react";

const Application = () => {
    const [application, setApplication] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getMyApps = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/softwareapplication/getall",
                    { withCredentials: true }
                );
                setApplication(data.softwareApplications || []); 
                console.log(data.softwareApplications)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Applications:", error);
                setError("There was an error fetching the applications.");
                setLoading(false);
            }
        };

        getMyApps();
    }, []);

    // Loading and error state handling
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='px-4 py-16 sm:px-8 lg:px-36 bg-white dark:bg-black transition-colors duration-500'>
            <h1 className="text-5xl lg:text-6xl mb-6 font-bold text-black text-center dark:text-white">
                Applications
            </h1>
            <p className='mb-16 text-center text-lg font-md text-slate-400'>
                Targeting Frontend Developer roles with an organization of <br />
                high repute with a scope of improving knowledge and further career growth.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 lg:py-20">
                {application.length > 0 ? (
                    application.map((element) => (
                        <div
                            className="flex flex-col justify-center items-center border-gray-200 rounded-lg"
                            key={element._id}
                        >
                            <div className="relative w-28 h-28 rounded-full shadow-2xl shadow-cyan-100">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <img
                                        src={element.svg?.url || ""}
                                        alt={element.title || "Skill image"}
                                        className="h-36 w-36 object-contain"
                                    />
                                </div>
                            </div>
                            {/* Application Title */}
                            <p className="text-black text-xl font-semibold text-center">
                                {element.title}
                            </p>
                        </div>
                    ))
                ) : (
                    <div>No applications found.</div>
                )}
            </div>
        </div>
    );
};

export default Application;
