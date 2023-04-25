import { useLocation } from "react-router-dom";

export function DiningRoomForm() {
    const location = useLocation();
    const { email } = location.state;

    return <h1>dining room {email}</h1>
}