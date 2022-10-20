import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoguinForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { timeNotif } from './reducers/notifReducer'


const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())

    }, [])

    const getblogs = useSelector(state => state.blogs)
    const blogs = [...getblogs]

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            dispatch(timeNotif('Logged in successful', 3))
        } catch (exception) {
            dispatch(timeNotif(`Wrong credentials - ${exception}`, 3))
            }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }
    const visibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    const blogFormRef = useRef()

    if (user === null) {
        return (
            <div>
                <Notification />
                <h2>Log in to application</h2>
                <LoguinForm
                    handleLogin={handleLogin}
                    handleUsername={handleUsername}
                    handlePassword={handlePassword}
                    username={username}
                    password={password}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <h4>{user.name} loged in</h4>
            <button onClick={handleLogout}>LogOut</button>
            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <CreateBlog  visibility={visibility}/>
            </Togglable>

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                    />
                ))}
        </div>
    )
}

export default App
