import { useEffect ,useState} from 'react';
import { floatAndFade, AnimatedImage } from './styled';

interface AnimatedEmojiProps {
    src: string;
    startX: number;
    startY: number;
}

// 애니메이션이 끝나면 컴포넌트를 제거하기 위한 상태 관리
export const AnimatedEmoji = ({ src, startX, startY }: AnimatedEmojiProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000); // 애니메이션 duration과 동일하게 설정

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return <AnimatedImage src={src} $startX={startX} $startY={startY} />;
};
