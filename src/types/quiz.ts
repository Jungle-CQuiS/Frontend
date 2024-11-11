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

  export interface SubjectiveAnswer {
    roomUserId: number;
    answer: string;
    reason: string;
 }
 
 export interface ObjectiveChoice {
    choice: number;
    reasonList: string[];
    indexList: string[];
 }
 
 interface SubjectiveResponse extends QuizTypeProps {
    quizType: "주관식";
    answerList: SubjectiveAnswer[];
 }
 
 interface ObjectiveResponse extends QuizTypeProps {
    quizType: "객관식";
    answerList: ObjectiveChoice[];
 }
export type QuizResponse = SubjectiveResponse | ObjectiveResponse;


export interface SingleModeQuizProps {
    quizData: any[];
    onSubmit: (userInput: any) => Promise<void>;
} 