import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import axios from "axios"
import ArticlesDetails from "./ArticlesDetails"
import ArticleRecent from "./ArticleRecent"
import Loader from "@/components/loader/Loader"
import { getAllArticles, getArticleBySlug } from "@/api/article.api"


const item = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, easing: "ease-out" },
}

const Articles = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [currentArticle, setCurrentArticle] = useState(null)
  const [allArticles, setAllArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getAllArticles();
        setAllArticles(res.data.articles);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, []);



  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await getArticleBySlug(slug);
        setCurrentArticle(res.data.article);
      } catch (err) {
        console.error(err);
        setError("Article not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);


  const related = currentArticle
    ? allArticles.filter(
        (a) => a.category === currentArticle.category && a._id !== currentArticle._id
      )
    : []

  const handleSelectArticle = (article) => {
    navigate(`/article/${article.slug}`)
  }

  if (allArticles.length === 0 && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error && !currentArticle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
         <p className="text-xl font-medium text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <motion.section
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="w-full px-[6%] md:px-[12%] py-10 scroll-mt-20 mt-8 md:mt-16"
    >
      <motion.h2
        variants={item}
        className="text-center font-Ove text-xl md:text-3xl mb-10"
      >
      Article        
      </motion.h2>

      <div className="flex w-full flex-col lg:flex-row items-start gap-10 my-10">
        <ArticlesDetails article={currentArticle} related={related} loading={loading} />

        <ArticleRecent
          recent={allArticles}
          onSelectArticle={handleSelectArticle}
        />
      </div>
    </motion.section>
  )
}

export default Articles
