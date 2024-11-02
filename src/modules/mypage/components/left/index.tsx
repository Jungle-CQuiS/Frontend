import { useNavigate } from "react-router-dom";
import { PrimaryButtonMedium } from "../../../../components/buttons/styled";
import { MyPageLeftWrap, MyPageProfileWrap, MyPageProfileImg, MyPageProfileTextWrap, MyPageProfileNameWrap, MyPageProfileName, MyPageProfileHonorWrap, MyPageProfileHonorImg, MyPageProfileHonor, MyPageProfileEmail, MyPagePlayStatistics, MyPagePlayStatisticsBar, MyPagePlayStatisticsBarContainer, MyPagePlayStatisticsBarText, MyPagePlayStatisticsBarTextWrap, MyPagePlayStatisticsBarWrap, MyPagePlayStatisticsImg, MyPageLeftButtonWrap } from "./styled";
import { MyPageLabel, MyPageWrap } from "../../../../pages/mypage/styled";

export default function MyPageLeftSection() {
    const navigate = useNavigate();
    const handleAddProblem = () => {
        navigate("/mypage/addProblem");
    }
    return(
        <MyPageLeftWrap>
        <MyPageWrap>
            <MyPageLabel>프로필</MyPageLabel>
            <MyPageProfileWrap>
                <MyPageProfileImg src="/images/profile_image.png"/>
                <MyPageProfileTextWrap>
                    <MyPageProfileNameWrap>
                        <MyPageProfileName>연</MyPageProfileName>
                        <MyPageProfileHonorWrap>
                            <MyPageProfileHonorImg src="/icons/badge.svg"/>
                            <MyPageProfileHonor>300</MyPageProfileHonor>
                        </MyPageProfileHonorWrap>
                    </MyPageProfileNameWrap>
                    <MyPageProfileEmail>foxlover17@gmail.com</MyPageProfileEmail>
                </MyPageProfileTextWrap>
            </MyPageProfileWrap>
        </MyPageWrap>
        <MyPageWrap>
            <MyPageLabel>플레이 통계</MyPageLabel>
            <MyPagePlayStatistics>
                <MyPagePlayStatisticsImg src="/icons/mdi_user_black.svg"/>
                <MyPagePlayStatisticsBarContainer>
                    <MyPagePlayStatisticsBarTextWrap>
                        <MyPagePlayStatisticsBarText>정답률</MyPagePlayStatisticsBarText>
                        <MyPagePlayStatisticsBarText>70%</MyPagePlayStatisticsBarText>
                    </MyPagePlayStatisticsBarTextWrap>
                    <MyPagePlayStatisticsBarWrap>
                        <MyPagePlayStatisticsBar></MyPagePlayStatisticsBar>
                    </MyPagePlayStatisticsBarWrap>
                </MyPagePlayStatisticsBarContainer>
            </MyPagePlayStatistics>
        </MyPageWrap>
        <MyPageLeftButtonWrap>
            <PrimaryButtonMedium onClick={handleAddProblem}>문제 등록</PrimaryButtonMedium>
        </MyPageLeftButtonWrap>
    </MyPageLeftWrap>
    )
}