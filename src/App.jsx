import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./components/loader/Loader";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/sonner";
import ErrorPage from "./pages/error/ErrorPage";


const Home = lazy(() => import("./pages/Home"));
const Abouts = lazy(() => import("./pages/about/Abouts"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Project = lazy(() => import("./pages/project/Project"));
const ProjectView = lazy(() => import("./pages/project/ProjectView"));
const Articles = lazy(() => import("./pages/article/Articles"));


const App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"  >
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader />
          </div>
        }>
        
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectView />} />
            <Route path="/about/" element={<Abouts />} />
            <Route path="/project/" element={<Project />} />
            <Route path="/article/:slug" element={<Articles />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          <Footer />
        </Router>
        <Toaster position="bottom-right" theme="dark" />
      </Suspense>
    </ThemeProvider>
  )
}

export default App