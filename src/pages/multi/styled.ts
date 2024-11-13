import styled, { keyframes } from "styled-components";
import { defaultTransition } from "../../css";

const backgroundMove = keyframes`
  0% {
    background-position: center top;
  }
  50% {
    background-position: center 20px; /* 원하는 만큼 이동 */
  }
  100% {
    background-position: center top;
  }
`;

export const MultiBackground = styled.div`
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 32px;
  background-image: url('/images/background_multi_1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: ${backgroundMove} 3s ease-in-out infinite;
`;

export const MultiPageTitle = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 100px;
    align-items: center;
`;

export const MultiPageTitleIcon = styled.img`
    width: 40px;
    height: 40px;
`;

export const MainPageTitleText = styled.div`
    font-size: 38px;
    font-weight: 700;
`;

export const MainPageSearchBarWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 32px;
`;

export const MainPageSearchBar = styled.input`
    padding: 10px 14px;
    width: 784px;
    border: 1px solid #D3D3D3;
    font-size: 20px;
    border-radius: 8px;
    ${defaultTransition}
    &:hover {
        box-shadow: 0 0px 10px #e6e8f6, 0 5px 5px #e6e8f6;
    }
    &:focus {
        border: 1px solid #2F69FF;
    }
    &::placeholder {
        color: #D3D3D3;
    }
`;

export const MainPageTable = styled.table`
    width: 1336px;
    border-collapse: collapse;
    margin-top: 16px;
`;

export const MainPageTableThead = styled.thead`

`;

export const MainPageTableTheadTr = styled.tr`
    border-bottom: 1px solid #969696;
`;

export const MainPageTableTheadTh = styled.th`
    color: #969696;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 40px;
    &:first-child{
        width: 1050px;
        text-align: left;
    }
    &:nth-child(2){
        width: 48px;
        text-align: right;
    }
    &:nth-child(3){
        width: 61px;
        text-align: right;
    }
`;

export const MainPageRefreshWrap = styled.div`
    gap: 15px;
    border-radius: 4px;
    width: 22px;
    height: 22px;
    padding: 8px 12px;
    cursor: pointer;
    background-color: #395B9A;
    ${defaultTransition}
    &:hover {
        color: #fff;
        background-color: #5384FF;
    }
`;

export const MainPageRefreshButton = styled.img`
`;