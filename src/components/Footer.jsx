import { Code, Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { getMyProfile } from "@/api/user.api";

const Footer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();

        if (!isMounted) return;

        setUser(res?.data?.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Optional loading (can skip if you want)
  if (loading) {
    return <p className="text-center py-6">Loading...</p>;
  }

  return (
    <footer className="w-full shadow-md py-6 text-center flex flex-col items-center">

      {/* SOCIAL ICONS */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">

        {user?.linkedInURL && (
          <a
            href={user.linkedInURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-16 w-16 text-pink-500 hover:text-blue-600 hover:-translate-y-1 duration-500 shadow-md rounded-full"
          >
            <Linkedin className="h-8 w-8" />
          </a>
        )}

        {user?.githubURL && (
          <a
            href={user.githubURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-16 w-16 text-pink-500 hover:text-black hover:-translate-y-1 duration-500 shadow-md rounded-full"
          >
            <Github className="h-8 w-8" />
          </a>
        )}

        {user?.leetcodeURL && (
          <a
            href={user.leetcodeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-16 w-16 text-pink-500 hover:text-orange-500 hover:-translate-y-1 duration-500 shadow-md rounded-full"
          >
            <Code className="h-8 w-8" />
          </a>
        )}

        {user?.facebookURL && (
          <a
            href={user.facebookURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-16 w-16 text-pink-500 hover:text-blue-600 hover:-translate-y-1 duration-500 shadow-md rounded-full"
          >
            <Facebook className="h-8 w-8" />
          </a>
        )}

        {user?.instagramURL && (
          <a
            href={user.instagramURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-16 w-16 text-pink-500 hover:text-yellow-500 hover:-translate-y-1 duration-500 shadow-md rounded-full"
          >
            <Instagram className="h-8 w-8" />
          </a>
        )}
      </div>

      {/* FOOTER TEXT */}
      <p className="text-gray-500 text-sm">
        <a
          href="https://raushanmehtaadmin.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          ©
        </a>{" "}
        2026 Raushan Mehta. All rights reserved.{" "}
        <span className="font-semibold">raushanmehta.in</span>
      </p>
    </footer>
  );
};

export default Footer;
