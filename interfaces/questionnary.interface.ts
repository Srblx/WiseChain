export interface Questionnary {
    id: string;
    subject: string;
    creator: string;
    createdAt: Date;
    updatedAt: Date;
    questions: Question[];
    courseId: string;
}

export interface Question {
    id: string;
    index: number;
    title: string;
    answers: Answer[];
    questionnaryId: string;
}

export interface Answer {
    id: string;
    answer: string;
    isCorrect: boolean;
    questionId: string;
    questionnaryId: string;
}