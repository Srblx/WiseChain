// Interfaces
import { Answer, Question } from '@/app/questionnary/page';

// Components
import { Button } from '@/components/shared/Button.components';

// Libs React
import React from 'react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerClick: (answerId: number) => void;
  onNextClick: () => void;
  isLastQuestion: boolean;
  score: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerClick,
  onNextClick,
  isLastQuestion,
  score,
  totalQuestions,
}) => {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-4xl mb-8">
        {question.question}
      </h1>
      <div className="bg-blueDark p-5 md:p-10 grid grid-cols-2 gap-4 rounded-md shadow-sm-light">
        {question.answers.map((answer: Answer) => (
          <Button
            key={answer.id}
            onClick={() => onAnswerClick(answer.id)}
            style={{
              display: 'block',
              margin: '10px 0',
              backgroundColor:
                answer.id === selectedAnswer
                  ? answer.correct_answer
                    ? '#6BF95E'
                    : '#FF3939'
                  : '',
            }}
            className="bg-secondary text-blueDark p-3 md:p-5 rounded-3xl md:rounded-full text-xs md:text-base"
          >
            {answer.answer}
          </Button>
        ))}
        <div className="col-span-2 flex justify-center mt-2 md:mt-8">
          <Button
            onClick={onNextClick}
            disabled={selectedAnswer === null}
            className="rounded-full bg-button text-white py-4 px-16"
          >
            {isLastQuestion ? 'Terminer' : 'Question suivante'}
          </Button>
        </div>
        <div className="text-center col-span-2">
          Votre score: {score}/{totalQuestions}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
