import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@mui/material'

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

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogs
                            .sort((a, b) => b.likes - a.likes)
                            .map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        <Link to={`/blogs/${blog.id}`}>
                                            {' '}
                                            {blog.title}{' '}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{blog.user.name}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BlogList
