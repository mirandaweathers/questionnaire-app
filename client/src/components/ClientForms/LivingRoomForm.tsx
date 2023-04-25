import { useLocation } from "react-router-dom"

export function LivingRoomForm() {
    const location = useLocation();
    const {email} = location.state;

    return <h1>living room {email}</h1>
}