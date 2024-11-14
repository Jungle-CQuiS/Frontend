export interface Quiz {
   userName?: string;
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
   username: string;
   roomUserId: number;
   answer: string;
   reason: string;
}

export interface ObjectiveChoice {
   usernameList: string[];
   choice: number;
   reasonList: string[];
   indexList: string[];
}

interface SubjectiveResponse {
   quizType: "주관식";
   answerList: SubjectiveAnswer[];
}

interface ObjectiveResponse {
   quizType: "객관식";
   answerList: ObjectiveChoice[];
}
export type QuizResponse = SubjectiveResponse | ObjectiveResponse;


export interface SingleModeQuizProps {
   quizData: any[];
   onSubmit: (userInput: any) => Promise<void>;
} 