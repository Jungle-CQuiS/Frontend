import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSingleModeExit = () => {
    const navigate = useNavigate();

    const handleClose = async (event: any) => {
        event.preventDefault(); 
    };

    useEffect(() => {
        const beforeUnloadListener = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };

        const popStateListener = () => {
            handleClose(new Event('popstate'));
        };

        window.addEventListener('beforeunload', beforeUnloadListener);
        window.addEventListener('popstate', popStateListener);
        
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadListener);
            window.removeEventListener('popstate', popStateListener);
        };
    }, [navigate]);

};

export default useSingleModeExit;
