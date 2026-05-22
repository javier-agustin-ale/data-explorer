import { useEffect, useState } from "react";
import '../styles/notification-toast.css'
interface props {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    autoClose?: number;
    onClose?: () => void;
}
export default function NotificationToast({ type, message, autoClose= 3000, onClose }: props) {

     const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (!message) return;

        setShowNotification(true);

        const timer = setTimeout(() => {
            setShowNotification(false);

            setTimeout(() => {
                onClose?.();
            }, 500); 
        }, autoClose);

        return () => clearTimeout(timer);
    }, [message, autoClose]);

    return(
        <>
        <div className={`notification-toast notification-${type} ${
                showNotification ? 'show' : ''
            }`}>{message}</div>
        </>
    )
}
