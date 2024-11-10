import { useState, useEffect } from "react";
import { Background } from "../../components/background/styled";
import SingleModeHeaderComponent from "../../modules/single/components/header";
import {
  SingleModeContainer,
  SingleModeLabel,
  SingleModeSelectMode,
  SingleModeSelectModeBox,
  SingleModeSelectModeContainer,
  SingleModeSelectModeImg,
  SingleModeSelectModeText,
  SingleModeSelectModeWrap,
  SingleModeTab,
  SingleModeTabWrap,
  SingleModeTop,
  SingleModeWrap,
} from "./styled";
import { SingleModeSelectModal } from "../../components/modal/singleModeSelect";
import useHoverSoundEffect from "../../hook/useHoverSoundEffect";

const questionCounts: string[] = ["5 문제", "10 문제", "15 문제", "20 문제"];

interface Category {
  categoryId: number;
  categoryType: string;
}

interface Mode {
  icon: string;
  label: string;
}
const modes: Mode[] = [
  { icon: "/icons/check.svg", label: "객관식" },
  { icon: "/icons/pencil.svg", label: "주관식" },
  { icon: "/icons/clock.svg", label: "타임어택" },
];

export const SingleModePage = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["OS"]);
  const [selectedNumber, setSelectedNumber] = useState("5 문제");
  const [selectedMode, setSelectedMode] = useState("객관식");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useHoverSoundEffect();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("AccessToken");
        if (!token) throw new Error("No access token found");
  
        const response = await fetch("/api/quiz/single/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
  
        const result = await response.json();
        const categories: Category[] = result.data?.categories || [];
        setTopics(categories.map((category: Category) => category.categoryType));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDone = () => {
    setIsModalOpen(false);
  };

  const handleTopicSelect = (topic: string) => {
    if (selectedTopics.length === 1 && selectedTopics.includes(topic)) {
      return;
    }
  
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic)); // 선택 해제
    } else {
      setSelectedTopics([...selectedTopics, topic]); // 선택 추가
    }
  };
  

  return (
    <Background>
      <SingleModeContainer>
        <SingleModeHeaderComponent />
        <SingleModeTop>
          {topics.length > 0 ? (
            <SingleModeOptions
              label="주제"
              options={topics}
              selectedOptions={selectedTopics}  // 주제는 배열
              onSelect={handleTopicSelect} 
            />
          ) : (
            <div>Loading topics...</div>
          )}
          <SingleModeOptions
            label="문제 수"
            options={questionCounts}
            selectedOptions={selectedNumber}  // 문제 수는 문자열
            onSelect={setSelectedNumber} 
          />
        </SingleModeTop>
        <SingleModeSelectModeContainer>
          {modes.map((mode) => (
            <SingleModeItem
              key={mode.label}
              icon={mode.icon}
              label={mode.label}
              onOpenModal={() => {
                setSelectedMode(mode.label);
                handleOpenModal();
              }}
            />
          ))}
        </SingleModeSelectModeContainer>
      </SingleModeContainer>
      <SingleModeSelectModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onDone={handleDone}
        selectedTopics={selectedTopics} 
        selectedNumber={selectedNumber}
        selectedMode={selectedMode}
      />
    </Background>
  );
};

interface SingleModeOptionsProps {
  label: string;
  options: string[];
  selectedOptions: string[] | string;
  onSelect: (option: string) => void;
}

const SingleModeOptions = ({ label, options, selectedOptions, onSelect }: SingleModeOptionsProps) => (
  <SingleModeWrap>
    <SingleModeLabel>{label}</SingleModeLabel>
    <SingleModeTabWrap>
      {options.map((option) => (
        <SingleModeTab
          className="click-sound"
          key={option}
          $isSelected={Array.isArray(selectedOptions) ? selectedOptions.includes(option) : selectedOptions === option} // 배열인지 문자열인지 체크
          onClick={() => onSelect(option)}
        >
          {option}
        </SingleModeTab>
      ))}
    </SingleModeTabWrap>
  </SingleModeWrap>
);

interface SingleModeItemProps {
  icon: string;
  label: string;
  onOpenModal: () => void;
}

const SingleModeItem = ({ icon, label, onOpenModal }: SingleModeItemProps) => (
  <SingleModeSelectModeWrap onClick={onOpenModal} className="click-sound">
    <SingleModeSelectMode>
      <SingleModeSelectModeImg src={icon} />
      <SingleModeSelectModeText>{label}</SingleModeSelectModeText>
    </SingleModeSelectMode>
    <SingleModeSelectModeBox />
  </SingleModeSelectModeWrap>
);
