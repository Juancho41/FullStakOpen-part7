import InfoBlog from './InfoBlog'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeNotif } from '../reducers/notifReducer'
import { changeVote, deleteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import {
    initializeComment,
    createBlogComment,
} from '../reducers/commentReducer'

const Blog = () => {
    const [newComment, setNewComment] = useState('')
    const dispatch = useDispatch()
    const id = useParams().id
    useEffect(() => {
        dispatch(initializeComment(id))
    }, [])

    const handleNewComment = (event) => {
        setNewComment(event.target.value)
    }

    let comments = useSelector((state) => state.comments)

    const blogs = useSelector((state) => state.blogs)
    const blog = blogs.find((blog) => blog.id === id)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
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

    const handleDelete = () => {
        if (window.confirm(`do you really want to delete ${blog.title}`)) {
            try {
                dispatch(deleteBlog(blog.id))
                dispatch(timeNotif(`${blog.title} deleted`, 3))
            } catch (exception) {
                dispatch(timeNotif(`${exception}`, 3))
            }
        }
    }

    const handleAddComment = (event) => {
        event.preventDefault()
        const newBlogComment = {
            content: newComment,
        }

        dispatch(createBlogComment(id, newBlogComment))
        setNewComment('')
    }

    if (!comments) {
        comments = []
    }

    if (blog) {
        return (
            <div>
                <InfoBlog
                    blog={blog}
                    blogStyle={blogStyle}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                />
                <h3>Comments</h3>
                <form onSubmit={handleAddComment}>
                    <div>
                        New Comment:
                        <input
                            id="NewComment"
                            type="text"
                            value={newComment}
                            name="NewComment"
                            onChange={handleNewComment}
                        />
                        <button type="submit">Add Comment</button>
                    </div>
                </form>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>{comment.content}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Blog
