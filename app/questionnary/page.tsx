'use client';

// Components
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import QuestionCard from '@/components/ui/questionnary/QuestionCard.component';
import QuizResults from '@/components/ui/questionnary/QuizResult.component';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';
import { ERROR_MESSAGES_FR } from '@/utils/messages.utils';

// Helpers
import axios from 'axios';

// Libs Next
import { useRouter, useSearchParams } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

export interface Answer {
  id: number;
  answer: string;
  correct_answer: boolean;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface Questionnary {
  id?: number;
  subject?: string;
  questions?: Question[];
}

const Questionary: React.FC = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [questionnary, setQuestionnary] = useState<Questionnary>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [key: number]: boolean;
  }>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [hasPreviousResult, setHasPreviousResult] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(Routes.QUESTIONNARY_API, {
          params: { courseId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestionnary(response.data);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(ERROR_MESSAGES_FR.ERROR_FETCHING_QUESTIONARY, error);
      }
    };

    const fetchPreviousResult = async () => {
      try {
        const response = await axios.get(Routes.CHECK_PREVIOUS_RESULT, {
          params: { userId: user?.id, questionaryId: courseId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasPreviousResult(response.data.exists);
      } catch (error) {
        console.error(ERROR_MESSAGES_FR.ERROR_CHECKING_PREVIOUS_RESULT, error);
      }
    };

    if (courseId && token) {
      fetchQuestions();
      fetchPreviousResult();
    }
  }, [courseId, token, user?.id]);

  useEffect(() => {
    const savedState = localStorage.getItem('questionaryState');
    if (savedState) {
      const {
        savedQuestions,
        savedIndex,
        savedScore,
        savedAnsweredQuestions,
        savedQuizCompleted,
      } = JSON.parse(savedState);
      setQuestions(savedQuestions);
      setCurrentQuestionIndex(savedIndex);
      setScore(savedScore);
      setAnsweredQuestions(savedAnsweredQuestions || {});
      setQuizCompleted(savedQuizCompleted || false);
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      savedQuestions: questions,
      savedIndex: currentQuestionIndex,
      savedScore: score,
      savedAnsweredQuestions: answeredQuestions,
      savedQuizCompleted: quizCompleted,
    };
    localStorage.setItem('questionaryState', JSON.stringify(stateToSave));
  }, [
    questions,
    currentQuestionIndex,
    score,
    answeredQuestions,
    quizCompleted,
  ]);

  const handleAnswerClick = (answerId: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerId);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const question = questions[currentQuestionIndex];
      const selected = question.answers.find(
        (answer) => answer.id === selectedAnswer
      );

      if (
        selected &&
        selected.correct_answer &&
        !answeredQuestions[currentQuestionIndex]
      ) {
        setScore((prevScore) => prevScore + 1);
      }

      setAnsweredQuestions((prevState) => ({
        ...prevState,
        [currentQuestionIndex]: true,
      }));

      setSelectedAnswer(null);

      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        handleFinishQuiz();
      }
    }
  };

  const handleFinishQuiz = async () => {
    try {
      const response = await axios.post(
        Routes.QUESTIONNARY_API,
        {
          score,
          date_of_realize_questionary: Date.now(),
          user_id: user?.id,
          questionary_id: questionnary.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setQuizCompleted(true);
      }
    } catch (error) {
      console.error(ERROR_MESSAGES_FR.ERROR_SAVED_RESULTS, error);
    }
  };

  const handleNavigation = () => {
    router.push(Routes.ALL_COURSES('crypto-monnaie'));
  };

  if (questions.length === 0) return <LoadingSpinner />;

  const question = questions[currentQuestionIndex];
  if (!question) return <div>Chargement des questions...</div>;

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="container mx-auto p-4">
      {quizCompleted ? (
        <QuizResults
          score={score}
          totalQuestions={questions.length}
          onClaim={() => console.log('Claim')}
          onReturnToCourses={handleNavigation}
        />
      ) : (
        <>
          <h1 className="text-center text-2xl md:text-4xl mb-8">
            {questionnary.subject}
          </h1>
          <QuestionCard
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerClick={handleAnswerClick}
            onNextClick={isLastQuestion ? handleFinishQuiz : handleNextQuestion}
            isLastQuestion={isLastQuestion}
            score={score}
            totalQuestions={questions.length}
          />
        </>
      )}
    </div>
  );
};

export default Questionary;
