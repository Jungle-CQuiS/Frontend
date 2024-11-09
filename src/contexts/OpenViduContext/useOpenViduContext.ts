import { useContext } from 'react';
import { OpenViduContext } from './OpenViduContext';


export const useOpenViduContext = () => {
    const context = useContext(OpenViduContext);
    if (!context) {
        throw new Error('useStompContext must be used within a StompProvider');
    }
    
    return context;
};

export { OpenViduContext };