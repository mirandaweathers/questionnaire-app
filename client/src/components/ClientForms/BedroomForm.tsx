import { useLocation } from "react-router-dom";

export function BedRoomForm() {
    const location = useLocation();
    const { email } = location.state;

    return <h1>bed room {email}</h1>
}