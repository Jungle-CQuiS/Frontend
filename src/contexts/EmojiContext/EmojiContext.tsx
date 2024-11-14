import React, { createContext, useLayoutEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface EmojiContextType {
    animatedEmojis: Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>;
    setAnimatedEmojis: React.Dispatch<React.SetStateAction<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>>;
}

const EmojiContext = createContext<EmojiContextType | null>(null);

export const EmojiProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [animatedEmojis, setAnimatedEmojis] = useState<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>([]);

    useLayoutEffect(() => {
        setAnimatedEmojis([]); // 이모지 배열 초기화
    }, [location.pathname]);


    return (
        <EmojiContext.Provider value={{ animatedEmojis, setAnimatedEmojis }}>
            {children}
        </EmojiContext.Provider>
    );
};

export const useEmojiContext = () => {
    const context = useContext(EmojiContext);
    if (!context) {
        throw new Error('useEmojiContext must be used within an EmojiProvider');
    }

    return context;
};