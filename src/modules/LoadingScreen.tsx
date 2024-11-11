import lottie from 'lottie-web'
import { useEffect, useRef } from "react";
import { LoadingScreenContainer, LoadingTitle } from './styled';

interface LoadingScreenProp {
    loadingText?: string;
}
export const LoadingScreen = ({ loadingText = "" }: LoadingScreenProp) => {

    // likecontainer의 타입을 명시적으로 지정 (HTMLDivElement | null)
    const likecontainer = useRef<HTMLDivElement | null>(null);
    const animationInstance = useRef<any>(null); // 애니메이션 인스턴스 저장

    useEffect(() => {
        if (likecontainer.current) {

            const animationData = require("../lottie/page_loading.json")

            // lottie 애니메이션 로드
            animationInstance.current = lottie.loadAnimation({
                container: likecontainer.current, // 타입 확인된 container 사용
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });
        }

        // 클린업 함수: useEffect가 재실행될 때 이전 애니메이션을 정리
        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
            }
        };
    }, []);

    return (
        <>
            <LoadingScreenContainer>
                <LoadingTitle>
                    {loadingText}
                </LoadingTitle>
                <div ref={likecontainer}></div>
            </LoadingScreenContainer>
        </>
    );
}