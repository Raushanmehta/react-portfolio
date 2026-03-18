import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticlesSectionCard from "./ArticlesSectionCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllArticles } from "@/api/article.api";

const ArticlesSection = () => {
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllArticles();
        setAllArticles(res?.data?.articles || []); // ✅ safe access
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Loading state
  if (loading) {
    return <p className="text-center py-10">Loading articles...</p>;
  }

  // ✅ No data fallback
  if (allArticles.length === 0) {
    return <p className="text-center py-10">No articles found</p>;
  }

  return (
    <section className="pb-24">
      <h2 className="text-center text-3xl font-Ovo">
        My Articles Post
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Here are some of my articles that I have written.
      </p>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Slider {...settings}>
          {allArticles.map((article) => (
            <div key={article._id} className="px-3">
              <ArticlesSectionCard
                article={article}
                onClick={() => navigate(`/article/${article.slug}`)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ArticlesSection;