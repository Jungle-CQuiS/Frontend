import styled from "styled-components";
import { defaultTransition } from "../../css";

interface CategoryTabProps {
    isSelected: boolean;
}

export const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: end;
`;

export const CategoryTab = styled.div<CategoryTabProps>`
    background-color: ${({ isSelected }) => (isSelected ? "#444" : "#fff")};
    color: ${({ isSelected }) => (isSelected ? "#fff" : "#000")};
    border: 1px solid #D3D3D3;
    border-radius: 16px 0px 0px 16px;
    padding: 13px 25px;
    cursor: pointer;
    ${defaultTransition};
    &:hover{
        background-color: ${({ isSelected }) => (isSelected ? "#444" : "#E7E7E7")}
        
    }
    width: max-content;
`;
