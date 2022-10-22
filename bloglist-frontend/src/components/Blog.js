import InfoBlog from './InfoBlog'
import { useDispatch, useSelector } from 'react-redux'
import { timeNotif } from '../reducers/notifReducer'
import { changeVote, deleteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const blogs = useSelector((state) => state.blogs)
    const blog = blogs.find((blog) => blog.id === id)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const handleLike = () => {
        const blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
        }

        try {
            dispatch(changeVote(blogObject, blog.id))
            dispatch(timeNotif(`${blogObject.title} updated`, 3))
        } catch (exception) {
            dispatch(timeNotif(`${exception}`, 3))
        }
    }

    const handleDelete = async () => {
        if (window.confirm(`do you really want to delete ${blog.title}`)) {
            try {
                dispatch(deleteBlog(blog.id))
                dispatch(timeNotif(`${blog.title} deleted`, 3))
            } catch (exception) {
                dispatch(timeNotif(`${exception}`, 3))
            }
        }
    }

    if (blog) {
        return (
            <InfoBlog
                blog={blog}
                blogStyle={blogStyle}
                handleLike={handleLike}
                handleDelete={handleDelete}
            />
        )
    }
}

export default Blog
