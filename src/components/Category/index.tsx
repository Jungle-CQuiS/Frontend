import { useState } from "react";
import { CategoryContainer, CategoryTab } from "./styled";


export default function CategoryComponent() {
    const [selectedTab, setSelectedTab] = useState("OS");

    return (
        <CategoryContainer>
            <CategoryTab 
                isSelected={selectedTab === "OS"} 
                onClick={() => setSelectedTab("OS")}
            >
                OS
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "자료구조"} 
                onClick={() => setSelectedTab("자료구조")}
            >
                자료구조
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "알고리즘"} 
                onClick={() => setSelectedTab("알고리즘")}
            >
                알고리즘
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "네트워크"} 
                onClick={() => setSelectedTab("네트워크")}
            >
                네트워크
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "데이터베이스"} 
                onClick={() => setSelectedTab("데이터베이스")}
            >
                데이터베이스
            </CategoryTab>
        </CategoryContainer>
    );
}
