import { useState } from 'react'
import InfoBlog from './InfoBlog'
import { useDispatch } from 'react-redux'
import { timeNotif } from '../reducers/notifReducer'
import { changeVote, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
    const [showInfo, setShowInfo] = useState(false)
    const dispatch = useDispatch()
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

    if (!showInfo) {
        return (
            <div style={blogStyle} className="blog">
                <p>{blog.title}</p>
                <p>{blog.author}</p>
                <button onClick={() => setShowInfo(!showInfo)}>show</button>
            </div>
        )
    }
    return (
        <InfoBlog
            blog={blog}
            user={user}
            blogStyle={blogStyle}
            handleLike={handleLike}
            setShowInfo={setShowInfo}
            showInfo={showInfo}
            handleDelete={handleDelete}
        />
    )
}

export default Blog
