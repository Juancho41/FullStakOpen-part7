import { useSelector } from 'react-redux'

const InfoBlog = ({
    blog,
    blogStyle,
    handleDelete,
    handleLike,

}) => {

    const user = useSelector((state) => state.user)
    if (user.username === blog.user.username) {
        return (
            <div style={blogStyle} className="blog">
                <p>{blog.title} </p>
                <p>{blog.url}</p>
                <p>
                    likes {blog.likes}{' '}
                    <button onClick={handleLike}>like</button>
                </p>
                <p>{blog.author}</p>
                <button onClick={handleDelete}>Delete</button>
            </div>
        )
    }

    return (
        <div style={blogStyle} className="blog2 blog">
            <p>
                <span>{blog.title}</span>
            </p>
            <p>{blog.url}</p>
            <p>
                likes {blog.likes} <button onClick={handleLike}>like</button>
            </p>
            <p>{blog.author}</p>
        </div>
    )
}

export default InfoBlog
