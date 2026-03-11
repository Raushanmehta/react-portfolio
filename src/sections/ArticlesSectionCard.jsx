import PropTypes from "prop-types";

const ArticlesSectionCard = ({ article, onClick }) => {
  if (!article) return null;

  return (
    <div
      onClick={onClick}
      className="relative w-full h-[250px] overflow-hidden  group cursor-pointer"
    >
      {article?.featuredImages?.length > 0 && (
        <img
          src={article.featuredImages[0].url}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover
           transition-transform duration-500 "
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80
       via-black/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
        <h3 className="font-bold text-lg truncate">
          {article.title}
        </h3>

        <p className="text-sm">
          {new Date(article.createdAt).toLocaleDateString()}
        </p>

        <p className="text-sm">
          By {article.author || "Admin"}
        </p>
      </div>
    </div>
  );
};

ArticlesSectionCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    createdAt: PropTypes.string,
    author: PropTypes.string,
    featuredImages: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
  }),
  onClick: PropTypes.func,
};

export default ArticlesSectionCard;