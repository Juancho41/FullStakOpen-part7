import { TextField, Button } from '@mui/material'

const LoguinForm = ({
    handleLogin,
    username,
    password,
    handleUsername,
    handlePassword,
}) => (
    <form onSubmit={handleLogin}>
        <div>
            <TextField
                label="username"
                type="text"
                value={username}
                name="Username"
                onChange={handleUsername}
            />
        </div>
        <div>
            <TextField
                label="password"
                type="password"
                value={password}
                name="Password"
                onChange={handlePassword}
            />
        </div>
        <Button variant="contained" color="primary" type="submit">
            Login
        </Button>
    </form>
)

export default LoguinForm
