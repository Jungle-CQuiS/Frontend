import styled from "styled-components";

export const UserTagsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
`;

export const UserTag = styled.div`
    background: linear-gradient(90deg, #2f69ff 2%, #2f69ff 60%, #2952bc 100%);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 16px 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
`

export const UserTagImg = styled.img`
    width: 19px;
    height: 25px;
`;