import React, { createContext, useContext, useState } from 'react';

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
    const [animatedEmojis, setAnimatedEmojis] = useState<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>([]);

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