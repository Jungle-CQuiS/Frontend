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

const questionCounts: string[] = ["5 문제", "10 문제", "15 문제", "20 문제"];

interface Category {
  categoryId: number;
  categoryName: string;
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
  const [selectedTopic, setSelectedTopic] = useState("OS");
  const [selectedNumber, setSelectedNumber] = useState("5 문제");
  const [selectedMode, setSelectedMode] = useState("객관식");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
  
        const result = await response.json();
        const categories: Category[] = result.data?.categories || [];
        setTopics(categories.map((category: Category) => category.categoryName));
        setSelectedTopic(categories[0]?.categoryName || "");
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

  return (
    <Background>
      <SingleModeContainer>
        <SingleModeHeaderComponent />
        <SingleModeTop>
          {topics.length > 0 ? (
            <SingleModeOptions
              label="주제"
              options={topics}
              selectedOption={selectedTopic}
              onSelect={setSelectedTopic}
            />
          ) : (
            <div>Loading topics...</div>
          )}
          <SingleModeOptions
            label="문제 수"
            options={questionCounts}
            selectedOption={selectedNumber}
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
        selectedTopic={selectedTopic}
        selectedNumber={selectedNumber}
        selectedMode={selectedMode}
      />
    </Background>
  );
};

interface SingleModeOptionsProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const SingleModeOptions = ({ label, options, selectedOption, onSelect }: SingleModeOptionsProps) => (
  <SingleModeWrap>
    <SingleModeLabel>{label}</SingleModeLabel>
    <SingleModeTabWrap>
      {options.map((option) => (
        <SingleModeTab
          key={option}
          $isSelected={selectedOption === option}
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
  <SingleModeSelectModeWrap onClick={onOpenModal}>
    <SingleModeSelectMode>
      <SingleModeSelectModeImg src={icon} />
      <SingleModeSelectModeText>{label}</SingleModeSelectModeText>
    </SingleModeSelectMode>
    <SingleModeSelectModeBox />
  </SingleModeSelectModeWrap>
);
