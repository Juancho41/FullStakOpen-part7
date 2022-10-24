import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoguinForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logginUser, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/userListReducer'
import IndividualUser from './components/IndividualUser'
import Blog from './components/Blog'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
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
        dispatch(logginUser(username, password))
        setUsername('')
        setPassword('')
    }

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
    }

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

    const navStyle = {
        padding: 10,
        color: 'black',
        backgroundColor: 'lightblue',
    }

    return (
        <Router>
            <div>
                <span style={navStyle}>
                    <Link style={{ padding: 10 }} to="/">
                        Blogs
                    </Link>
                    <Link style={{ padding: 10 }}  to="/users">Users</Link>
                    <a style={{ padding: 10 }} >{user.name} loged in</a>
                    <button onClick={handleLogout}>LogOut</button>
                </span>
                <Notification />
                <h2>Blog App</h2>

                <Routes>
                    <Route path="/users/:id" element={<IndividualUser />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/" element={<BlogList />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
