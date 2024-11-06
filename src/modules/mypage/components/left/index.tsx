import { useNavigate } from "react-router-dom";
import { PrimaryButtonMedium } from "../../../../components/buttons/styled";
import { MyPageLeftWrap, MyPageProfileWrap, MyPageProfileImg, MyPageProfileTextWrap, MyPageProfileNameWrap, MyPageProfileName, MyPageProfileHonorWrap, MyPageProfileHonorImg, MyPageProfileHonor, MyPageProfileEmail, MyPagePlayStatistics, MyPagePlayStatisticsBar, MyPagePlayStatisticsBarContainer, MyPagePlayStatisticsBarText, MyPagePlayStatisticsBarTextWrap, MyPagePlayStatisticsBarWrap, MyPagePlayStatisticsImg, MyPageLeftButtonWrap, MyPagePlayStatisticsBarRed } from "./styled";
import { MyPageLabel, MyPageWrap } from "../../../../pages/mypage/styled";
import { useEffect, useRef, useState } from "react";

export default function MyPageLeftSection() {
    const [userNickname, setUserNickname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userCorrectRate, setUserCorrectRate] = useState('');
    const [userHonorCount, setUserHonorCount] = useState('');
    const navigate = useNavigate();
    const [categoryLevels, setCategoryLevels] = useState<{ name: string; level: number }[]>([]);

    const handleAddProblem = () => {
        navigate("/mypage/addProblem");
    }

    const isFetched = useRef(false); // 중복호출 방지용

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
                    "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
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
            console.error("유저 정보를 받아오는데 실패하였습니다", error);
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
                    "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
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
            console.error("명예 정보를 받아오는데 실패하였습니다", error);
        }
    }

    const updateCategoryLevels = async () => {
        try {
            const userAccessToken = localStorage.getItem("AccessToken");
            const userUuid = localStorage.getItem("uuid");
            const API_URL = `api/users/category-levels`;

            console.log("UUID:", userUuid);
            console.log("AccessToken:", userAccessToken);
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "uuid": `${userUuid}`,
                    "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uuid: userUuid })
            });

            if (response.ok) {
                const data = await response.json();
                const categoryLevelsData = data.data.categoryLevels.map((item: { categoryName: string; categoryLevel: number }) => ({
                    name: item.categoryName,
                    level: item.categoryLevel
                }));

                setCategoryLevels(categoryLevelsData);
            } else {
                console.error("레벨 정보를 받아오는데 실패하였습니다.");
            }
        } catch (error) {
            console.error("레벨 정보를 받아오는데 실패하였습니다", error);
        }
    }


    useEffect(() => {
        if (!isFetched.current) {
            updateUserInfo();
            updateStatic();
            updateCategoryLevels();
            isFetched.current = true; // 호출 후 true로 설정하여 다시 호출되지 않도록 설정
        }
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
                            <MyPagePlayStatisticsBarText>{userCorrectRate}</MyPagePlayStatisticsBarText>
                        </MyPagePlayStatisticsBarTextWrap>
                        <MyPagePlayStatisticsBarWrap>
                            <MyPagePlayStatisticsBar style={{ width: `${userCorrectRate}%` }} ></MyPagePlayStatisticsBar>
                        </MyPagePlayStatisticsBarWrap>
                    </MyPagePlayStatisticsBarContainer>
                </MyPagePlayStatistics>
            </MyPageWrap>
            <MyPageWrap>
                <MyPageLabel>카테고리 레벨</MyPageLabel>
                {categoryLevels.length > 0 ? categoryLevels.map((category, index) => (  // 조건부 렌더링
                    <MyPagePlayStatistics key={index}>
                        <MyPagePlayStatisticsBarContainer>
                            <MyPagePlayStatisticsBarTextWrap>
                                <MyPagePlayStatisticsBarText>{category.name}</MyPagePlayStatisticsBarText>
                                <MyPagePlayStatisticsBarText>LV.{category.level}</MyPagePlayStatisticsBarText>
                            </MyPagePlayStatisticsBarTextWrap>
                            <MyPagePlayStatisticsBarWrap>
                                <MyPagePlayStatisticsBarRed style={{ width: `${(category.level / 3) * 100}%` }} />
                            </MyPagePlayStatisticsBarWrap>
                        </MyPagePlayStatisticsBarContainer>
                    </MyPagePlayStatistics>
                )) : (
                    <div>레벨 정보가 없습니다. 문제를 풀어주세요.</div>
                )}
            </MyPageWrap>
            <MyPageLeftButtonWrap>
                <PrimaryButtonMedium onClick={handleAddProblem}>문제 등록 하기</PrimaryButtonMedium>
            </MyPageLeftButtonWrap>
        </MyPageLeftWrap>
    );
}