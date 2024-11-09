import { useEffect } from "react";

export default function useButtonSoundEffect() {
    useEffect(() => {
        const clickSound = new Audio("/sounds/multi-pop.mp3");
        clickSound.volume = 0.3;

        const handleClick = () => {
            clickSound.currentTime = 0; 
            clickSound.play().catch(error => console.error("Click 사운드 재생 실패:", error));
        };

        const buttons = document.querySelectorAll("button, .click-sound");
        buttons.forEach((element) => {
            element.addEventListener("click", handleClick);
        });

        return () => {
            buttons.forEach((element) => {
                element.removeEventListener("click", handleClick);
            });
        };
    }, []);
}
