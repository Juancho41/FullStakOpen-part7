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
import {
    Container,
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
} from '@mui/material'

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
            <Container>
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
            </Container>
        )
    }

    return (
        <Container>
            <Router>
                <div>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1 }}
                                >
                                    Blogs App
                                </Typography>
                                <Button color="inherit" component={Link} to="/">
                                    Blogs
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/users"
                                >
                                    Users
                                </Button>
                                <a style={{ padding: 10 }}>
                                    {user.name} loged in
                                </a>
                                <Button color="inherit" onClick={handleLogout}>
                                    LogOut
                                </Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Notification />

                    <Routes>
                        <Route path="/users/:id" element={<IndividualUser />} />
                        <Route path="/blogs/:id" element={<Blog />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/" element={<BlogList />} />
                    </Routes>
                </div>
            </Router>
        </Container>
    )
}

export default App
