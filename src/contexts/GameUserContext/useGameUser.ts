import { useContext } from "react";
import { GameUserContext } from "./GameUserContext";

export const useGameUser = () => {
    const context = useContext(GameUserContext);
    if (!context) {
        throw new Error('useGameUser must be used within a GameUserProvider')
    }

    return context;
};

export { GameUserContext }