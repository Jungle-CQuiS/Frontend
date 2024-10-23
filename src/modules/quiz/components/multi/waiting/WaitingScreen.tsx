import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { WaitingScreenContainer } from "./styled";
export const WaitingScreen = () => {
    // likecontainer의 타입을 명시적으로 지정 (HTMLDivElement | null)
    const likecontainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (likecontainer.current) {
            lottie.loadAnimation({
                container: likecontainer.current, // 타입 확인된 container 사용
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require("../../../../../lottie/waiting_red.json")
            });
        }
    }, []);

    return (
        <WaitingScreenContainer>
            <div ref={likecontainer}></div>
        </WaitingScreenContainer>
    );
};
