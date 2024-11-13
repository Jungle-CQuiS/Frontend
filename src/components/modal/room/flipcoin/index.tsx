import { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import animationData from "../../../../lottie/flip_coin.json";
import { FlipCoinScreen } from "./styled";

export default function FlipCoin() {
    const coincontainer = useRef<HTMLDivElement | null>(null);
    const lottieInstance = useRef<any>(null);

    useEffect(() => {
        if (coincontainer.current) {
            lottieInstance.current = Lottie.loadAnimation({
                container: coincontainer.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: animationData,
            });
        }
        return () => lottieInstance.current.destroy();
    }, []);

    return (
        <FlipCoinScreen className="notransparent">
            <div ref={coincontainer}></div>
        </FlipCoinScreen>
    );
}