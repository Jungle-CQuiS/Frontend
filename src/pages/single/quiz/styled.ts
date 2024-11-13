import styled from "styled-components";


export const SingleBackground = styled.div`
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 40px;
    background-image: url('/images/background_single.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
`;