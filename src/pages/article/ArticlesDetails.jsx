import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar} from "lucide-react"
import { motion } from "motion/react"
import PropTypes from "prop-types"
import Loader from "@/components/loader/Loader"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
}

const ArticlesDetails = ({ article, related, loading }) => {
  if (loading || !article) {
    return (
      <div className="w-full lg:w-2/3 min-h-[400px] flex items-center justify-center border rounded-lg bg-slate-50/50">
        <Loader />
      </div>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="w-full lg:w-2/3 space-y-6 text-left">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{article.title}</h2>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="text-primary" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800">Author :</p>
            <span className="text-gray-700">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800">Category :</p>
            <span className="text-gray-700">{article.category}</span>
          </div>
          <div className="relative flex items-center gap-2 px-2 py-1 rounded">
            <span className="capitalize">{article.status}</span>
            <span
              className={`
                  relative inline-flex h-2 w-2
                  rounded-full border-2 border-white
                     ${article.status === "published" ? "bg-green-500" : "bg-yellow-500"}
                      animate-ping
                     `} />
          </div>
        </div>
      </div>

      {article.featuredImages && article.featuredImages.length > 0 && (
        <motion.img
          {...fadeUp}
          src={article.featuredImages[0].url}
          alt={article.title}
          className="w-full rounded-lg object-cover"
        />
      )}

      <Card className="bg-slate-50 border-none shadow-none">
        <CardContent className="space-y-4 py-6">
          <p className="text-lg md:text-xl text-gray-800 italic leading-relaxed">"{article.excerpt}"</p>

          {article.tags && article.tags.length > 0 && (
            <div className="text-sm text-gray-500 font-medium">
              <span className="text-gray-900 mr-2 font-bold">Tags:</span> {article.tags.join(", ")}
            </div>
          )}
        </CardContent>
      </Card>

      <motion.div {...fadeUp} viewport={{ once: true }}>
        <Card className="border-none shadow-none">
          <CardContent className="py-6 px-0">
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>
      </motion.div>

      {related && related.length > 0 && (
        <motion.div
          {...fadeUp}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                More in {article.category}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {related.map((item) => (
                <div
                  key={item._id}
                  className="cursor-pointer hover:text-primary transition font-medium"
                >
                  {item.title}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

ArticlesDetails.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["draft", "published"]).isRequired,
    excerpt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    featuredImages: PropTypes.arrayOf(
      PropTypes.shape({
        public_id: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  related: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
}

export default ArticlesDetails
