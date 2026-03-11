import Hero from "../sections/HeroSection"
import Service from "../sections/ServiceSection"
import GetTouch from "@/components/GetTouch"
import ProjectSection from "@/sections/ProjectSection"
import CTASection from "@/sections/CTASection"
import TimelineSection from "@/sections/TimelineSection"
import ArticlesSection from "@/sections/ArticlesSection"
import Snowfall from "react-snowfall"
import Chatbot from "@/components/Chatbot"


const Home = () => {
  return (
    <>
    <Chatbot/>
    <Snowfall />
      <Hero />
      <TimelineSection/> 
      <Service/>
      <ProjectSection/>
      <ArticlesSection/>
      <CTASection/>
      <GetTouch/>
    </>
  )
}

export default Home