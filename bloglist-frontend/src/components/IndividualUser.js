import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const IndividualUser = () => {
    const id = useParams().id
    const usersList = useSelector((state) => state.usersList)


    if (usersList) {
        const user = usersList.find((user) => user.id === id)
        return (
            <div>
                <h2>{user.name}</h2>
                <p>added Blogs</p>
                <div>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </div>
            </div>
        )

    }

}

export default IndividualUser
