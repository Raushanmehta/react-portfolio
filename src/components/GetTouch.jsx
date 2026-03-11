import { Link } from "react-router-dom";

const GetTouch = () => {
  return (
    <div className="pt-20 flex flex-col items-center relative">    
      <div className="absolute top-[-0.1em] lg:top-[-2rem] left-1/2 transform -translate-x-1/2 
      flex space-x-4">
        <img 
          src="/assets/img/balls.png"
          alt="bolls"
          className="animate-updown h-32 w-56 sm:h-56 sm:w-96"
        />
      </div>
      <div className="relative rounded-t-full px-4 pt-8 lg:pt-16 
      pb-8 text-center max-w-screen-md bg-gradient-to-t from-white to-gray-100 dark:bg-gradient-to-t dark:from-[#020817] dark:to-gray-900">
        <h2 className="text-3xl  sm:text-5xl font-Ove mb-4">Let’s talk.</h2>
        <p className="text-md sm:text-lg text-gray-600  font-Ove mb-6 px-8 sm:px-16">
          Ready to transform your business with our cutting-edge and digital solutions?
           
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to={"/contact"} className="border font-Ove px-6 py-2 rounded-full transition w-full sm:w-auto hover:bg-gradient-to-r from-[#b820e6] to-[#da7d20] ">
            Get in Touch
          </Link>
          <Link to={"/project"} className=" px-6 py-2 rounded-full border
           w-full sm:w-auto hover:bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
            View Works
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GetTouch;
