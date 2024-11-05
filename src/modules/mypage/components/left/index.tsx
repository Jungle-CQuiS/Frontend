import { useNavigate } from "react-router-dom";
import { PrimaryButtonMedium } from "../../../../components/buttons/styled";
import { MyPageLeftWrap, MyPageProfileWrap, MyPageProfileImg, MyPageProfileTextWrap, MyPageProfileNameWrap, MyPageProfileName, MyPageProfileHonorWrap, MyPageProfileHonorImg, MyPageProfileHonor, MyPageProfileEmail, MyPagePlayStatistics, MyPagePlayStatisticsBar, MyPagePlayStatisticsBarContainer, MyPagePlayStatisticsBarText, MyPagePlayStatisticsBarTextWrap, MyPagePlayStatisticsBarWrap, MyPagePlayStatisticsImg, MyPageLeftButtonWrap } from "./styled";
import { MyPageLabel, MyPageWrap } from "../../../../pages/mypage/styled";
import { useEffect, useState } from "react";

export default function MyPageLeftSection() {
    const [userNickname, setUserNickname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userCorrectRate, setUserCorrectRate] = useState('');
    const [userHonorCount, setUserHonorCount] = useState('');
    const navigate = useNavigate();
    const handleAddProblem = () => {
        navigate("/mypage/addProblem");
    }

    const updateUserInfo = async () => {
        try {
            const userAccessToken = localStorage.getItem("AccessToken");
            const userUuid = localStorage.getItem("uuid");
            const API_URL = `api/users/personal-data`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "uuid": `${userUuid}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uuid: userUuid }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserNickname(data.data.username);
                setUserEmail(data.data.email);
            } else {
                console.error("유저 정보를 받아오는데 실패하였습니다.");
            }
        } catch (error) {
            console.error("유저 정보를 받아오는데 실패하였습니다.", error);
        }
    };

    const updateStatic = async () => {
        try {
            const userAccessToken = localStorage.getItem("AccessToken");
            const userUuid = localStorage.getItem("uuid");
            const API_URL = `api/users/quiz-statistics`;

            console.log("UUID:", userUuid);
            console.log("AccessToken:", userAccessToken);
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "uuid": `${userUuid}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uuid: userUuid })
            });

            if (response.ok) {
                const data = await response.json();
                setUserCorrectRate(data.data.singleCorrectRate);
                setUserHonorCount(data.data.multiHonorCount);
            } else {
                console.error("명예 정보를 받아오는데 실패하였습니다.");
            }
        } catch (error) {
            console.error("명예 정보를 받아오는데 실패하였습니다.", error);
        }
    }

    // const updateWrongQuestion = async () => {
    //     try {
    //         const userAccessToken = localStorage.getItem("AccessToken");
    //         const userUuid = localStorage.getItem("uuid");
    //         const API_URL = `api/users/quiz-statistics`;   // 수정필요

    //         const response = await fetch(API_URL, {
    //             method: "POST",
    //             headers: {
    //                 "Authorization": `Bearer ${userAccessToken}`,
    //                 "uuid": `${userUuid}`,
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 singleCorrectRate: "string",
    //                 multiHonorCount: "number"
    //             })
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setUserCorrectRate(data.data.singleCorrectRate);   // 수정필요
    //             setUserHonorCount(data.data.multiHonorCount);   // 수정필요
    //         } else {
    //             console.error("명예 정보를 받아오는데 실패하였습니다.");
    //         }
    //     } catch (error) {
    //         console.error("명예 정보를 받아오는데 실패하였습니다.", error);
    //     }
    // }

    useEffect(() => {
        updateUserInfo();
        updateStatic();
        // updateWrongQuestion();
    }, []);


    return (
        <MyPageLeftWrap>
            <MyPageWrap>
                <MyPageLabel>프로필</MyPageLabel>
                <MyPageProfileWrap>
                    <MyPageProfileImg src="/images/profile_image.png" />
                    <MyPageProfileTextWrap>
                        <MyPageProfileNameWrap>
                            <MyPageProfileName>{userNickname}</MyPageProfileName>
                            <MyPageProfileHonorWrap>
                                <MyPageProfileHonorImg src="/icons/badge.svg" />
                                <MyPageProfileHonor>{userHonorCount}회</MyPageProfileHonor>
                            </MyPageProfileHonorWrap>
                        </MyPageProfileNameWrap>
                        <MyPageProfileEmail>{userEmail}</MyPageProfileEmail>
                    </MyPageProfileTextWrap>
                </MyPageProfileWrap>
            </MyPageWrap>
            <MyPageWrap>
                <MyPageLabel>플레이 통계</MyPageLabel>
                <MyPagePlayStatistics>
                    <MyPagePlayStatisticsImg src="/icons/mdi_user_black.svg" />
                    <MyPagePlayStatisticsBarContainer>
                        <MyPagePlayStatisticsBarTextWrap>
                            <MyPagePlayStatisticsBarText>정답률</MyPagePlayStatisticsBarText>
                            <MyPagePlayStatisticsBarText>{userCorrectRate}%</MyPagePlayStatisticsBarText>
                        </MyPagePlayStatisticsBarTextWrap>
                        <MyPagePlayStatisticsBarWrap>
                            <MyPagePlayStatisticsBar style={{ width: `${userCorrectRate}%` }} ></MyPagePlayStatisticsBar>
                        </MyPagePlayStatisticsBarWrap>
                    </MyPagePlayStatisticsBarContainer>
                </MyPagePlayStatistics>
            </MyPageWrap>
            <MyPageLeftButtonWrap>
                <PrimaryButtonMedium onClick={handleAddProblem}>문제 등록 하기</PrimaryButtonMedium>
            </MyPageLeftButtonWrap>
        </MyPageLeftWrap>
    );
}