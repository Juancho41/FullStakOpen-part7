import { useRef } from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'

const BlogList = () => {
    const getblogs = useSelector((state) => state.blogs)
    const blogs = [...getblogs]

    const visibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    const blogFormRef = useRef()

    return (
        <div>
            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <CreateBlog visibility={visibility} />
            </Togglable>

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
        </div>
    )
}

export default BlogList
