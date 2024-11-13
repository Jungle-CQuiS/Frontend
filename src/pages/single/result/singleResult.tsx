import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "../../../components/background/styled";
import { SecondaryButtonSmall, BlackButtonSmall } from "../../../components/buttons/styled";
import { HeaderTagComponent } from "../../../modules/single/components/headerTag";
import {
    SingleResultContainer,
    SingleResultWrap,
    SingleResultTitle,
    SingleResultBox,
    SingelResultButtonWrap,
    SingleResultBoxBar,
    SingleResultBoxBarContainer,
    SingleResultBoxBarText,
    SingleResultBoxBarTextWrap,
    SingleResultBoxBarWrap,
    SingleResultBoxRow,
    SingleResultBoxRowLabel,
} from "./styled";
import useButtonSoundEffect from "../../../hook/useHoverSoundEffect";
import { SingleBackground } from "../quiz/styled";

interface Result {
    correct: number;
    total: number;
}

interface Results {
    [key: string]: Result;
}

interface CategoryResultProps {
    label: string;
    correctAnswers: number;
    totalQuestions: number;
    color?: string;
}

const categoryTypes: { [key: string]: string } = {
    "1": "OS",
    "2": "알고리즘",
    "3": "자료구조",
    "4": "네트워크",
    "5": "데이터베이스"
};

const CategoryResult = ({ label, correctAnswers, totalQuestions, color = "#2F69FF" }: CategoryResultProps) => {
    const progress = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    return (
        <SingleResultBoxRow>
            <SingleResultBoxRowLabel>{label}</SingleResultBoxRowLabel>
            <SingleResultBoxBarContainer>
                <SingleResultBoxBarTextWrap>
                    <SingleResultBoxBarText>정답수</SingleResultBoxBarText>
                    <SingleResultBoxBarText>{`${correctAnswers}/${totalQuestions}`}</SingleResultBoxBarText>
                </SingleResultBoxBarTextWrap>
                <SingleResultBoxBarWrap>
                    <SingleResultBoxBar style={{ width: `${progress}%`, backgroundColor: color }} />
                </SingleResultBoxBarWrap>
            </SingleResultBoxBarContainer>
        </SingleResultBoxRow>
    );
};

export const SingleResultPage = () => {
    const location = useLocation();
    const results: Results = useMemo(() => location.state?.results || {}, [location.state?.results]);
    const navigate = useNavigate();
    useButtonSoundEffect()
    
    const isRequestingRef = useRef(false); 

    const handleGoHome = () => {
        navigate("/single");
    };

    const handleGoMyPage = () => {
        navigate("/mypage");
    };

    const totalCorrectAnswers = Object.values(results).reduce((sum, { correct }) => sum + correct, 0);
    const totalQuestions = Object.values(results).reduce((sum, { total }) => sum + total, 0);
    const score = totalQuestions > 0 ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0;
    const incorrectQuestionIds = useMemo(() => location.state?.incorrectQuestionIds || [], [location.state?.incorrectQuestionIds]);

    useEffect(() => {
        const uuid = localStorage.getItem("uuid");
    
        if (uuid && Object.keys(results).length > 0 && !isRequestingRef.current) {
            const detailData = Object.entries(results).map(([categoryId, { total, correct }]) => ({
                categoryId: Number(categoryId),
                correctQuizCount: correct
            }));
    
            const wrongQuizIds = incorrectQuestionIds;
    
            const requestBody = {
                uuid,
                detailData,
                quizCount: totalQuestions,
                correctCount: totalCorrectAnswers
            };
    
            const sendStatistics = async () => {
                isRequestingRef.current = true;
                try {
                    const response = await fetch('/api/users/statistics', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                            "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                        },
                        body: JSON.stringify(requestBody),
                    });
    
                    if (!response.ok) {
                        throw new Error('네트워크 응답이 정상이 아닙니다.');
                    }
    
                    const categoryLevelsRequestBody = {
                        uuid,
                        detailData: detailData.map(item => ({
                            categoryId: item.categoryId,
                            correctQuizCount: item.correctQuizCount 
                        }))
                    };
    
                    const categoryLevelsResponse = await fetch('/api/users/category-levels/after-game', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                            "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                        },
                        body: JSON.stringify(categoryLevelsRequestBody),
                    });
    
                    if (!categoryLevelsResponse.ok) {
                        throw new Error('두 번째 네트워크 응답이 정상이 아닙니다.');
                    }
    
                    await fetch('/api/users/quiz-wrong/after-game', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                            "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                        },
                        body: JSON.stringify({
                            uuid,
                            wrongQuizIds,
                        }),
                    });
    
                } catch (error) {
                    console.error('요청 실패:', error);
                } finally {
                    isRequestingRef.current = false;
                }
            };
    
            sendStatistics();
        }
    }, [results, totalQuestions, totalCorrectAnswers, incorrectQuestionIds]);
    
    
    
    

    return (
        <SingleBackground>
            <SingleResultContainer>
                <HeaderTagComponent type="주관식" />
                <SingleResultWrap>
                    <SingleResultTitle>당신의 점수는 {score}점 입니다!</SingleResultTitle>
                    <SingleResultBox>
                        {Object.entries(results).map(([label, { correct, total }]) => (
                            <CategoryResult
                                key={label}
                                label={categoryTypes[label]}
                                correctAnswers={correct}
                                totalQuestions={total}
                            />
                        ))}
                        <CategoryResult
                            label="합계"
                            correctAnswers={totalCorrectAnswers}
                            totalQuestions={totalQuestions}
                            color="#EE5567"
                        />
                    </SingleResultBox>
                    <SingelResultButtonWrap>
                        <SecondaryButtonSmall onClick={handleGoHome}>홈으로 돌아가기</SecondaryButtonSmall>
                        <BlackButtonSmall onClick={handleGoMyPage}>틀린 문제 보러가기</BlackButtonSmall>
                    </SingelResultButtonWrap>
                </SingleResultWrap>
            </SingleResultContainer>
        </SingleBackground>
    );
};
