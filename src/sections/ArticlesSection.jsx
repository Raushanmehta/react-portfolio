import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticlesSectionCard from "./ArticlesSectionCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArticlesSection = () => {
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);

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
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/articles/getall"
        );
        setAllArticles(res.data.articles);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  return (
    <section className="pb-24">
      <h2 className="text-center text-3xl  font-Ovo">
        My Articles Post
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Here are some of my articles that I will written. I hope you enjoy reading
        them as much as I enjoyed writing them.
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