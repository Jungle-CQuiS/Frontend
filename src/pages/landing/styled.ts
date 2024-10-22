import styled from "styled-components";

export const LandingPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  padding-top: 150px;
  background-image: url('/images/mainpage-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const LandingPageWrap = styled.div`
    padding: 0px 72px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
`;

export const LandingPageTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const LandingPageTextWrap = styled.div`
    display: flex;
`;

export const LandingPageText = styled.div`
    font-size: 60px;
    font-weight: 800;
`;

export const LandingPageTextPrimary = styled.div`
    font-size: 60px;
    font-weight: 800;
    color: #2F69FF;
`;

export const LandingPageTextSecondary = styled.div`
    font-size: 60px;
    font-weight: 800;
    color: #EE5567;
`;