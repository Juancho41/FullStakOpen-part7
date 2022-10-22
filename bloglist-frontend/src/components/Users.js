import { useSelector } from 'react-redux'

const Users = () => {
    const usersList = useSelector((state) => state.usersList)

    if (usersList) {
        return (
            <div>
                <h1>Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Blogs Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList
                            .sort((a, b) => b.blogs.length - a.blogs.length)
                            .map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return <h1>Users</h1>
    }
}

export default Users
