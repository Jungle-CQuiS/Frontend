export interface Quiz {
    quizName: any;
    quizId: number;
    name: string;
    categoryType: string;
    choice1?: string;
    choice2?: string;
    choice3?: string;
    choice4?: string;
    answer: number;
    koreanAnswer?: string;
    englishAnswer?: string;
}

export interface QuizTypeProps {
    type: "객관식" | "주관식";
  }