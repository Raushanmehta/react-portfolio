import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PropTypes from "prop-types"

const ArticleRecent = ({ recent, onSelectArticle }) => {
  return (
    <div className="w-[320px] sticky top-[100px] self-start">
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {recent.map((post, index) => (
            <div
              key={post._id}
              onClick={() => onSelectArticle(post)}
              className={`
                px-5 py-3
                cursor-pointer
                hover:bg-pink-500
                transition-colors
                ${index !== recent.length - 1 ? "border-b" : ""}
              `}
            >
              {post.title}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ================= PROP TYPES =================
ArticleRecent.propTypes = {
  recent: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectArticle: PropTypes.func.isRequired,
}

export default ArticleRecent