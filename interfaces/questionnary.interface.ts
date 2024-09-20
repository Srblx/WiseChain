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
    question: string;
    answers: Answer[];
    questionnaryId: string;
}

export interface Answer {
    id: string;
    answer: string;
    correct_answer: boolean;
    questionId: string;
    questionnaryId: string;
}