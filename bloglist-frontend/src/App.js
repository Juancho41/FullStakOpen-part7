import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoguinForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { timeNotif } from './reducers/notifReducer'
import { logginUser, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/userListReducer'
import IndividualUser from './components/IndividualUser'

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
        if (!user) {
            dispatch(timeNotif('Wrong credentials', 3))
        } else {
            dispatch(timeNotif('Logged in successful', 3))
        }
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

    return (
        <Router>
            <div>
                <h2>blogs</h2>
                <Notification />
                <h4>{user.name} loged in</h4>
                <button onClick={handleLogout}>LogOut</button>
                <div>
                    <Link to="/">Blogs</Link>
                    <Link to="/users">Users</Link>
                </div>

                <Routes>
                    <Route path="/users/:id" element={<IndividualUser />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/" element={<BlogList />} />
                </Routes>

            </div>
        </Router>
    )
}

export default App
