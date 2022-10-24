import { useSelector } from 'react-redux'

const Notification = () => {

    const notifStyle = {
        backgroundColor: 'black',
        padding: 10,
        color: 'white',
    }

    const notification = useSelector(state => state.notif)
    if (notification === null) {
        return null
    }

    return <div className="error" style={notifStyle}>{notification}</div>
}

export default Notification
