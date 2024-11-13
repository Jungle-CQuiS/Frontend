import styled from "styled-components";

export const SingleMainBackground = styled.div`
    width: 100%;
    min-height: 100vh; /* 콘텐츠가 화면을 넘어가면 페이지 전체 높이에 맞춰 증가 */
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center;
    flex-direction: column;
    background-image: url('/images/background_mypage.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden; /* 스크롤 가능하게 */
    position: relative; /* 절대 위치가 아닌 상대 위치로 설정 */
`;

export const MypageWrap = styled.div`
    padding: 100px;
    width: 100%; /* 전체 너비 사용 */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

export const MyPageContainer = styled.div`
    display: flex;
    gap: 100px;
    margin-top: 30px;
    width: 100%;
    flex-wrap: wrap; /* 화면 크기 줄일 때 레이아웃이 깨지지 않도록 */
    justify-content: center; /* 중앙 정렬 */
`;

export const MyPageHeader = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export const MyPageHeaderImg = styled.img`
    width: 40px;
    height: 40px;
`;

export const MyPageHeaderTitle = styled.div`
    font-size: 38px;
    font-weight: 700;
`;

export const MyPageWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const MyPageLabel = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #444;
`;