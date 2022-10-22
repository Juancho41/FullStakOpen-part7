import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const getblogs = useSelector((state) => state.blogs)
    const blogs = [...getblogs]

    const visibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    const blogFormRef = useRef()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div>
            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <CreateBlog visibility={visibility} />
            </Togglable>

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <p style={blogStyle} key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
                    </p>

                ))}
        </div>
    )
}

export default BlogList
