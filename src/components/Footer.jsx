import axios from "axios";
import { Code, Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me/portfolio",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getMyProfile();
  }, []);

  return (
    <div>
      <footer className="w-full shadow-md py-6 text-center z-10 flex 
      flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {/* Social Media Icons */}
          {user?.linkedInURL && (
            <Link
              to={user.linkedInURL}
              target="_blank"
              className="flex dark:border items-center justify-center h-16 w-16
               text-pink-500 hover:text-blue-600 cursor-pointer 
               hover:-translate-y-1 duration-500 shadow-md rounded-full"
            >
              <Linkedin className="h-8 w-8" />
            </Link>
          )}
          {user?.githubURL && (
            <Link
              to={user.githubURL}
              target="_blank"
              className="flex dark:border items-center justify-center 
              h-16 w-16 text-pink-500 hover:text-slate-900  
              cursor-pointer hover:-translate-y-1 duration-500 shadow-md rounded-full"
            >
              <Github className="h-8 w-8" />
            </Link>
          )}
          {user?.leetcodeURL && (
            <Link
              to={user.leetcodeURL}
              target="_blank"
              className="flex dark:border items-center justify-center 
              h-16 w-16 text-pink-500 hover:text-orange-600  
              cursor-pointer hover:-translate-y-1 duration-500 shadow-md rounded-full"
            >
              <Code className="h-8 w-8" />
            </Link>
          )}
          {user?.facebookURL && (
            <Link
              to={user.facebookURL}
              target="_blank"
              className="flex dark:border items-center justify-center 
              h-16 w-16 text-pink-500 hover:text-blue-600 
              cursor-pointer hover:-translate-y-1 duration-500 shadow-md rounded-full"
            >
              <Facebook className="h-8 w-8" />
            </Link>
          )}
          {user?.instagramURL && (
            <Link
              to={user.instagramURL}
              target="_blank"
              className="flex dark:border  items-center justify-center
              h-16 w-16 text-pink-500 hover:text-yellow-500 
              cursor-pointer hover:-translate-y-1 duration-500 shadow-md rounded-full"
            >
              <Instagram className="h-8 w-8" />
            </Link>
          )}
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © 2024 Raushan Mehta. All rights reserved.{" "}
          <span className="font-semibold">Raushanmehta.in</span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
