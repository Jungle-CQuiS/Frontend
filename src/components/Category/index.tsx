import { useState } from "react";
import { CategoryContainer, CategoryTab } from "./styled";

interface CategoryComponentProps {
    onSelectCategory: (category: string) => void;
}

export default function CategoryComponent({ onSelectCategory }: CategoryComponentProps) {
    const [selectedTab, setSelectedTab] = useState("OS");

    const handleCategoryClick = (category: string) => {
        setSelectedTab(category);
        onSelectCategory(category);
    };

    return (
        <CategoryContainer>
            <CategoryTab 
                isSelected={selectedTab === "OS"} 
                onClick={() => handleCategoryClick("OS")}
            >
                OS
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "자료구조"} 
                onClick={() => handleCategoryClick("자료구조")}
            >
                자료구조
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "알고리즘"} 
                onClick={() => handleCategoryClick("알고리즘")}
            >
                알고리즘
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "네트워크"} 
                onClick={() => handleCategoryClick("네트워크")}
            >
                네트워크
            </CategoryTab>
            <CategoryTab 
                isSelected={selectedTab === "데이터베이스"} 
                onClick={() => handleCategoryClick("데이터베이스")}
            >
                데이터베이스
            </CategoryTab>
        </CategoryContainer>
    );
}
